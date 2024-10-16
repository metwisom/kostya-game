import { CanvasStore } from './CanvasStore';
import { mat4 } from 'gl-matrix'; // Импортируем матричные функции


// Шейдеры для отрисовки изображения
const vertexShaderSource = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;
  uniform mat4 u_matrix;
  varying vec2 v_texcoord;
  void main() {
    gl_Position = u_matrix * a_position;
    v_texcoord = a_texcoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texcoord;
  uniform sampler2D u_texture;
  void main() {
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;

type GraphicComponent = {
  display: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  getFont(): string,
  setFont(font: string): void,
  centerTo(x: number, y: number): void,
  resetTransform(): void,
  drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void,
  drawText(text: string, x: number, y: number): void,
  recalculateSceneSize(): void
};

const Graphic = function (element: HTMLCanvasElement = undefined): GraphicComponent {
  const canvas = element || CanvasStore.get();
  const gl = canvas.getContext('webgl');

  if (!gl) {
    throw new Error('WebGL not supported');
  }

  // Компиляция шейдера
  function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error('Shader compilation failed');
    }
    return shader;
  }

  // Компиляция программы (шейдеров)
  function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      throw new Error('Program linking failed');
    }
    return program;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const obj: GraphicComponent = {
    display: canvas,
    gl: gl,
    program: program,

    getFont() {
      // В WebGL текст будет отрисовываться через текстуру
      return 'WebGL does not support direct font';
    },
    setFont(newFont: string) {
      // Для WebGL шрифт не применяется напрямую
    },
    centerTo(x: number, y: number) {
      // Трансформируем матрицу для центровки
      const matrix = mat4.create();
      mat4.translate(matrix, matrix, [x, y, 0]);
      const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
    },
    resetTransform() {
      // Сбрасываем матрицу трансформации
      const matrix = mat4.create();
      const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
    },
    drawImage(
      image: CanvasImageSource,
      sx: number,
      sy: number,
      sw: number,
      sh: number,
      dx: number,
      dy: number,
      dw: number,
      dh: number
    ) {
      let imageWidth: number;
      let imageHeight: number;

      // Приведение типа image к поддерживаемым типам с width и height
      if (image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || image instanceof ImageBitmap) {
        imageWidth = image.width;
        imageHeight = image.height;
      } else if (image instanceof HTMLVideoElement) {
        imageWidth = image.videoWidth;
        imageHeight = image.videoHeight;
      } else {
        throw new Error('Unsupported image type');
      }

      // Загрузка изображения как текстуры и отрисовка
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Загружаем текстуру
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      // Устанавливаем параметры фильтрации
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // В зависимости от того, как изображение будет масштабироваться,
      // используем либо LINEAR (для плавного) либо NEAREST (для четкого)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); // Или gl.LINEAR
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); // Или gl.LINEAR

      // Задаем координаты вершин и текстур
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      const positions = [
        dx, dy,
        dx + dw, dy,
        dx, dy + dh,
        dx + dw, dy + dh,
      ];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      const texcoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
      const texcoords = [
        sx / imageWidth, sy / imageHeight,
        (sx + sw) / imageWidth, sy / imageHeight,
        sx / imageWidth, (sy + sh) / imageHeight,
        (sx + sw) / imageWidth, (sy + sh) / imageHeight,
      ];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

      // Активируем атрибуты для передачи данных в шейдеры
      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');
      gl.enableVertexAttribArray(texcoordLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
      gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

      // Отрисовка
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    ,

    drawText(text: string, x: number, y: number) {
      // В WebGL можно рисовать текст через текстуры
      const textCanvas = document.createElement('canvas');
      const ctx = textCanvas.getContext('2d');
      ctx.font = '20px Arial';
      ctx.fillText(text, 0, 20);

      this.drawImage(textCanvas, 0, 0, textCanvas.width, textCanvas.height, x, y, textCanvas.width, textCanvas.height);
    },
    recalculateSceneSize() {
      const { width, height } = this.display.getBoundingClientRect();
      this.display.width = width;
      this.display.height = height;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  };

  if (element !== undefined) {
    window.removeEventListener('resize', obj.recalculateSceneSize.bind(obj));
    window.addEventListener('resize', obj.recalculateSceneSize.bind(obj));
    obj.recalculateSceneSize();
  }

  return obj;
};

export { Graphic, GraphicComponent };

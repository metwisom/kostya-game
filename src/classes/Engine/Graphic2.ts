import {CanvasStore} from './CanvasStore';

type GraphicComponent = {
  display: HTMLCanvasElement,
  scene: WebGLRenderingContext,
  getFont(): string
  setFont(font: string): void
  centerTo(x: number, y: number): void
  resetTransform(): void
  drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
  drawText(text: string, x: number, y: number): void
  recalculateSceneSize(): void
}

const Graphic = function (element: HTMLCanvasElement = undefined) {
  let currentFont = '10px sans-serif';
  let transformMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  let program: WebGLProgram;
  let vertexBuffer: WebGLBuffer;
  const textureCache = new Map<CanvasImageSource, {texture: WebGLTexture, version: number}>();
  const textCache = new Map<string, {canvas: HTMLCanvasElement, width: number, height: number}>();

  const obj: GraphicComponent = {
    display: element,
    scene: undefined,

    getFont() {
      return currentFont;
    },
    setFont(newFont: string) {
      if (currentFont !== newFont) {
        currentFont = newFont;
        textCache.clear();
      }
    },
    centerTo(x: number, y: number) {
      const translateX = this.display.width / 2 - x;
      const translateY = this.display.height / 2 - y;
      transformMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        translateX, translateY, 0, 1
      ]);
      this.scene.uniformMatrix4fv(this.scene.getUniformLocation(program, 'u_transform'), false, transformMatrix);
    },
    resetTransform() {
      transformMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      this.scene.uniformMatrix4fv(this.scene.getUniformLocation(program, 'u_transform'), false, transformMatrix);
    },
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
      const imgWidth = (image as HTMLImageElement).width || (image as HTMLCanvasElement).width;
      const imgHeight = (image as HTMLImageElement).height || (image as HTMLCanvasElement).height;

      if (!imgWidth || !imgHeight) {
        console.error('Cannot determine image dimensions');
        return;
      }

      // Clamp texture coordinates to avoid edge artifacts
      sx = Math.max(0, Math.min(sx, imgWidth));
      sy = Math.max(0, Math.min(sy, imgHeight));
      sw = Math.min(sw, imgWidth - sx);
      sh = Math.min(sh, imgHeight - sy);

      // Check texture cache with versioning
      let cacheEntry = textureCache.get(image);
      const imageVersion = (image as any)._version || 0; // Custom version for dynamic images
      if (!cacheEntry || cacheEntry.version !== imageVersion) {
        const texture = this.scene.createTexture();
        this.scene.bindTexture(this.scene.TEXTURE_2D, texture);
        this.scene.texImage2D(this.scene.TEXTURE_2D, 0, this.scene.RGBA, this.scene.RGBA, this.scene.UNSIGNED_BYTE, image);
        this.scene.texParameteri(this.scene.TEXTURE_2D, this.scene.TEXTURE_MIN_FILTER, this.scene.NEAREST);
        this.scene.texParameteri(this.scene.TEXTURE_2D, this.scene.TEXTURE_MAG_FILTER, this.scene.NEAREST);
        this.scene.texParameteri(this.scene.TEXTURE_2D, this.scene.TEXTURE_WRAP_S, this.scene.CLAMP_TO_EDGE);
        this.scene.texParameteri(this.scene.TEXTURE_2D, this.scene.TEXTURE_WRAP_T, this.scene.CLAMP_TO_EDGE);
        cacheEntry = {texture, version: imageVersion};
        textureCache.set(image, cacheEntry);
      } else {
        this.scene.bindTexture(this.scene.TEXTURE_2D, cacheEntry.texture);
      }

      // Update vertex buffer
      const vertices = new Float32Array([
        dx, dy, sx / imgWidth, sy / imgHeight,
        dx + dw, dy, (sx + sw) / imgWidth, sy / imgHeight,
        dx, dy + dh, sx / imgWidth, (sy + sh) / imgHeight,
        dx + dw, dy + dh, (sx + sw) / imgWidth, (sy + sh) / imgHeight
      ]);
      this.scene.bindBuffer(this.scene.ARRAY_BUFFER, vertexBuffer);
      this.scene.bufferData(this.scene.ARRAY_BUFFER, vertices, this.scene.STATIC_DRAW);

      const positionLoc = this.scene.getAttribLocation(program, 'a_position');
      const texCoordLoc = this.scene.getAttribLocation(program, 'a_texCoord');
      this.scene.enableVertexAttribArray(positionLoc);
      this.scene.enableVertexAttribArray(texCoordLoc);
      this.scene.vertexAttribPointer(positionLoc, 2, this.scene.FLOAT, false, 4 * 4, 0);
      this.scene.vertexAttribPointer(texCoordLoc, 2, this.scene.FLOAT, false, 4 * 4, 2 * 4);

      this.scene.drawArrays(this.scene.TRIANGLE_STRIP, 0, 4);
    },
    drawText(text: string, x: number, y: number) {
      let textData = textCache.get(text);
      if (!textData) {
        const textCanvas = document.createElement('canvas');
        const textCtx = textCanvas.getContext('2d');
        textCtx.font = currentFont;
        textCtx.fillStyle = '#000';
        const metrics = textCtx.measureText(text.split('\n')[0]);
        const lineHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const lines = text.split('\n');
        textCanvas.width = Math.max(...lines.map(line => textCtx.measureText(line).width)) + 10;
        textCanvas.height = lineHeight * lines.length + 10;
        textCtx.font = currentFont;
        textCtx.fillStyle = '#000';
        lines.forEach((line, index) => {
          textCtx.fillText(line, 5, 5 + lineHeight * (index + 1));
        });
        textData = {canvas: textCanvas, width: textCanvas.width, height: textCanvas.height};
        textCache.set(text, textData);
      }

      this.drawImage(textData.canvas, 0, 0, textData.width, textData.height, x, y, textData.width, textData.height);
    },
    recalculateSceneSize() {
      if (this.display) {
        const {width, height} = this.display.getBoundingClientRect();
        this.display.width = width;
        this.display.height = height;
        this.scene.viewport(0, 0, width, height);
        const projectionMatrix = new Float32Array([
          2 / width, 0, 0, 0,
          0, -2 / height, 0, 0,
          0, 0, 1, 0,
          -1, 1, 0, 1
        ]);
        this.scene.uniformMatrix4fv(this.scene.getUniformLocation(program, 'u_projection'), false, projectionMatrix);
      }
    },
  };

  // Initialize WebGL
  if (element !== undefined) {
    obj.display = element;
    window.removeEventListener('resize', obj.recalculateSceneSize.bind(obj));
    window.addEventListener('resize', obj.recalculateSceneSize.bind(obj));
  } else {
    obj.display = CanvasStore.get();
  }

  obj.scene = obj.display.getContext('webgl', {premultipliedAlpha: true});
  if (!obj.scene) {
    throw new Error('WebGL not supported');
  }

  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform mat4 u_transform;
    uniform mat4 u_projection;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = u_projection * u_transform * vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;
  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    void main() {
      gl_FragColor = texture2D(u_texture, v_texCoord);
    }
  `;

  const vertexShader = obj.scene.createShader(obj.scene.VERTEX_SHADER);
  obj.scene.shaderSource(vertexShader, vertexShaderSource);
  obj.scene.compileShader(vertexShader);

  const fragmentShader = obj.scene.createShader(obj.scene.FRAGMENT_SHADER);
  obj.scene.shaderSource(fragmentShader, fragmentShaderSource);
  obj.scene.compileShader(fragmentShader);

  program = obj.scene.createProgram();
  obj.scene.attachShader(program, vertexShader);
  obj.scene.attachShader(program, fragmentShader);
  obj.scene.linkProgram(program);
  obj.scene.useProgram(program);

  vertexBuffer = obj.scene.createBuffer();

  obj.scene.clearColor(1.0, 1.0, 1.0, 1.0);
  obj.scene.enable(obj.scene.BLEND);
  obj.scene.blendFunc(obj.scene.ONE, obj.scene.ONE_MINUS_SRC_ALPHA); // For premultiplied alpha
  obj.recalculateSceneSize();

  return obj;
};

export {Graphic, GraphicComponent};
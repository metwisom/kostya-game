import {CanvasStore} from './CanvasStore';

type GraphicComponent = {
  display: HTMLCanvasElement,
  scene: CanvasRenderingContext2D,
  getFont(): string
  setFont(font: string): void
  centerTo(x: number, y: number): void
  resetTransform(): void
  drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
  drawText(text: string, x: number, y: number): void
  recalculateSceneSize(): void
}

const Graphic = function (element: HTMLCanvasElement = undefined) {

  const obj: GraphicComponent = {
    display: element,
    scene: undefined,

    getFont() {
      return this.scene.font;
    },
    setFont(newFont: string) {
      if (this.font != newFont) {
        this.scene.font = newFont;
      }
    },
    centerTo(x: number, y: number) {
      this.scene.translate(
        this.display.width / 2 - x,
        this.display.height / 2 - y);
    },
    resetTransform() {
      this.scene.resetTransform();
    },
    drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
      this.scene.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    },
    drawText(text: string, x: number, y: number) {
      const metrics = this.scene.measureText(text);
      const lineHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      text.split('\n').map((textLine) => {
        this.scene.fillText(textLine, x, y);
        y += lineHeight;
      });
    },
    recalculateSceneSize() {
      if (this.display != undefined) {
        const {width, height} = this.display.getBoundingClientRect();
        this.display.width = width;
        this.display.height = height;
        if (this.scene != undefined) {
          this.scene.imageSmoothingEnabled = false;
        }
      }
    },
  };

  if (element !== undefined) {
    obj.display = element;
    window.removeEventListener('resize', obj.recalculateSceneSize.bind(obj));
    window.addEventListener('resize', obj.recalculateSceneSize.bind(obj));
    obj.recalculateSceneSize();

  } else {
    obj.display = CanvasStore.get();
  }
  obj.scene = obj.display.getContext('2d');
  obj.scene.imageSmoothingEnabled = false;
  obj.scene.fillStyle = '#000';

  return obj;
};


export {Graphic, GraphicComponent};
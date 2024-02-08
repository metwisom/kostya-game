import {CanvasStore} from './CanvasStore';

class Graphic {
  private readonly _display: HTMLCanvasElement;
  private readonly scene: CanvasRenderingContext2D;

  constructor(element: HTMLCanvasElement = undefined) {
    if (element !== undefined) {
      this._display = element;
      window.removeEventListener('resize', this.recalculateSceneSize.bind(this));
      window.addEventListener('resize', this.recalculateSceneSize.bind(this));
      this.recalculateSceneSize();

    } else {
      this._display = CanvasStore.get();
    }
    this.scene = this._display.getContext('2d');
    this.scene.imageSmoothingEnabled = false;
    this.scene.fillStyle = '#000';

  }

  get display() {
    return this._display;
  }

  get font() {
    return this.scene.font;
  }

  set font(newFont: string) {
    if (this.font != newFont) {
      this.scene.font = newFont;
    }
  }

  private recalculateSceneSize() {
    if (this._display != undefined) {
      const {width, height} = this._display.getBoundingClientRect();
      this._display.width = width;
      this._display.height = height;
      if (this.scene != undefined) {
        this.scene.imageSmoothingEnabled = false;
      }
    }
  }

  public centerTo(x: number, y: number) {
    this.scene.translate(
      this.display.width / 2 - x,
      this.display.height / 2 - y);
  }

  public resetTransform() {
    this.scene.resetTransform();
  }

  public drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
    this.scene.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  public drawText(text: string, x: number, y: number) {
    const metrics = this.scene.measureText(text);
    const lineHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    text.split('\n').map((textLine) => {
      this.scene.fillText(textLine, x, y);
      y += lineHeight;
    });
  }
}


export {Graphic};
import {Texture} from './Texture';


class TextureBlank extends Texture {

  protected text: string = '';
  protected textColor: string = 'red';
  protected fillColor: string = 'black';
  protected cacheImg: HTMLImageElement = document.createElement('img');

  constructor(w: number, h: number) {
    super();
    this.virtualScene.textAlign = 'left';
    this.virtualScene.textBaseline = 'top';
    this.setSize(w, h);
  }

  protected render() {
    this.virtualScene.fillStyle = this.fillColor;
    this.virtualScene.fillRect(0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
    // 16;

    if (this.text != '') {
      this.virtualScene.strokeStyle = this.textColor;
      const text = this.virtualScene.measureText(this.text); // TextMetrics object
      this.virtualScene.strokeText(this.text, this.virtualCanvas.width / 2 - text.width / 2, this.virtualCanvas.height / 2);
    }
    this.cacheImg.src = this.virtualCanvas.toDataURL();
  }

  get(): HTMLImageElement {
    if (this.cacheImg == undefined) {
      super.get();
    }
    return this.cacheImg;
  }

  setSize(w: number, h: number) {
    this.virtualCanvas.width = w;
    this.virtualCanvas.height = h;
    this.render();
  }

  setColor(color: string) {
    this.fillColor = color;
    this.render();
  }

  setText(text: string, color: string) {
    this.text = text;
    this.textColor = color;
    this.render();
  }
}

export {TextureBlank};

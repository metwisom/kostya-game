import {Texture} from './Texture';
import {ResourceLoader} from '../Engine/ResourceLoader/ResourceLoader';


class TextureButton extends Texture {

  protected text: string = '';
  protected textColor: string = 'red';
  protected fillColor: string = 'black';
  protected cacheImg: HTMLImageElement = document.createElement('img');

  constructor(src: string, w: number, h: number) {
    super();
    this.referenceImage = ResourceLoader.get(src).image;
    this.virtualScene.textAlign = 'left';
    this.virtualScene.textBaseline = "bottom";
    this.setSize(w, h);
  }

  protected render(_: number) {
    this.virtualScene.fillStyle = this.fillColor;

    this.virtualScene.drawImage(this.referenceImage, 0, 0, 6, 6,
      0, 0, 6, 6);
    this.virtualScene.drawImage(this.referenceImage, this.referenceImage.width - 6, 0, 6, 6,
      this.virtualCanvas.width - 6, 0, 6, 6);
    this.virtualScene.drawImage(this.referenceImage, this.referenceImage.width - 6, this.referenceImage.height - 6, 6, 6,
      this.virtualCanvas.width - 6, this.virtualCanvas.height - 6, 6, 6);
    this.virtualScene.drawImage(this.referenceImage, 0, this.referenceImage.height - 6, 6, 6,
      0, this.virtualCanvas.height - 6, 6, 6);

    this.virtualScene.drawImage(this.referenceImage, 6, 0, 3, 6,
      6, 0, this.virtualCanvas.width - 12, 6);
    this.virtualScene.drawImage(this.referenceImage, 6, this.referenceImage.height - 6, 3, 6,
      6, this.virtualCanvas.height - 6, this.virtualCanvas.width - 12, 6);

    this.virtualScene.drawImage(this.referenceImage, 0, 6, 6, 3,
      0, 6, 6, this.virtualCanvas.height - 12);

    this.virtualScene.drawImage(this.referenceImage, this.referenceImage.width - 6, 6, 6, 3,
      this.virtualCanvas.width - 6, 6, 6, this.virtualCanvas.height - 12);


    this.virtualScene.drawImage(this.referenceImage, 7, 7, 2, 2,
      6, 6, this.virtualCanvas.width - 12, this.virtualCanvas.height - 12);


    // 16;

    if (this.text != '') {
      this.virtualScene.strokeStyle = this.textColor;
      const metrics = this.virtualScene.measureText(this.text); // TextMetrics object
      const lineHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      this.virtualScene.strokeText(this.text, this.virtualCanvas.width / 2 - metrics.width / 2, this.virtualCanvas.height / 2 + lineHeight / 2 * 0.7 );
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
    this.render(0);
  }

  setColor(color: string) {
    this.fillColor = color;
    this.render(0);
  }

  setText(text: string, color: string) {
    this.text = text;
    this.textColor = color;
    this.render(0);
  }
}

export {TextureButton};

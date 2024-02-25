import {Texture} from './Texture';
import {TextureBlankComponent} from './TextureBlank';

type TextureButtonComponent = TextureBlankComponent & {
  text: string
  textColor: string
  fillColor: string
  cacheImg: HTMLImageElement
  get(): HTMLImageElement
  setSize(w: number, h: number): void
  setFont(font: string): void
  setColor(color: string): void
  setText(text: string, color: string): void
  render(): void
}

const TextureButton = function (src: string, w: number, h: number) {

  const parent = Texture(src);

  const obj: TextureButtonComponent = {
    ...parent,
    text: '',
    textColor: 'red',
    fillColor: 'black',
    cacheImg: document.createElement('img'),

    get(): HTMLImageElement {
      if (this.cacheImg == undefined) {
        parent.get.bind(this)();
      }
      return this.cacheImg;
    },
    setSize(w: number, h: number) {
      this.virtualCanvas.width = w;
      this.virtualCanvas.height = h;
      this.render();
    },
    setFont(font: string) {
      this.virtualScene.font = font;
      this.render();
    },
    setColor(color: string) {
      this.fillColor = color;
      this.render();
    },
    setText(text: string, color: string) {
      this.text = text;
      this.textColor = color;
      this.render();
    },
    render() {
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
        this.virtualScene.strokeText(this.text, this.virtualCanvas.width / 2 - metrics.width / 2, this.virtualCanvas.height / 2 + lineHeight / 2 * 0.7);
      }
      this.cacheImg.src = this.virtualCanvas.toDataURL();
    },
  };

  obj.virtualScene.textAlign = 'left';
  obj.virtualScene.textBaseline = 'bottom';
  obj.setSize(w, h);

  return obj;
};

export {TextureButton, TextureButtonComponent};

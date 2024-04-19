import {TextureStatic, TextureStaticComponent} from './TextureStatic';
import {CanvasStore} from '../CanvasStore';

type TextureButtonComponent = TextureStaticComponent & {
  text: string
  textColor: string
  cacheImg: HTMLImageElement
  virtualCanvas: HTMLCanvasElement
  virtualScene: CanvasRenderingContext2D
  setSize(w: number, h: number): void
  setFont(font: string): void
  setColor(color: string): void
  setText(text: string, color: string): void
  render(): void
}

const TextureButton = function (src: string, w: number, h: number) {

  const parent = TextureStatic(src);

  const canvas = CanvasStore.get();

  const obj: TextureButtonComponent = {
    ...parent,
    type: 'TextureButton',
    text: '',
    textColor: 'red',
    cacheImg: document.createElement('img'),
    virtualCanvas: canvas,
    virtualScene: canvas.getContext('2d'),
    get(): HTMLImageElement {
      if (this.cacheImg.src == '') {
        this.render();
      }
      return this.cacheImg;
    },
    setSize(w: number, h: number) {
      this.virtualCanvas.width = w;
      this.virtualCanvas.height = h;
      this.render();
    },
    setColor(color: string) {
      if (this.textColor == color) {
        return;
      }
      this.textColor = color;
      this.virtualScene.strokeStyle = color;
    },
    setText(text: string, color: string) {
      this.setColor(color);
      this.text = text;
      this.render();
    },
    setFont(font: string) {
      this.virtualScene.font = font;
      this.render();
    },
    render() {

      this.virtualScene.drawImage(this.reference.content, 0, 0, 6, 6,
        0, 0, 6, 6);
      this.virtualScene.drawImage(this.reference.content, this.reference.content.width - 6, 0, 6, 6,
        this.virtualCanvas.width - 6, 0, 6, 6);
      this.virtualScene.drawImage(this.reference.content, this.reference.content.width - 6, this.reference.content.height - 6, 6, 6,
        this.virtualCanvas.width - 6, this.virtualCanvas.height - 6, 6, 6);
      this.virtualScene.drawImage(this.reference.content, 0, this.reference.content.height - 6, 6, 6,
        0, this.virtualCanvas.height - 6, 6, 6);

      this.virtualScene.drawImage(this.reference.content, 6, 0, 3, 6,
        6, 0, this.virtualCanvas.width - 12, 6);
      this.virtualScene.drawImage(this.reference.content, 6, this.reference.content.height - 6, 3, 6,
        6, this.virtualCanvas.height - 6, this.virtualCanvas.width - 12, 6);

      this.virtualScene.drawImage(this.reference.content, 0, 6, 6, 3,
        0, 6, 6, this.virtualCanvas.height - 12);

      this.virtualScene.drawImage(this.reference.content, this.reference.content.width - 6, 6, 6, 3,
        this.virtualCanvas.width - 6, 6, 6, this.virtualCanvas.height - 12);


      this.virtualScene.drawImage(this.reference.content, 7, 7, 2, 2,
        6, 6, this.virtualCanvas.width - 12, this.virtualCanvas.height - 12);


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

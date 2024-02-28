import {Texture, TextureComponent} from './Texture';

type TextureBlankComponent = TextureComponent & {
  text: string
  textColor: string
  fillColor: string
  cacheImg: HTMLImageElement
}

const TextureBlank = function (w: number, h: number) {

  const parent = Texture();

  const obj = {
    ...parent,
    type: 'TextureBlank',
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
      this.virtualScene.fillRect(0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
      // 16;

      if (this.text != '') {
        this.virtualScene.strokeStyle = this.textColor;
        const text = this.virtualScene.measureText(this.text); // TextMetrics object
        this.virtualScene.strokeText(this.text, this.virtualCanvas.width / 2 - text.width / 2, this.virtualCanvas.height / 2);
      }
      this.cacheImg.src = this.virtualCanvas.toDataURL();
    },
  };

  obj.virtualScene.textAlign = 'left';
  obj.virtualScene.textBaseline = 'top';
  obj.setSize(w, h);
  return obj;
};

export {TextureBlank, TextureBlankComponent};

import {TextureBlank, TextureBlankComponent} from './TextureBlank';

type TextureRainComponent = TextureBlankComponent & {}

const TextureRain = function (w: number, h: number) {

  const parent = TextureBlank(w, h);
  const obj: TextureRainComponent = {
    ...parent,
    type: 'TextureRain',
    get(): HTMLImageElement {
      if (this.cacheImg == undefined) {
        parent.get();
      }
      return this.cacheImg;
    },
    render() {
      this.virtualScene.fillStyle = this.fillColor;
      const maxWidth = this.virtualCanvas.height - this.virtualCanvas.width;
      for (let i = 1; i < maxWidth; i++) {
        this.virtualScene.fillRect(this.virtualCanvas.width / 2 - this.virtualCanvas.width / 2 / maxWidth * i, i, this.virtualCanvas.width / maxWidth * i, this.virtualCanvas.width / maxWidth * i);
      }
      this.cacheImg.src = this.virtualCanvas.toDataURL();
    },
  };

  obj.render(0);

  return obj;


};

export {TextureRain};

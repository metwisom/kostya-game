import ResourceLoader from "./Engine/ResourceLoader/ResourceLoader";

class Sprite {

  cur = 0;
  speed: number;
  max: number;
  image: (HTMLImageElement | HTMLCanvasElement)[];

  constructor( src: string) {
    this.speed = ResourceLoader.get(src).speed;
    this.max = ResourceLoader.get(src).frames;
    this.image = [];
    this.cur = this.max;
    const tmpImg = ResourceLoader.get(src).image;

    this.image[1] = tmpImg;
    const canvasTmp = document.createElement("canvas");
    canvasTmp.width = tmpImg.width;
    canvasTmp.height = tmpImg.height;
    const secondaryCtx = canvasTmp.getContext("2d");
    secondaryCtx.scale(-1, 1);
    secondaryCtx.translate(-tmpImg.width, 0);
    secondaryCtx.drawImage(tmpImg, 0, 0);
    this.image[0] = canvasTmp as unknown as HTMLImageElement;

  }

  update() {
    this.cur -= this.speed;
    if (this.cur <= 0) {
      this.cur = this.max;
    }
  }
}

export default Sprite;

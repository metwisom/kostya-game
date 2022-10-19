import ResourceLoader from "./Engine/ResourceLoader/ResourceLoader";

export type Direction<T> = {
  left: T,
  right: T
}

class Sprite {

  cur = 0;
  speed: number;
  framesCount: number;
  image: Direction<(HTMLImageElement | HTMLCanvasElement)> = {
    left: undefined,
    right:undefined
  };

  constructor( src: string) {
    this.speed = ResourceLoader.get(src).speed;
    this.framesCount = ResourceLoader.get(src).frames;
    this.cur = this.framesCount;
    const tmpImg = ResourceLoader.get(src).image;

    this.image.right = tmpImg;
    const canvasTmp = document.createElement("canvas");
    canvasTmp.width = tmpImg.width;
    canvasTmp.height = tmpImg.height;
    const secondaryCtx = canvasTmp.getContext("2d");
    secondaryCtx.scale(-1, 1);
    secondaryCtx.translate(-tmpImg.width, 0);
    secondaryCtx.drawImage(tmpImg, 0, 0);
    this.image.left = canvasTmp as unknown as HTMLImageElement;

  }

  update() {
    this.cur -= this.speed;
    if (this.cur <= 0) {
      this.cur = this.framesCount + this.cur;
    }
  }
}

export default Sprite;

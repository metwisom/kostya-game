import ResourceLoader from "./ResourceLoader";

class Sprite {

  cur = 0;
  speed: number;
  max: number;
  image: (HTMLImageElement | HTMLCanvasElement)[];

  constructor(max: number, src: string, speed: number) {
    this.speed = speed;
    this.max = max;
    this.image = [];
    const tmpImg = ResourceLoader.get(src);

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
    this.cur += this.speed;
    if (this.cur > this.max) {
      this.cur = 0;
    }
  }
}

export default Sprite;

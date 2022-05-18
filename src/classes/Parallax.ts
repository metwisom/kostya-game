import Camera from "./Engine/Camera";
import Display from "./Engine/Display";
import GameObject from "./GameObject";

class Parallax extends GameObject {

  fon: HTMLImageElement = new Image();
  bias: number;

  constructor(image: string, bias: number) {

    super();

    this.fon.src = image;
    this.bias = bias;
  }

  draw(scene: CanvasRenderingContext2D) {
    const { fon } = this;
    const coef = Display.height / fon.height;
    const pass = (Camera.x * (this.bias / 10)) % (fon.width * coef);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass - (fon.width * coef), 0, fon.width * coef, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass, 0, fon.width * coef, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * coef), 0, fon.width * coef, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * coef) * 2, 0, fon.width * coef, Display.height);
  }
}

export default Parallax;

import Camera from "./Engine/Camera";
import Display from "./Engine/Display";
import GameObject from "./GameObject";

class Parallax extends GameObject {

  fon: HTMLImageElement = new Image();
  bias: number;

  constructor(image: string, bias: number) {
    super();
    this.fon;
    this.fon.src = image;
    this.bias = bias;
  }

  draw(scene: CanvasRenderingContext2D) {
    let coef = Display.height / this.fon.height
    let pass = (Camera.attached.x * (this.bias / 10)) % (this.fon.width * coef)
    scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass - (this.fon.width * coef), 0, this.fon.width * coef, Display.height)
    scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass, 0, this.fon.width * coef, Display.height)
    scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass + (this.fon.width * coef), 0, this.fon.width * coef, Display.height)
    scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass + (this.fon.width * coef) * 2, 0, this.fon.width * coef, Display.height)
  }
}

export default Parallax;
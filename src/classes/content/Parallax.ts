import Camera from "../Engine/Camera";
import Display from "../Engine/Display";
import GameObject from "../GameObject";
import ResourceLoader from "../Engine/ResourceLoader/ResourceLoader";

class Parallax extends GameObject {

  fon: HTMLImageElement = new Image();
  bias: number;

  constructor(image: string, bias: number) {
    super();
    this.fon = ResourceLoader.get(image).image;
    this.bias = bias;
  }

  draw(scene: CanvasRenderingContext2D) {
    const { fon } = this;
    const ar = Display.height / fon.height;
    const pass = (Camera.x * (this.bias / 10)) % (fon.width * ar);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass - (fon.width * ar), 0, fon.width * ar, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass, 0, fon.width * ar, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * ar), 0, fon.width * ar, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * ar) * 2, 0, fon.width * ar, Display.height);
  }
}

export default Parallax;

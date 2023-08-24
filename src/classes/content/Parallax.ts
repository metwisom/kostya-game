import {Camera} from "../Engine/Camera";
import {Display} from "../Engine/Display";
import {Entity} from "../Entity";
import {ResourceLoader} from "../Engine/ResourceLoader/ResourceLoader";


class Parallax extends Entity {

  fon: HTMLImageElement = new Image();
  bias: number;

  constructor(image: string, bias: number) {
    super();
    this.fon = ResourceLoader.get(image).image;
    this.bias = bias;
  }

  draw(scene: CanvasRenderingContext2D) {
    const {fon} = this;
    const ar = Display.height / fon.height;
    const pass = (Camera.x * (this.bias / 50)) % (fon.width * ar);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass - (fon.width * ar), -Display.height / 2 + Camera.y - Camera.target.viewBox.height / 2, fon.width * ar, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass, -Display.height / 2 + Camera.y - Camera.target.viewBox.height / 2, fon.width * ar, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * ar), -Display.height / 2 + Camera.y - Camera.target.viewBox.height / 2, fon.width * ar, Display.height);
    scene.drawImage(fon, 0, 0, fon.width, fon.height, -pass + (fon.width * ar) * 2, -Display.height / 2 + Camera.y - Camera.target.viewBox.height / 2, fon.width * ar, Display.height);
  }
}

export {Parallax};

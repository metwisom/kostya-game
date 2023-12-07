import {BoxTextured, ViewArea} from "../Box/BoxTextured";
import {Texture} from "../Texture/Texture";
import {D2Updatable} from "../D2Updatable";
import {Camera} from "../Engine/Camera";
import {Display} from "../Engine/Display";
import {BoxCollision} from "../Box/BoxCollision";


class Parallax extends D2Updatable {

  bias: number;
  _originX = 0;
  texture: string;
  constructor(image: string, bias: number) {
    super();
    this._x = 0;
    this._y = 0;
    this.texture = image
    const texture = new Texture(image)

    const coef = Math.max(Display.canvas.height / texture.referenceImage.height, Display.canvas.width / texture.referenceImage.width);

    const width = texture.referenceImage.width * coef;
    const height = texture.referenceImage.height * coef;

    this.viewBox = new BoxTextured(0, 0, width, height, this);
    this.viewBox.setTexture(texture);
    this._physBox = new BoxCollision(0, 0, width, height, this);
    this.bias = bias;
  }

  setOriginX(x:number){
    this._originX = x
  }

  update(delta: number) {

    super.update(delta);
  }

  draw(): ViewArea {
    this.y = -Camera.y - Display.canvas.height / 2;

    this.x = this.viewBox.width * Math.floor((Camera.x - this.viewBox.width / 2) / this.viewBox.width)
    this.x = this.x + this._originX
    this.y = Camera.y - Display.canvas.height / 2 - Camera.target.viewBox.height / 2;

    return super.draw();

  }
}

export {Parallax};

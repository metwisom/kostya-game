import {BoxTextured, ViewArea} from '../Box/BoxTextured';
import {Texture} from '../Texture/Texture';
import {D2Updatable} from '../D2Updatable';
import {Camera} from '../Engine/Camera';
import {Engine} from '../Engine/Engine';
import {Box} from '../Box/Box';


class Parallax extends D2Updatable {

  bias: number;
  _originX = 0;
  texture: string;

  constructor(image: string, bias: number) {
    super();
    this.x = 0;
    this.y = 0;
    this.texture = image;
    const texture = new Texture(image);

    const ratio = Engine.display.height / texture.referenceImage.height;


    const width = texture.referenceImage.width * ratio;
    const height = texture.referenceImage.height * ratio;

    console.log(height);

    this.viewBox = new BoxTextured(0, 0, width, height, this);
    this.viewBox.texture = texture;
    this._physBox = new Box(0, 0, width, height, this);
    this.bias = bias;
  }

  setOriginX(x: number) {
    this._originX = x;
  }

  draw(): ViewArea {
    this.y = -Camera.y - Engine.display.height / 2;

    this.x = this.viewBox.width * Math.floor((Camera.x - this.viewBox.width / 2) / this.viewBox.width);

    this.x = this.x + this._originX;
    this.y = Camera.y - Engine.display.height / 2 + Camera.target.viewBox.height / 2;

    return super.draw();

  }
}

export {Parallax};

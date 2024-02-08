import {BoxTextured} from '../Engine/Box/BoxTextured';
import {Texture} from '../Engine/Texture/Texture';
import {Box} from '../Engine/Box/Box';
import {D2Updatable} from '../Engine/D2Updatable';

class FakeAnimate extends D2Updatable {

  protected _physBox: Box;

  public get physBox(): typeof this._physBox {
    return this._physBox;
  }

  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
    this._physBox = new Box(0, 0, 0, 0, this);
    this.viewBox = new BoxTextured(0, 0, 0, 0, this);
    this.viewBox.texture = new Texture();

  }


  draw() {
    this.x += 0.9;
    return super.draw();
  }


}

export {FakeAnimate};

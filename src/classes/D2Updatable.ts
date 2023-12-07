import {D2Drawable} from "./D2Drawable";
import {BoxCollision} from "./Box/BoxCollision";


class D2Updatable extends D2Drawable {

  protected _physBox: BoxCollision;

  public set physBox(newPhysBox: typeof this._physBox) {
    this._physBox = newPhysBox;
  }

  public get physBox(): typeof this._physBox {
    return this._physBox;
  }

  update(delta: number) {
    this._physBox.update(delta);
  }

}

export {D2Updatable};

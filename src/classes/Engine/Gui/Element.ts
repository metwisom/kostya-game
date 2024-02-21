import {D2Drawable, D2DrawableComponent} from "../D2Drawable";
import {Engine} from "../Engine";
import {BoxTexturedComponent, BoxTextured} from "../Box/BoxTextured";
import {TextureBlank} from "../Texture/TextureBlank";


export enum FloatX {
  left = 1,
  center,
  right,
}

export enum FloatY {
  top = 1,
  center,
  bottom,
}

type ElementComponent = D2Drawable & {
  origX: number,
  origY: number,
  _floatX: number,
  _floatY: number
  x: number,
  y: number,
  floatX: number
  floatY: number,
  width: number
  height: number
}

const Element = function (x: number, y: number, width: number, height: number) {
  const obj: ElementComponent = {
    ...D2Drawable(),
    origX: 0,
    origY: 0,
    _floatX: FloatX.center,
    _floatY: FloatY.center,
    set x(value: number) {
      this._origX = value;
      switch (this.floatX) {
      case FloatX.center:
        this._x = value + Engine.display.width / 2 - this.width / 2;
        break;
      case FloatX.right:
        this._x = Engine.display.width - this.width / 2 - value;
        break;
      default:
        this._x = value - this.width / 2;
      }
    },
    get x() {
      return this._x;
    },
    set y(value: number) {
      this._origY = value;
      switch (this.floatY) {
      case FloatY.center:
        this._y = value + Engine.display.height / 2 - this.height / 2;
        break;
      case FloatY.bottom:
        this._y = Engine.display.height - this.height / 2 - value;
        break;
      default:
        this._y = value - this.height / 2;
      }
    },
    get y() {
      return this._y;
    },

    set floatX(value: FloatX) {
      this._floatX = value;
      this.x = this._origX;
    },
    get floatX() {
      return this._floatX;
    },
    set floatY(value: FloatY) {
      this._floatY = value;
      this.y = this._origY;
    },
    get floatY() {
      return this._floatY;
    },
    set width(value: number) {
      this.viewBox.width = value;
    },
    get width() {
      return this.viewBox.width;
    },
    set height(value: number) {
      this.viewBox.height = value;
    },
    get height() {
      return this.viewBox.height;
    }
  };
  return obj;
};

export {Element,ElementComponent};

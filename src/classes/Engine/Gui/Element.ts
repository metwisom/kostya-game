import {D2Drawable, D2DrawableComponent} from '../D2Drawable';
import {Engine} from '../Engine';


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

type ElementComponent = D2DrawableComponent & {
  origX: number,
  origY: number,
  _floatX: number,
  _floatY: number
  getX(): number,
  setX(value: number): void,
  getY(): number,
  setY(value: number): void,
  _x: number,
  _y: number,
  setFloatX(value: FloatX): void
  getFloatX(): number
  setFloatY(value: FloatY): void
  getFloatY(): number
  getWidth(): number
  setWidth(value: number): void
  getHeight(): number
  setHeight(value: number): void
}

const Element = function (x: number, y: number, _width: number, _height: number) {
  const obj: ElementComponent = {
    ...D2Drawable(),
    origX: x,
    origY: y,
    _floatX: FloatX.center,
    _floatY: FloatY.center,
    _x: 0, _y: 0,
    setX(value: number) {
      this._origX = value;
      switch (this.floatX) {
        case FloatX.center:
          this._x = value + Engine.getDisplay().width / 2 - this.width / 2;
          break;
        case FloatX.right:
          this._x = Engine.getDisplay().width - this.width / 2 - value;
          break;
        default:
          this._x = value - this.width / 2;
      }
    },
    getX() {
      return this._x;
    },
    setY(value: number) {
      this._origY = value;
      switch (this.floatY) {
        case FloatY.center:
          this._y = value + Engine.getDisplay().height / 2 - this.height / 2;
          break;
        case FloatY.bottom:
          this._y = Engine.getDisplay().height - this.height / 2 - value;
          break;
        default:
          this._y = value - this.height / 2;
      }
    },
    getY() {
      return this._y;
    },

    setFloatX(value: FloatX) {
      this._floatX = value;
      this.x = this._origX;
    },
    getFloatX() {
      return this._floatX;
    },
    setFloatY(value: FloatY) {
      this._floatY = value;
      this.y = this._origY;
    },
    getFloatY() {
      return this._floatY;
    },
    setWidth(value: number) {
      this.viewBox.width = value;
    },
    getWidth() {
      return this.viewBox?.width ?? 0;
    },
    setHeight(value: number) {
      this.viewBox.height = value;
    },
    getHeight() {
      return this.viewBox?.height ?? 0;
    },
  };
  return obj;
};

export {Element, ElementComponent};

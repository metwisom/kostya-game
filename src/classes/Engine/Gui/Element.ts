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
  floatX: number,
  floatY: number
  getX(): number,
  setX(value: number): void,
  getY(): number,
  setY(value: number): void,
  x: number,
  y: number,
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
    floatX: FloatX.center,
    floatY: FloatY.center,
    x: 0, y: 0,
    setX(value: number) {
      this.origX = value;
      switch (this.floatX) {
        case FloatX.center:
          this.x = value + Engine.getDisplay().width / 2 - this.getWidth() / 2;
          break;
        case FloatX.right:
          this.x = Engine.getDisplay().width - this.getWidth() / 2 - value;
          break;
        default:
          this.x = value - this.getWidth() / 2;
      }
    },
    getX() {
      return this.x;
    },
    setY(value: number) {
      this.origY = value;
      switch (this.floatY) {
        case FloatY.center:
          this.y = value + Engine.getDisplay().height / 2 - this.getHeight() / 2;
          break;
        case FloatY.bottom:
          this.y = Engine.getDisplay().height - this.getHeight() / 2 - value;
          break;
        default:
          this.y = value - this.getHeight() / 2;
      }
    },
    getY() {
      return this.y;
    },
    setFloatX(value: FloatX) {
      this.floatX = value;
      this.setX(this.origX);
    },
    getFloatX() {
      return this.floatX;
    },
    setFloatY(value: FloatY) {
      this.floatY = value;
      this.setY(this.origY);
    },
    getFloatY() {
      return this.floatY;
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

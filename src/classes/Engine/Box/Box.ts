import {D2Drawable, D2DrawableComponent} from "../D2Drawable";


interface BoxArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

type BoxComponent = {
  x: number
  y: number
  width: number
  height: number
  maintainer: D2DrawableComponent
  hasCollision: boolean
  setCollision: (newValue: boolean) => void
  prop(x: number, y: number): BoxArea
}

const Box = function (x: number, y: number, width: number, height: number, maintainer: D2DrawableComponent) {
  const obj: BoxComponent = {
    x,
    y,
    width,
    height,
    maintainer,
    hasCollision: false,
    setCollision(newValue: boolean) {
      this.hasCollision = newValue;
    },
    prop(x: number = 0, y: number = 0): BoxArea {
      return {
        x: this.maintainer.x - this._x + x,
        y: this.maintainer.y - this._y + y,
        width: this.width,
        height: this.height,
      };
    }
  };
  return Object.freeze(obj);
};

export {BoxArea, BoxComponent, Box};
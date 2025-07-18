import {D2DrawableComponent} from '../D2Drawable';
import {D2UpdatableComponent} from "../D2Updatable";
import {intersectRect} from "../../../utils/intersectRect";


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
  checkCollision<T = D2UpdatableComponent>(objects:D2UpdatableComponent[]): T[]
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
    checkCollision<T = D2UpdatableComponent>(objects:D2UpdatableComponent[]): T[] {
      return objects.filter(e => {
        if (e.getId() !== this.maintainer.getId() && e.physBox.hasCollision) {
          const testBox = e.physBox.prop(0, 0);
          return intersectRect(testBox, this);
        }
      }) as T[];
    },
    prop(x: number = 0, y: number = 0): BoxArea {
      return {
        x: this.maintainer.x - this.x + x,
        y: this.maintainer.y - this.y + y,
        width: this.width,
        height: this.height,
      };
    },
  };
  return obj;
};

export {BoxArea, BoxComponent, Box};
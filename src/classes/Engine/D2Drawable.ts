import {BoxTexturedComponent, ViewArea} from './Box/BoxTextured';


type D2DrawableComponent = {
  type: string
  id: string,
  x: number
  y: number
  viewBox?: BoxTexturedComponent
  draw: () => ViewArea
  isActual: () => boolean
  destroy: () => void
}

const D2Drawable = function (x: number = 0, y: number = 0) {
  let isDestroyed = false;
  let id = Math.random().toString(16).slice(2);
  let viewBox: BoxTexturedComponent = undefined;
  const obj: D2DrawableComponent = {
    type: 'D2Drawable',
    id,
    x, y,
    viewBox,
    draw() {
      return this.viewBox.prop();
    },
    isActual() {
      return !isDestroyed;
    },
    destroy() {
      isDestroyed = true;
      this.viewBox.destroy();
    },
  };
  return obj;
};

export {D2Drawable, D2DrawableComponent};

import {BoxTexturedComponent, ViewArea} from './Box/BoxTextured';


type D2DrawableComponent = {
  type: string
  getId(): string,
  x: number
  y: number
  viewBox?: BoxTexturedComponent
  draw: () => ViewArea
  isActual: () => boolean
  destroy: () => void
}

const D2Drawable = function (x: number = 0, y: number = 0) {
  let isDestroyed = false;
  const id = Math.random().toString(16).slice(2);
  const obj: D2DrawableComponent = {
    type: 'D2Drawable',
    getId() {
      return id;
    },
    x,
    y,
    viewBox: undefined,
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

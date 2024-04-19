import {BoxTexturedComponent, ViewArea} from './Box/BoxTextured';

interface D2DrawableComponent {
  type: string;
  getId: () => string;
  x: number;
  y: number;
  viewBox?: BoxTexturedComponent;
  draw: () => ViewArea;
  isActual: () => boolean;
  destroy: () => void;
}

const D2Drawable = (x: number = 0, y: number = 0): D2DrawableComponent => {
  let isDestroyed = false;
  const id = Math.random().toString(16).slice(2);
  return {
    type: 'D2Drawable',
    getId() {
      return id;
    },
    x,
    y,
    viewBox: undefined,
    draw() {
      return this.viewBox?.prop() ?? '';
    },
    isActual() {
      return !isDestroyed;
    },
    destroy() {
      isDestroyed = true;
      this.viewBox.destroy();
    },
  };
};

export {D2Drawable, D2DrawableComponent};

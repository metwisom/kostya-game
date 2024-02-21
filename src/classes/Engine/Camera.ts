import {D2Drawable, D2DrawableComponent} from "./D2Drawable";

type Camera = {
  readonly target: D2DrawableComponent
  readonly x: number
  readonly y: number
  attach(obj: D2DrawableComponent): void
}

const Camera = (function () {
  const camera: Camera = Object.create(null);
  let attached = D2Drawable();
  Object.defineProperty(camera, 'target', {
    get: () => attached,
    enumerable: false,
    configurable: false,
  });
  Object.defineProperty(camera, 'x', {
    get: () => attached.x,
    enumerable: false,
    configurable: false,
  });
  Object.defineProperty(camera, 'y', {
    get: () => attached.y,
    enumerable: false,
    configurable: false,
  });
  camera.attach = (obj: D2DrawableComponent) => {
    attached = obj;
  };
  return Object.freeze(camera);
})();

export {Camera};

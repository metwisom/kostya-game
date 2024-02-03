import {D2Drawable} from '../D2Drawable';

type Camera = {
  readonly target: D2Drawable
  readonly x: number
  readonly y: number
  attach(obj: D2Drawable): void
}

const Camera = (function () {
  const camera: Camera = Object.create(null);
  let attached = new D2Drawable();
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
  camera.attach = (obj: D2Drawable) => {
    attached = obj;
  };
  return camera;
})();


export {Camera};

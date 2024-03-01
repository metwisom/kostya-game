import {GraphicComponent} from './Graphic';

type DisplayAddonsComponent = {
  add(postCb: CallableFunction): void
  run(scene: GraphicComponent): void
}

const DisplayAddons = function () {
  const postCb: ((scene: GraphicComponent) => void)[] = [];
  const obj: DisplayAddonsComponent = {
    add(cb: (scene: GraphicComponent) => void) {
      postCb.push(cb);
    },
    run(scene: GraphicComponent) {
      postCb.map((cb) => cb(scene));
    },
  };
  return Object.freeze(obj);
};

export {DisplayAddons, DisplayAddonsComponent};

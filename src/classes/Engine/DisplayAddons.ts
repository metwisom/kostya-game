import {GraphicComponent} from './Graphic';

type DisplayAddonsComponent = {
  add(postCb: (scene: GraphicComponent) => void): void;
  run(scene: GraphicComponent): void;
};

const DisplayAddons = () => {
  const postCb: ((scene: GraphicComponent) => void)[] = [];
  const obj: DisplayAddonsComponent = {
    add(cb: (scene: GraphicComponent) => void) {
      postCb.push(cb);
    },
    run(scene: GraphicComponent) {
      postCb.forEach(cb => cb(scene));
    },
  };
  return obj as Readonly<DisplayAddonsComponent>;
};

export {DisplayAddons, DisplayAddonsComponent};

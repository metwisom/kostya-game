import {GraphicComponent} from './Graphic';

type DisplayAddonsComponent = {
  postCb: CallableFunction[]
  add(postCb: CallableFunction): void
  run(scene: GraphicComponent): void
}

const DisplayAddons = function () {
  const obj: DisplayAddonsComponent = {
    postCb: [],
    add(postCb: CallableFunction) {
      this.postCb.push((scene: GraphicComponent) => postCb(scene));
    },
    run(scene: GraphicComponent) {
      this.postCb.map((cb: (arg0: GraphicComponent) => any) => cb(scene));
    },
  };
  return obj;


};

export {DisplayAddons, DisplayAddonsComponent};

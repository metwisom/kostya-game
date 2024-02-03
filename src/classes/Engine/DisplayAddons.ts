import {Graphic} from './Graphic';

class DisplayAddons {

  private postCb: CallableFunction[] = [];

  add(postCb: CallableFunction) {
    this.postCb.push((scene: Graphic) => postCb(scene));
  }

  run(scene: Graphic) {
    this.postCb.map(cb => cb(scene));
  }
}

export {DisplayAddons};

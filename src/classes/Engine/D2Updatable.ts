import {D2Drawable, D2DrawableComponent} from './D2Drawable';
import {Effector} from '../effector/Effector';
import {BoxComponent} from './Box/Box';


type D2UpdatableComponent = D2DrawableComponent & {
  physBox: BoxComponent
  readonly effector: Effector
  update: (delta: number) => void
}
const D2Updatable = function (x: number = 0, y: number = 0) {
  let _effector: Effector = undefined;
  let _physBox: BoxComponent = undefined;
  const parent = D2Drawable(x, y);
  const obj: D2UpdatableComponent = {
    ...parent,
    get effector() {
      if (_effector == undefined) {
        _effector = new Effector();
      }
      return _effector;
    },
    set physBox(newPhysBox: BoxComponent) {
      _physBox = newPhysBox;
    },
    get physBox(): BoxComponent {
      return _physBox;
    },

    update(delta: number) {
      this.effector.run(delta);
    },
  };
  return obj;
};

export {D2Updatable, D2UpdatableComponent};

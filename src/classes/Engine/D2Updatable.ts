import {D2Drawable, D2DrawableComponent} from './D2Drawable';
import {Effector, EffectorComponent} from '../effector/Effector';
import {BoxComponent} from './Box/Box';


type D2UpdatableComponent = D2DrawableComponent & {
  physBox: BoxComponent
  readonly effector: EffectorComponent
  update: (delta: number) => void
}
const D2Updatable = function (x: number = 0, y: number = 0) {
  const parent = D2Drawable(x, y);
  const obj: D2UpdatableComponent = {
    ...parent,
    type: 'D2Updatable',
    effector: Effector(),
    physBox: undefined,
    update(delta: number) {
      this.effector.run(delta);
    },
  };
  return obj;
};

export {D2Updatable, D2UpdatableComponent};

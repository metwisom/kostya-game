import {D2Drawable, D2DrawableComponent} from './D2Drawable';
import {Effector, EffectorComponent} from '../effector/Effector';
import {BoxComponent} from './Box/Box';

interface D2UpdatableComponent extends D2DrawableComponent {
  readonly effector: EffectorComponent;
  physBox: BoxComponent;
  update: (delta: number) => void;
}

const D2Updatable = (x: number = 0, y: number = 0): D2UpdatableComponent => {
  const parent = D2Drawable(x, y);
  return {
    ...parent,
    type: 'D2Updatable',
    effector: Effector(),
    physBox: undefined,
    update(delta: number): void {
      this.effector.run(delta);
    },
  };
};

export {D2Updatable, D2UpdatableComponent};

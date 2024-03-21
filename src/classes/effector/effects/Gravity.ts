import {D2UpdatableComponent} from '../../Engine/D2Updatable';
import {ItemWithStatesComponent} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';


interface Gravitational {
  hasGround: boolean;
  eDown: number;
}

const Gravity = function (maintainer: ItemWithStatesComponent & Gravitational) {
  const obj: IEffect = {
    update(delta: number = 1) {
      const {physBox} = maintainer;
      let inter: D2UpdatableComponent[] = [];

      maintainer.eDown += 0.1;
      const yCollision = physBox.prop(0, maintainer.eDown * delta);

      if (physBox.hasCollision) {
        inter = Engine.checkCollision(yCollision, maintainer.getId());
      }

      if (inter.length === 0) {
        maintainer.y += maintainer.eDown * delta;
        maintainer.hasGround = false;
      } else {
        const {y} = inter[0];
        if (maintainer.y !== y) {
          maintainer.y = y;
          maintainer.hasGround = true;
        }
        maintainer.eDown = 0;
      }

      if (maintainer.eDown > 0) {
        maintainer.setState('jump');
      } else {
        if (maintainer.eDown < 0) {
          maintainer.setState('fall');
        } else {
          if (maintainer.getState() === 'jump' || maintainer.getState() === 'fall') {
            maintainer.setState('idle');
          }
        }
      }
    },
  };
  return obj;
};

export {Gravity, Gravitational};

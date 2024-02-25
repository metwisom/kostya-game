import {Gravitational} from './Gravity';
import {D2UpdatableComponent} from '../../Engine/D2Updatable';
import {IEffect} from '../IEffect';


const AntiGravity = function (maintainer: Gravitational & D2UpdatableComponent) {
  const _maintainer = maintainer;
  setTimeout(() => _maintainer.effector.removeEffect(this), 500);
  const obj: IEffect = {
    update(delta: number = 1) {
      _maintainer.eDown -= 0.01 * delta;
    },
  };
  return obj;
};


export {AntiGravity};

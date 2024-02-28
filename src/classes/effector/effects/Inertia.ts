import {D2UpdatableComponent} from '../../Engine/D2Updatable';
import {ItemWithStatesComponent} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';

interface Inertial {
  momentum: number;
  hasGround: boolean;
}

const Inertia = function (maintainer: ItemWithStatesComponent & Inertial) {
  const _maintainer = maintainer;
  const obj: IEffect = {
    update(delta: number) {
      if (_maintainer.momentum != 0) {
        let inter: D2UpdatableComponent[] = [];
        const xCollision = _maintainer.physBox.prop(_maintainer.momentum * delta, 0);
        if (_maintainer.physBox.hasCollision) {
          inter = Engine.checkCollision(xCollision, _maintainer.getId());
        }
        if (Math.abs(_maintainer.momentum) < 0.001) {
          _maintainer.momentum = 0;
        }
        if (inter.length === 0) {
          _maintainer.x += _maintainer.momentum * delta;
        }
        if (inter.length === 0) {
          if (_maintainer.hasGround)
            _maintainer.momentum -= (_maintainer.momentum * 0.5);
        } else {
          _maintainer.momentum = 0;
        }
        if (_maintainer.momentum != 0) {
          _maintainer.setState('run');
          if (_maintainer.momentum > 0) {
            _maintainer.faced = 'right';
          } else {
            if (_maintainer.momentum < 0) {
              _maintainer.faced = 'left';
            }
          }
        } else {
          _maintainer.setState('idle');
        }
      }
    },
  };
  return Object.freeze(obj);


};

export {Inertia, Inertial};
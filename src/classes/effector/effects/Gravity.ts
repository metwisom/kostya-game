import {D2UpdatableComponent} from '../../Engine/D2Updatable';
import {ItemWithStatesComponent} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';


interface Gravitational {
  hasGround: boolean;
  eDown: number;
}

const Gravity = function (maintainer: ItemWithStatesComponent & Gravitational) {
  const _maintainer = maintainer;
  const obj: IEffect = {
    update(delta: number = 1) {
      const {physBox} = _maintainer;
      let inter: D2UpdatableComponent[] = [];

      _maintainer.eDown += 0.1;
      const yCollision = physBox.prop(0, _maintainer.eDown * delta);

      if (physBox.hasCollision) {
        inter = Engine.checkCollision(yCollision, _maintainer.getId());
      }

      if (inter.length === 0) {
        _maintainer.y += _maintainer.eDown * delta;
        _maintainer.hasGround = false;
      } else {
        const {y} = inter[0];
        if (_maintainer.y !== y) {
          _maintainer.y = y;
          _maintainer.hasGround = true;
        }
        _maintainer.eDown = 0;
      }

      if (_maintainer.eDown > 0) {
        _maintainer.setState('jump');
      } else {
        if (_maintainer.eDown < 0) {
          _maintainer.setState('fall');
        } else {
          if (_maintainer.getState() === 'jump' || _maintainer.getState() === 'fall') {
            _maintainer.setState('idle');
          }
        }
      }
    },
  };
  return obj;
};

export {Gravity, Gravitational};

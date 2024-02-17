import {Gravitational} from './Gravity';
import {D2Updatable} from '../../Engine/D2Updatable';
import {IEffect} from '../IEffect';

class AntiGravity implements IEffect {
  private _maintainer;

  constructor(maintainer: Gravitational & D2Updatable) {
    this._maintainer = maintainer;
    setTimeout(() => this._maintainer.effector.removeEffect(this), 500);
  }

  update(delta: number = 1) {
    this._maintainer.eDown -= 0.01 * delta;
  }
}

export {AntiGravity};

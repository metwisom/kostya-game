import {ItemWithStates} from '../../Engine/ItemWithStates';
import {IEffect} from '../IEffect';
import {Gravitational} from './Gravity';


class Poper extends IEffect {

  protected readonly maintainer: ItemWithStates & Gravitational;

  constructor(maintainer: typeof Poper.prototype.maintainer) {
    super(maintainer);
    setTimeout(() => {
      this.maintainer.effector.removeEffect(this);
    }, 500);
  }

  update(delta: number = 1) {

    this.maintainer.eDown -= 0.01 * delta;

  }
}

export {Poper};
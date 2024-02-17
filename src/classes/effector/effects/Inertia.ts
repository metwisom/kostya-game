import {D2Updatable} from '../../Engine/D2Updatable';
import {ItemWithStates} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';

interface Inertial {
  momentum: number;
  hasGround: boolean;
}

class Inertia implements IEffect {
  protected readonly _maintainer;

  constructor(maintainer: ItemWithStates & Inertial) {
    this._maintainer = maintainer;
  }
  update(delta: number) {
    if (this._maintainer.momentum != 0) {
      let inter: D2Updatable[] = [];
      const xCollision = this._maintainer.physBox.prop(this._maintainer.momentum * delta, 0);
      if (this._maintainer.physBox.hasCollision) {
        inter = Engine.checkCollision(xCollision, this._maintainer.id);
      }
      if (Math.abs(this._maintainer.momentum) < 0.001) {
        this._maintainer.momentum = 0;
      }
      if (inter.length === 0) {
        this._maintainer.x += this._maintainer.momentum * delta;
      }
      if (inter.length === 0) {
        if (this._maintainer.hasGround)
          this._maintainer.momentum -= (this._maintainer.momentum * 0.5);
      } else {
        this._maintainer.momentum = 0;
      }
      if (this._maintainer.momentum != 0) {
        this._maintainer.state = 'run';
        if (this._maintainer.momentum > 0) {
          this._maintainer.faced = 'right';
        } else {
          if (this._maintainer.momentum < 0) {
            this._maintainer.faced = 'left';
          }
        }
      } else {
        this._maintainer.state = 'idle';
      }
    }
  }
}

export {Inertia, Inertial};
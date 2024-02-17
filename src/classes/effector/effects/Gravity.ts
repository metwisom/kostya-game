import {D2Updatable} from '../../Engine/D2Updatable';
import {ItemWithStates} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';

interface Gravitational {
  hasGround: boolean;
  eDown: number;
}

class Gravity implements IEffect {
  private _maintainer;

  constructor(maintainer: ItemWithStates & Gravitational) {
    this._maintainer = maintainer;
  }
  update(delta: number = 1) {
    const {physBox, id} = this._maintainer;
    let inter: D2Updatable[] = [];

    this._maintainer.eDown += 0.1;
    const yCollision = physBox.prop(0, this._maintainer.eDown * delta);

    if (physBox.hasCollision) {
      inter = Engine.checkCollision(yCollision, id);
    }

    if (inter.length === 0) {
      this._maintainer.y += this._maintainer.eDown * delta;
      this._maintainer.hasGround = false;
    } else {
      const {y} = inter[0];
      if (this._maintainer.y !== y) {
        this._maintainer.y = y;
        this._maintainer.hasGround = true;
      }
      this._maintainer.eDown = 0;
    }

    if (this._maintainer.eDown > 0) {
      this._maintainer.state = 'jump';
    } else if (this._maintainer.eDown < 0) {
      this._maintainer.state = 'fall';
    } else if (this._maintainer.state === 'jump' || this._maintainer.state === 'fall') {
      this._maintainer.state = 'idle';
    }
  }
}

export {Gravity, Gravitational};

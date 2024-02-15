import {D2Updatable} from '../../Engine/D2Updatable';
import {ItemWithStates} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';

interface Gravitational {
  hasGround: boolean;
  eDown: number;
}

class Gravity extends IEffect {
  constructor(protected readonly maintainer: ItemWithStates & Gravitational) {
    super(maintainer);
  }

  update(delta: number = 1) {
    const {physBox, id} = this.maintainer;
    let inter: D2Updatable[] = [];

    this.maintainer.eDown += 0.1;
    const yCollision = physBox.prop(0, this.maintainer.eDown * delta);

    if (physBox.hasCollision) {
      inter = Engine.checkCollision(yCollision, id);
    }

    if (inter.length === 0) {
      this.maintainer.y += this.maintainer.eDown * delta;
      this.maintainer.hasGround = false;
    } else {
      const {y} = inter[0];
      if (this.maintainer.y !== y) {
        this.maintainer.y = y;
        this.maintainer.hasGround = true;
      }
      this.maintainer.eDown = 0;
    }

    if (this.maintainer.eDown > 0) {
      this.maintainer.state = 'jump';
    } else if (this.maintainer.eDown < 0) {
      this.maintainer.state = 'fall';
    } else if (this.maintainer.state === 'jump' || this.maintainer.state === 'fall') {
      this.maintainer.state = 'idle';
    }
  }
}

export {Gravity, Gravitational};

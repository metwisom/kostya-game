import {D2Updatable} from '../D2Updatable';
import {ItemWithStates} from '../ItemWithStates';
import {IEffect} from './Effector';
import {Engine} from '../Engine/Engine';


interface Gravitational {
  hasGround: boolean;
  eDown: number;
}

class Gravity extends IEffect {

  protected readonly maintainer: D2Updatable & ItemWithStates & Gravitational;

  constructor(maintainer: typeof Gravity.prototype.maintainer) {
    super(maintainer);
  }

  update(delta: number = 1) {

    let inter: D2Updatable[] = [];

    this.maintainer.eDown += 0.1;
    const yCollision = this.maintainer.physBox.prop(0, this.maintainer.eDown * delta);

    if (this.maintainer.physBox.hasCollision) {
      inter = Engine.checkCollision(yCollision, this.maintainer.id);
    }
    if (inter.length === 0) {
      this.maintainer.y += this.maintainer.eDown * delta;
      this.maintainer.hasGround = false;
    } else {
      if (this.maintainer.y != inter[0].y) {
        this.maintainer.y = inter[0].y;
        this.maintainer.hasGround = true;
      }
      this.maintainer.eDown = 0;
    }


    if (this.maintainer.eDown > 0) {
      this.maintainer.state = 'jump';
    } else if (this.maintainer.eDown < 0) {
      this.maintainer.state = 'fall';

    } else {
      this.maintainer.state = 'idle';
    }


  }
}

export {Gravity, Gravitational};
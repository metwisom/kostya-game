import {D2Updatable} from '../D2Updatable';
import {ItemWithStates} from '../ItemWithStates';
import {IEffect} from './Effector';
import {Engine} from '../Engine/Engine';


interface Inertial {
  momentum: number;
  hasGround: boolean;
}

class Inertia extends IEffect {

  protected readonly maintainer: D2Updatable & ItemWithStates & Inertial;

  constructor(maintainer: typeof Inertia.prototype.maintainer) {
    super(maintainer);
  }

  update(delta: number) {


    if (this.maintainer.momentum != 0) {

      let inter: D2Updatable[] = [];

      const xCollision = this.maintainer.physBox.prop(this.maintainer.momentum * delta, 0);
      if (this.maintainer.physBox.hasCollision) {
        inter = Engine.checkCollision(xCollision, this.maintainer.id);
      }

      if (Math.abs(this.maintainer.momentum) < 0.001) {
        this.maintainer.momentum = 0;
      }

      if (inter.length === 0) {
        this.maintainer.x += this.maintainer.momentum * delta;
      }

      if (inter.length === 0) {
        if(this.maintainer.hasGround)
        this.maintainer.momentum -= (this.maintainer.momentum * 0.5);
      } else {
        this.maintainer.momentum = 0;
      }


      if (this.maintainer.momentum != 0) {

        this.maintainer.state = 'run';
        if (this.maintainer.momentum > 0) {
          this.maintainer.faced = 'right';
        } else {
          if (this.maintainer.momentum < 0) {
            this.maintainer.faced = 'left';
          }
        }
      } else {
        this.maintainer.state = 'idle';
      }


    }
  }
}

export {Inertia, Inertial};
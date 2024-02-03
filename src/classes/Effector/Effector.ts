import {D2Updatable} from '../D2Updatable';

abstract class IEffect {

  protected maintainer: D2Updatable;

  protected constructor(maintainer: D2Updatable) {
    this.maintainer = maintainer;
  }

  abstract update(delta: number):void

}

class Effector {
  private effects: IEffect[] = [];

  addEffect<T>(effect: IEffect) {
    this.effects.push(effect);
  }

  run(delta: number) {
    this.effects.map(effect => effect.update(delta));
  }
}

export {IEffect, Effector};



import {IEffect} from './IEffect';

  abstract update(delta: number):void

}

class Effector {
  private effects: IEffect[] = [];

  addEffect(effect: IEffect) {
    this.effects.push(effect);
  }

  run(delta: number) {
    this.effects.map(effect => effect.update(delta));
  }
}

export {Effector};



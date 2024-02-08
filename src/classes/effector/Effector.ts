import {IEffect} from './IEffect';


class Effector {
  private effects: IEffect[] = [];

  addEffect(effect: IEffect) {
    this.effects.push(effect);
  }

  removeEffect(effect: IEffect){
    this.effects.splice(this.effects.indexOf(effect), 1);
  }

  run(delta: number) {
    this.effects.map(effect => effect.update(delta));
  }
}

export {Effector};



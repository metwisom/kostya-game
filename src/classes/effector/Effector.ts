import {IEffect} from './IEffect';

type EffectorComponent = {
  effects: IEffect[]
  addEffect(effect: IEffect): void
  removeEffect(effect: IEffect): void
  run(delta: number): void
}

const Effector = function () {
  const obj: EffectorComponent = {
    effects: [],
    addEffect(effect: IEffect) {
      this.effects.push(effect);
    },
    removeEffect(effect: IEffect) {
      this.effects.splice(this.effects.indexOf(effect), 1);
    },
    run(delta: number) {
      this.effects.map((effect: IEffect) => effect.update(delta));
    },
  };
  return obj;
};

export {Effector, EffectorComponent};



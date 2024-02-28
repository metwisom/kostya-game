import {Rain, RainComponent} from '../content/Rain';
import {Camera} from './Camera';
import {Engine} from './Engine';

const RainEngine = (() => {
  let rainDrops: RainComponent[] = [];
  let isActive: boolean = false;

  const create = (): void => {
    if (!isActive) return;
    const rain = Rain(Camera.y + 1000);
    rainDrops.push(rain);
    Engine.addObject(rain);
    Engine.addObjectPhys(rain);
  };

  const obj = {
    start() {
      isActive = true;
      for (let i = 0; i < 100; i++) {
        create();
      }
    },
    stop() {
      isActive = false;
      rainDrops.forEach(rain => rain.destroy());
      rainDrops = [];
    },
    toggle() {
      isActive ? obj.stop() : obj.start();
    },
  };

  return Object.freeze(obj);
})();

export {RainEngine};

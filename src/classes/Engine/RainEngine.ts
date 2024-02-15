import {Rain} from '../content/Rain';
import {Camera} from './Camera';
import {Engine} from './Engine';

const RainEngine = (() => {
  let rainDrops: Rain[] = [];
  let isActive: boolean = false;

  const create = (): void => {
    if (!isActive) return;
    const rain = new Rain(Camera.y + 1000);
    rainDrops.push(rain);
    Engine.addObject(rain);
    Engine.addObjectPhys(rain);
  };

  const _rainEngine = Object.create(null);

  _rainEngine.start = (): void => {
    isActive = true;
    for (let i = 0; i < 100; i++) {
      create();
    }
  };

  _rainEngine.stop = (): void => {
    isActive = false;
    rainDrops.forEach(rain => rain.destroy());
    rainDrops = [];
  };

  _rainEngine.toggle = (): void => {
    isActive ? _rainEngine.stop() : _rainEngine.start();
  };

  return Object.freeze(_rainEngine);
})();

export {RainEngine};

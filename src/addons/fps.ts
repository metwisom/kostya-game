import {Graphic} from '../classes/Engine/Graphic';
import {Engine} from '../classes/Engine/Engine';

let fpsCounter = 0;
let recordedFPS = 0;
const frameTimeCache: number[] = [];

const recordFPS = () => {
  recordedFPS = fpsCounter;
  fpsCounter = 0;
};
const recordFrameTime = () => {
  frameTimeCache.push(Engine.drawTime);
  if (frameTimeCache.length > 100) {
    frameTimeCache.shift();
  }
  return Math.round(frameTimeCache.reduce(((p, i) => p + i), 0) / frameTimeCache.length * 10) / 10;
};

const fpsMeter = () => {
  setInterval(recordFPS, 1000);
  return (graphic: Graphic) => {
    fpsCounter++;

    graphic.font = '10px monospace';
    const avgFrameTime = recordFrameTime();
    graphic.drawText('fps: ' + recordedFPS.toString() + '\nframe time: ' + avgFrameTime.toString(), 20, 20);
  };
};

export {fpsMeter};

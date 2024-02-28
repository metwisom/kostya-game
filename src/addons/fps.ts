import {GraphicComponent} from '../classes/Engine/Graphic';
import {Engine} from '../classes/Engine/Engine';


const fpsMeter = () => {
  let fpsCounter = 0;
  let recordedFPS = 0;
  const frameTimeCache: number[] = [];

  const recordFPS = () => {
    recordedFPS = fpsCounter;
    fpsCounter = 0;
  };
  const recordData = () => {
    fpsCounter++;
    frameTimeCache.push(Engine.drawTime);
    if (frameTimeCache.length > 60) {
      frameTimeCache.shift();
    }
  };

  const averageFrameTime = () => {
    return (frameTimeCache.reduce(((p, i) => p + i), 0) / frameTimeCache.length).toFixed(1);
  };

  setInterval(recordFPS, 1000);

  return (graphic: GraphicComponent) => {
    recordData();

    const fpsText = `FPS: ${recordedFPS}`;
    const frameTimeText = `Frame time: ${averageFrameTime()} ms`;

    graphic.setFont('10px Press');
    graphic.drawText(`${fpsText}\n${frameTimeText}`, 20, 20);
  };
};

export {fpsMeter};

import {Graphic} from '../classes/Engine/Graphic';


const fpsMeter = () => {
  let lastFrameTime = performance.now();
  let fpsCounter = 0;
  let recordedFPS = 0;
  const frameTimeCache: number[] = [];

  const recordFPS = () => {
    recordedFPS = fpsCounter;
    fpsCounter = 0;
  };
  const recordData = () => {
    fpsCounter++;
    const currentFrameTime = performance.now();
    const frameTime = currentFrameTime - lastFrameTime;
    lastFrameTime = currentFrameTime;

    frameTimeCache.push(frameTime);
    if (frameTimeCache.length > 100) {
      frameTimeCache.shift();
    }
  };

  const calculateAverageFrameTime = () => {
    return (frameTimeCache.reduce(((p, i) => p + i), 0) / frameTimeCache.length).toFixed(1);
  };

  setInterval(recordFPS, 1000);

  return (graphic: Graphic) => {
    recordData();

    const avgFrameTime = calculateAverageFrameTime();
    const fpsText = `FPS: ${recordedFPS}`;
    const frameTimeText = `Frame time: ${avgFrameTime} ms`;

    graphic.font = '10px Press';
    graphic.drawText(`${fpsText}\n${frameTimeText}`, 20, 20);
  };
};

export {fpsMeter};

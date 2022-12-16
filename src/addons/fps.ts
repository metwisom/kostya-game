let fpsCounter = 0;
let lastFullFps = 0;

const fpsMeter = () => {
  setInterval(() => {
    lastFullFps = fpsCounter;
    fpsCounter = 0;
  }, 1000);
  return (scene: CanvasRenderingContext2D) => {
    fpsCounter++;
    scene.fillText(lastFullFps.toString(), 20, 20);
  };
};

export default fpsMeter;

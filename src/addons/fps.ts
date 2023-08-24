let fpsCounter = 0;
let fpsLastCount = 0;

const fpsMeter = () => {
  setInterval(() => {
    fpsLastCount = fpsCounter;
    fpsCounter = 0;
  }, 1000);
  return (scene: CanvasRenderingContext2D) => {
    scene.font = "10px monospace"
    fpsCounter++;
    scene.fillText("fps: " + fpsLastCount.toString(), 20, 20);
  };
};

export {fpsMeter};

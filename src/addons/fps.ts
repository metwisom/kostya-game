let fps = 0;
let gfps = 0;

const fpsMeter = () => {
  setInterval(() => {
    gfps = fps;
    fps = 0;
  }, 1000);
  return (scene: CanvasRenderingContext2D) => {
    fps++;
    scene.fillText(gfps.toString(), 20, 20);
  };
};

export default fpsMeter;

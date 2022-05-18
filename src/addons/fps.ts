
let fps = 0;
let gfps = 0;

setInterval(() => { gfps = fps; fps = 0; }, 1000);

const fpsMeter = (scene: CanvasRenderingContext2D) => {
  fps++;
  scene.fillText(gfps.toString(), 20, 20);
};

export default fpsMeter;

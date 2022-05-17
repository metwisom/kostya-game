
let fps = 0, gfps = 0;
setInterval(() => { gfps = fps; fps = 0; }, 1000)

function fps_Meter(scene: CanvasRenderingContext2D) {
  fps++;
  scene.fillText(gfps.toString(), 20, 20);
}

export default fps_Meter;
import Camera from "./classes/Engine/Camera";
import Character from "./classes/Character";
import Display from "./classes/Engine/Display";
import Keyboard from "./classes/Engine/Keyboard";
import Parallax from "./classes/Parallax";
import Physics from "./classes/Engine/Physics";
import Structure from "./classes/Structure";
import recalcSceneSize from "./utils/recalcSceneSize";
import fpsMeter from "./addons/fps";

document.addEventListener("DOMContentLoaded", () => {

  Display.attach("display");
  Display.addons.add(fpsMeter);
  Display.startDrawing();
  Physics.start();

  window.addEventListener("resize", () => {
    recalcSceneSize();
  });
});

const plx1 = new Parallax("resources/plx-1.png", 1);
Display.addParallax(plx1);
const plx2 = new Parallax("resources/plx-2.png", 2);
Display.addParallax(plx2);
const plx3 = new Parallax("resources/plx-3.png", 3);
Display.addParallax(plx3);
const plx4 = new Parallax("resources/plx-4.png", 4);
Display.addParallax(plx4);
const plx5 = new Parallax("resources/plx-5.png", 5);
Display.addParallax(plx5);

for (let i = 0; i < 100; i++) {
  const box = new Structure(50 + i * 250, 300);
  Display.addObject(box, 1);
  Physics.addObject(box);
}

const Kostya = new Character(100, 100);
Display.addObject(Kostya, 1);
Physics.addObject(Kostya);

Keyboard.attach(Kostya);
Camera.attach(Kostya);

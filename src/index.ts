import {Camera} from "./classes/Engine/Camera";
import {Character} from "./classes/content/Character";
import {Display} from "./classes/Engine/Display";
import {Keyboard} from "./classes/Engine/Keyboard";
import {Physics} from "./classes/Engine/Physics";
import {fpsMeter} from "./addons/fps";
import {ResourceLoader} from "./classes/Engine/ResourceLoader/ResourceLoader";
import {MapLoader} from "./classes/Engine/Map/MapLoader";
import {Particle} from "./classes/content/Particle";
// import {Particle} from "./classes/content/Particle";

document.addEventListener("DOMContentLoaded", async () => {

  await ResourceLoader.load("/resource.json");

  await MapLoader.load("/map.json");


  const Kostya = new Character(0, 0);
  Display.addObject(Kostya, 1);
  Physics.addObject(Kostya);

  setInterval(() => {
    const part = new Particle(Kostya.x, Kostya.y + Kostya.height / 2);
    Display.addObject(part, 2);
    Physics.addObject(part);
  }, 100);

  Keyboard.attach(Kostya);
  Camera.attach(Kostya);

  Display.attach("display");
  Display.addons.add(fpsMeter());
  Display.startDrawing();
  Physics.start();

  window.addEventListener("resize", () => {
    Display.recalculateSceneSize();
  });
});


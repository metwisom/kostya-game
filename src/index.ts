import Camera from "./classes/Engine/Camera";
import Character from "./classes/content/Character";
import Display from "./classes/Engine/Display";
import Keyboard from "./classes/Engine/Keyboard";
import Parallax from "./classes/content/Parallax";
import Physics from "./classes/Engine/Physics";
import fpsMeter from "./addons/fps";
import ResourceLoader from "./classes/Engine/ResourceLoader/ResourceLoader";
import MapLoader from "./classes/Engine/Map/MapLoader";

document.addEventListener("DOMContentLoaded", async () => {

  await ResourceLoader.load("/resource.json");

  const plx1 = new Parallax("plx-1.png", 1);
  Display.addParallax(plx1);
  const plx2 = new Parallax("plx-2.png", 2);
  Display.addParallax(plx2);
  const plx3 = new Parallax("plx-3.png", 3);
  Display.addParallax(plx3);
  const plx4 = new Parallax("plx-4.png", 4);
  Display.addParallax(plx4);
  const plx5 = new Parallax("plx-5.png", 5);
  Display.addParallax(plx5);


  await MapLoader.load("/map.json");


  const Kostya = new Character(0, 0);
  Display.addObject(Kostya, 1);
  Physics.addObject(Kostya);
  // Display.addObject(Kostya1, 1);
  // Physics.addObject(Kostya1);

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


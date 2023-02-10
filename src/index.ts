import {Display} from "./classes/Engine/Display";
import {Physics} from "./classes/Engine/Physics";
import {fpsMeter} from "./addons/fps";
import {ResourceLoader} from "./classes/Engine/ResourceLoader/ResourceLoader";
import {MapLoader} from "./classes/Engine/Map/MapLoader";


document.addEventListener("DOMContentLoaded", async () => {

  await ResourceLoader.load("/resources/resource.json");

  await MapLoader.load("/resources/map.json");

  Display.attach("display");

  // Включаем счетчик FPS как аддон дисплея
  Display.addons.add(fpsMeter());

  Display.startDrawing();
  Physics.start();

  window.addEventListener("resize", () => {
    Display.recalculateSceneSize();
  });
});


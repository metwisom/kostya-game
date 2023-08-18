import {Display} from "./classes/Engine/Display";
import {Physics} from "./classes/Engine/Physics";
import {fpsMeter} from "./addons/fps";
import {ResourceLoader} from "./classes/Engine/ResourceLoader/ResourceLoader";
import {MapLoader} from "./classes/Engine/Map/MapLoader";
import {Camera} from "./classes/Engine/Camera";
import {Keyboard} from "./classes/Engine/Keyboard";


document.addEventListener("DOMContentLoaded", async () => {

  await ResourceLoader.load("/resources/resource.json");

  await MapLoader.load("/resources/map.json");

  // Указываем полотно для дисплея
  const canvas = document.getElementById("display") as HTMLCanvasElement
  Display.attach(canvas);

  // АДДОНЫ
  // Включаем счетчик FPS как аддон дисплея
  Display.addons.add(fpsMeter());

  Camera.attach(Keyboard);


  // Запускаем рендер и физику
  Display.start();
  Physics.start();
});


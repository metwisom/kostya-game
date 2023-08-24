import {Display} from "./classes/Engine/Display";
import {Physics} from "./classes/Engine/Physics";
import {fpsMeter} from "./addons/fps";
import {ResourceLoader} from "./classes/Engine/ResourceLoader/ResourceLoader";
import {MapLoader} from "./classes/Engine/Map/MapLoader";
import {objectCounter} from "./addons/objectCount";
import Element from "./classes/Engine/Gui/Element";
import {Mouse} from "./classes/Engine/Mouse";
import Button from "./classes/Engine/Gui/Button";


document.addEventListener("DOMContentLoaded", async () => {

  await ResourceLoader.load("/resources/resource.json");

  await MapLoader.load("/resources/map.json");

  // Указываем полотно для дисплея
  const canvas = document.getElementById("display") as HTMLCanvasElement
  Display.attach(canvas);

  // АДДОНЫ
  // Включаем счетчик FPS как аддон дисплея
  Display.addons.add(fpsMeter());
  Display.addons.add(objectCounter());

  const testButton = new Button()
  testButton.x = 100
  testButton.y = 50
  testButton.width = 150
  testButton.height= 50
  testButton.text = "Press Нажми"
  testButton.floatX = 'right'
  testButton.floatY = 'bottom'
  Display.addObject(testButton)
  Mouse.addSlave(testButton)
  testButton.ownEvent = () => {
    Display.debug.showBoxes = !Display.debug.showBoxes
  }

  // Camera.attach(Keyboard);


  // Запускаем рендер и физику
  Display.start();
  Physics.start();
});


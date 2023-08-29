import {Display} from "./classes/Engine/Display";
import {Physics} from "./classes/Engine/Physics";
import {fpsMeter} from "./addons/fps";
import {ResourceLoader} from "./classes/Engine/ResourceLoader/ResourceLoader";
import {MapLoader} from "./classes/Engine/Map/MapLoader";
import {objectCounter} from "./addons/objectCount";
import {Mouse} from "./classes/Engine/Mouse";

import {FloatX, FloatY} from "./classes/Engine/Gui/GuiBox";
import {Button} from "./classes/Engine/Gui/Button";
import {RainEngine} from "./classes/Engine/RainEngine";


document.addEventListener("DOMContentLoaded", async () => {

  await ResourceLoader.load("/resources/resource.json");

  await MapLoader.load("/resources/map.json");

  // Указываем полотно для дисплея
  const canvas = document.getElementById("display") as HTMLCanvasElement;
  Display.attach(canvas);

  // АДДОНЫ
  // Включаем счетчик FPS как аддон дисплея
  Display.addons.add(fpsMeter());
  Display.addons.add(objectCounter());

  const testButton = new Button(100, 50, 150,50,"Press Нажми");
  testButton.viewBox.floatX = FloatX.right;
  testButton.viewBox.floatY = FloatY.bottom;
  Display.addObject(testButton);
  Mouse.addSlave(testButton);
  testButton.ownEvent = () => {
    Display.debug.showBoxes = !Display.debug.showBoxes;
  };

  const rainEngine = new RainEngine()
  rainEngine.start()

  // Camera.attach(Keyboard);


  // Запускаем рендер и физику
  Display.start();
  Physics.start();
});


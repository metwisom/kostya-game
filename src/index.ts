import {Display} from "./classes/Engine/Display";
import {Physics} from "./classes/Engine/Physics";
import {fpsMeter} from "./addons/fps";
import {ResourceLoader} from "./classes/Engine/ResourceLoader/ResourceLoader";
import {MapLoader} from "./classes/Engine/Map/MapLoader";
import {objectCounter} from "./addons/objectCount";
import {Keyboard} from "./classes/Engine/Input/Keyboard";
import {FloatX, FloatY} from "./classes/Engine/Gui/Element";
import {RainEngine} from "./classes/Engine/RainEngine";
import {Mouse} from "./classes/Engine/Input/Mouse";
import {InputController} from "./classes/Engine/Input/InputController";
import {GameKeys} from "./classes/Engine/Input/InputKey";
import {Button} from "./classes/Engine/Gui/Button";
import {Touch} from "./classes/Engine/Input/Touch";


document.addEventListener("DOMContentLoaded", async () => {

  Keyboard.init()

  const canvas = document.getElementById("display") as HTMLCanvasElement;
  Display.attach(canvas);

  await ResourceLoader.load("/resources/resource.json");

  await MapLoader.load("/resources/map1.json");

  // АДДОНЫ
  // Включаем счетчик FPS как аддон дисплея
  Display.addons.add(fpsMeter());
  Display.addons.add(objectCounter());

  const rainButton = new Button(0, 200, 150, 50, "Дождь");
  rainButton.floatX = FloatX.left;
  rainButton.floatY = FloatY.bottom;
  Display.addObject(rainButton);
  Mouse.addObject(rainButton);
  rainButton.ownEvent = (e) => {
    if(e[GameKeys.LEFT_MOUSE].status(true)) {
      RainEngine.toggle();
    }
  };

  const rainButton2 = new Button(150, 50, 100, 100, "D");
  rainButton2.floatX = FloatX.left;
  rainButton2.floatY = FloatY.bottom;
  Display.addObject(rainButton2);
  Touch.addObject(rainButton2);
  rainButton2.ownEvent = (e) => {
    InputController.updateState(GameKeys.D,e[GameKeys.LEFT_MOUSE].status(true))
  };

  const rainButton3 = new Button(50, 50, 100, 100, "A");
  rainButton3.floatX = FloatX.left;
  rainButton3.floatY = FloatY.bottom;
  Display.addObject(rainButton3);
  Touch.addObject(rainButton3);
  rainButton3.ownEvent = (e) => {
    InputController.updateState(GameKeys.A,e[GameKeys.LEFT_MOUSE].status(true))
  };


  const rainButton4 = new Button(50, 50, 100, 100, "Space");
  rainButton4.floatX = FloatX.right;
  rainButton4.floatY = FloatY.bottom;
  Display.addObject(rainButton4);
  Touch.addObject(rainButton4);
  rainButton4.ownEvent = (e) => {
    InputController.updateState(GameKeys.Space,e[GameKeys.LEFT_MOUSE].status(true))
  };

  const rainButton5 = new Button(150, 50, 100, 100, "Полный экран");
  rainButton5.floatX = FloatX.left;
  rainButton5.floatY = FloatY.top;
  Display.addObject(rainButton5);
  Touch.addObject(rainButton5);
  rainButton5.ownEvent = () => {
    Display.display.requestFullscreen();
  };

  let lastMap = '1'

  const rainButton6 = new Button(150, 150, 100, 100, "Переключить карту");
  rainButton6.floatX = FloatX.right;
  rainButton6.floatY = FloatY.top;
  Display.addObject(rainButton6);
  Mouse.addObject(rainButton6);
  rainButton6.ownEvent = (e) => {
    if(e[GameKeys.LEFT_MOUSE].status(true)) {
      MapLoader.load("/resources/map" + (lastMap = lastMap == '1' ? '2' : '1') + ".json");
    }
  };


  // Запускаем рендер и физику
  Display.start();
  Physics.start();
});


import {GameKeys} from "./InputKey";
import {InputController} from "./InputController";
import Element from "../Gui/Element";
import {Eventful} from "../interfaces/Eventful";


const Mouse = (function () {

  const slave = InputController;

  const objects: (Element & Eventful)[] = [];

  const mouse: Record<string, GameKeys> = {
    "mousedown": GameKeys.LEFT_MOUSE,
    "mouseup": GameKeys.LEFT_MOUSE,
  };

  let x = 0;
  let y = 0;

  const move = (e: MouseEvent) => {
    x = e.clientX;
    y = e.clientY;
  };

  const updateState = (state: boolean, e: MouseEvent) => {
    const buttons = objects.filter(obj => {
        return obj.x <= x && obj.x + obj.width >= x &&
          obj.y <= y && obj.y + obj.height >= y;
      }
    );


    if (mouse[e.type]) {
      if (buttons.length > 0) {
        slave.updateState(GameKeys.LEFT_MOUSE, state, false, {x: x, y: y});
        return buttons[0].Event({keyMap:InputController.keyboard});
      }

      slave.updateState(GameKeys.LEFT_MOUSE, state, true, {x: x, y: y});
    }


  };

  document.addEventListener("mousedown", updateState.bind(this, true));
  document.addEventListener("mouseup", updateState.bind(this, false));
  document.addEventListener("mousemove", move.bind(this));

  return Object.freeze({
    addObject(obj: Eventful & Element) {
      objects.push(obj);
    },
    removeObject(obj: Eventful & Element) {
      objects.splice(objects.indexOf(obj), 1);
    }
  });
})();


export {Mouse};
//
import {GameKeys} from './InputKey';
import {InputController} from './InputController';
import Element from '../Gui/Element';
import {Eventful} from '../interfaces/Eventful';


const Touch = (function () {

  const slave = InputController;

  const objects: (Element & Eventful)[] = [];

  const mouse: Record<string, GameKeys> = {
    'touchstart': GameKeys.LEFT_MOUSE,
    'touchend': GameKeys.LEFT_MOUSE,
  };

  let x = 0;
  let y = 0;

  const move = (e: TouchEvent) => {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  };

  const updateState = (state: boolean, e: TouchEvent) => {
    Array.from(e.changedTouches).map(touch => {

      if (touch.clientX != undefined) {
        x = touch.clientX;
        y = touch.clientY;
      }

      const buttons = objects.filter(obj => {
          return obj.x <= x && obj.x + obj.width >= x &&
            obj.y <= y && obj.y + obj.height >= y;
        },
      );

      if (mouse[e.type]) {
        if (buttons.length > 0) {
          slave.updateState(GameKeys.LEFT_MOUSE, state, false, {x: x, y: y});
          return buttons[0].Event({keyMap: InputController.keyboard});
        }

        slave.updateState(GameKeys.LEFT_MOUSE, state, true, {x: x, y: y});
      }


    });
  };

  document.addEventListener('touchstart', updateState.bind(this, true));
  document.addEventListener('touchend', updateState.bind(this, false));
  document.addEventListener('touchmove', move.bind(this));

  return Object.freeze({
    addObject(obj: Eventful & Element) {
      objects.push(obj);
    },
  });
})();


export {Touch};

import {GameKeys} from './InputKey';
import {InputController} from './InputController';
import {ElementComponent} from '../Gui/Element';
import {Eventful} from '../interfaces/Eventful';


const Mouse = (function () {

  const slave = InputController;

  const objects: (ElementComponent & Eventful)[] = [];

  const mouse: Record<string, GameKeys> = {
    'mousedown': GameKeys.LEFT_MOUSE,
    'mouseup': GameKeys.LEFT_MOUSE,
  };

  let x = 0;
  let y = 0;

  const move = (e: MouseEvent) => {
    x = e.clientX;
    y = e.clientY;
  };

  const updateState = (state: boolean, e: MouseEvent) => {
    const buttons = objects.filter(obj => {

      console.log(obj.getX());
        return obj.getX() <= x && obj.getX() + obj.getWidth() >= x &&
          obj.getY() <= y && obj.getY() + obj.getHeight() >= y;
      },
    );




    if (mouse[e.type]) {
      if (buttons.length > 0) {
        slave.updateState(GameKeys.LEFT_MOUSE, state, false, {x: x, y: y});
        return buttons[0].Event({keyMap: InputController.keyboard});
      }

      slave.updateState(GameKeys.LEFT_MOUSE, state, true, {x: x, y: y});
    }


  };

  document.addEventListener('mousedown', updateState.bind(this, true));
  document.addEventListener('mouseup', updateState.bind(this, false));
  document.addEventListener('mousemove', move.bind(this));

  return Object.freeze({
    addObject(obj: Eventful & ElementComponent) {
      objects.push(obj);
    },
    removeObject(obj: Eventful & ElementComponent) {
      objects.splice(objects.indexOf(obj), 1);
    },
  });
})();


export {Mouse};
//
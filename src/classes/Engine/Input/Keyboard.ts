import {InputController} from './InputController';
import {GameKeys} from './InputKey';


const Keyboard = (function () {

  const slave = InputController;
  const keyMap: Record<string, GameKeys> = {
    'KeyA': GameKeys.A,
    'KeyD': GameKeys.D,
    'Space': GameKeys.Space,
    'KeyC': GameKeys.C,
  };

  const updateState = (code: string, event: KeyboardEvent, state: boolean) => {
    if (keyMap[code] !== undefined) {
      slave.updateState(keyMap[code], state);
    }
  };

  return Object.freeze({
    init() {
      document.addEventListener('keydown', e => updateState(e.code, e, true));
      document.addEventListener('keyup', e => updateState(e.code, e, false));
    },
  });
})();

export {Keyboard};

import {Eventful} from '../interfaces/Eventful';
import {GameKeys, InputKey, InputKeyComponent} from './InputKey';


export type InputMap = {
  [value in GameKeys]: InputKeyComponent
}

const InputController = (function () {

  const keyboard: InputMap = {
    [GameKeys.A]: InputKey(GameKeys.A),
    [GameKeys.D]: InputKey(GameKeys.D),
    [GameKeys.C]: InputKey(GameKeys.C),
    [GameKeys.SHIFT]: InputKey(GameKeys.SHIFT),
    [GameKeys.Space]: InputKey(GameKeys.Space),
    [GameKeys.LEFT_MOUSE]: InputKey(GameKeys.LEFT_MOUSE),
  };

  let slave: Eventful = undefined;

  return Object.freeze({
    keyboard,
    update() {
      if (slave !== undefined) {
        slave.Event({keyMap: keyboard});
      }
    },
    setSlave: (obj: Eventful) => {
      slave = obj;
    },

    updateState: (key: GameKeys, state: boolean, propagation = true, meta: { x: number, y: number } = undefined) => {
      if (keyboard[key] !== undefined) {
        if (meta != undefined) {
          keyboard[key].position.x = meta.x;
          keyboard[key].position.y = meta.y;
        }
        if (state !== keyboard[key].status(true)) {
          keyboard[key].set(state, propagation);
        }
      }
    },
  });
})();

export {InputController};

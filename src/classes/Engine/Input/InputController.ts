import {Eventful} from '../interfaces/Eventful';
import {InputKey, GameKeys} from './InputKey';


export type InputMap = {
  [value in GameKeys]: InputKey
}

const InputController = (function () {

  const keyboard: InputMap = {
    [GameKeys.A]: new InputKey(GameKeys.A),
    [GameKeys.D]: new InputKey(GameKeys.D),
    [GameKeys.C]: new InputKey(GameKeys.C),
    [GameKeys.Space]: new InputKey(GameKeys.Space),
    [GameKeys.LEFT_MOUSE]: new InputKey(GameKeys.LEFT_MOUSE),
  };

  let slave: Eventful = undefined;

  return Object.freeze({
    get keyboard() {
      return keyboard
    },
    update() {
      if (slave !== undefined) {
        slave.Event(keyboard);
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
    }
  });
})();

export {InputController};

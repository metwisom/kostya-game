import GameObject from "../GameObject";
import { _Camera } from "./Camera";
import GameKeyboard, { _GameKeyboard } from "./GameKeyboard";

class _Keyboard {

  slave: _GameKeyboard;

  virtualKeys: Record<string, KeyboardEvent> = {};

  constructor() {
    document.addEventListener('keydown', e => this.codeReaction(e.code, true, e))
    document.addEventListener('keyup', e => this.codeReaction(e.code, false, e))
  }

  attach(slave: GameObject) {
    GameKeyboard.master = this;
    GameKeyboard.slave = slave;
    this.slave = GameKeyboard
  }

  unAttach() {
    GameKeyboard.master = undefined;
    GameKeyboard.slave = undefined;
    this.slave = undefined;
  }

  codeReaction(code: string, bool: Boolean, event: KeyboardEvent) {
    if (bool) {
      this.virtualKeys[code] = event;
    } else {
      delete this.virtualKeys[code];
    }
    if (this.slave) {
      this.slave.updateState();
    }
  }
}

const Keyboard = new _Keyboard();

export default Keyboard;

export { _Keyboard };
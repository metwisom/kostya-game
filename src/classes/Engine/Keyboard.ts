import GameObject from "../GameObject";
import { _Camera } from "./Camera";
import GameKeyboard, { _GameKeyboard } from "./GameKeyboard";

// tslint:disable-next-line: class-name
class _Keyboard {

  private slave: _GameKeyboard;
  private virtualKeys: Record<string, KeyboardEvent> = {};

  constructor() {
    document.addEventListener("keydown", e => this.codeReaction(e.code, true, e));
    document.addEventListener("keyup", e => this.codeReaction(e.code, false, e));
  }

  getKey(key: string) {
    return this.virtualKeys[key];
  }

  attach(slave: GameObject) {
    GameKeyboard.setMaster(this);
    GameKeyboard.setSlave(slave);
    this.slave = GameKeyboard;
  }

  unAttach() {
    GameKeyboard.setMaster(undefined);
    GameKeyboard.setSlave(undefined);
    this.slave = undefined;
  }

  private codeReaction(code: string, bool: boolean, event: KeyboardEvent) {
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

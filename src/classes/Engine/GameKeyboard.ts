import {Entity} from "../Entity";
import {_Keyboard} from "./Keyboard";
import {KeyboardKey} from "./KeyboardKey";


class _GameKeyboard {

  private a = new KeyboardKey();
  private d = new KeyboardKey();
  private space = new KeyboardKey();

  private slave: Entity;
  private master: _Keyboard;

  setMaster(keyboard: _Keyboard) {
    this.master = keyboard;
  }

  // removeMaster() {
  //   this.master = undefined;
  // }

  setSlave(obj: Entity) {
    this.slave = obj;
  }

  // removeSlave() {
  //   this.slave = undefined;
  // }

  updateState() {
    this.a.set(this.master.getKey("KeyA") !== undefined);
    this.d.set(this.master.getKey("KeyD") !== undefined);
    this.space.set(this.master.getKey("Space") !== undefined);
  }

  update() {
    if (this.master === undefined || this.slave === undefined) {
      return;
    }
    if (this.a.status && this.slave.hasGround) {
      this.slave.faced = "left";
      this.slave.momentum = -this.slave.speed;
    }

    if (this.d.status && this.slave.hasGround) {
      this.slave.faced = "right";
      this.slave.momentum = this.slave.speed;
    }

    if (this.space.pressed && this.slave.hasGround) {
      this.slave.eDown = -11;
      this.slave.hasGround = false;
      this.slave.state = "jump";
    }
  }
}

const GameKeyboard = new _GameKeyboard();

export {GameKeyboard, _GameKeyboard};

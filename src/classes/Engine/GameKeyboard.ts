import {Entity} from "../Entity";
import {_Keyboard} from "./Keyboard";

class _GameKeyboard {

  private a = false;
  private d = false;
  private space = false;

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
    this.a = this.master.getKey("KeyA") !== undefined;
    this.d = this.master.getKey("KeyD") !== undefined;
    this.space = this.master.getKey("Space") !== undefined;
  }

  update() {
    if (this.master === undefined || this.slave === undefined) {
      return;
    }
    if (this.a && this.slave.hasGround) {
      this.slave.faced = "left";
      this.slave.momentum = -this.slave.speed;
    }

    if (this.d && this.slave.hasGround) {
      this.slave.faced = "right";
      this.slave.momentum = this.slave.speed;
    }

    if (this.space && this.slave.hasGround) {
      this.slave.eDown = -11;
      this.slave.hasGround = false;
      this.slave.state = "jump";
    }
  }
}

const GameKeyboard = new _GameKeyboard();

export {GameKeyboard, _GameKeyboard};

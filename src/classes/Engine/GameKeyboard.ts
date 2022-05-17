import GameObject from "../GameObject";
import { _Keyboard } from "./Keyboard";

class _GameKeyboard {

    a: Boolean = false;
    d: Boolean = false;
    space: Boolean = false;

    slave: GameObject;
    master: _Keyboard;

    updateState() {
        this.a = this.master.virtualKeys['KeyA'] != undefined
        this.d = this.master.virtualKeys['KeyD'] != undefined
        this.space = this.master.virtualKeys['Space'] != undefined
    }

    update() {
        if (this.master == undefined || this.slave == undefined) {
            return;
        }
        if (this.a && this.slave.may_ground) {
            this.slave.faced = 0;
            this.slave.inertion = -this.slave.speed
        }

        if (this.d && this.slave.may_ground) {
            this.slave.faced = 1;
            this.slave.inertion = this.slave.speed
        }

        if (this.space && this.slave.may_ground) {
            this.slave.e_down = -10;
            this.slave.may_ground = false;
            this.slave.state = 'jump';
        }
    }
}


const GameKeyboard = new _GameKeyboard();

export default GameKeyboard;

export { _GameKeyboard };
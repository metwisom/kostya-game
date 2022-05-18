import GameObject from "../GameObject";
import { _Keyboard } from "./Keyboard";

// tslint:disable-next-line: class-name
class _GameKeyboard {

    a: boolean = false;
    d: boolean = false;
    space: boolean = false;

    slave: GameObject;
    master: _Keyboard;

    updateState() {
        this.a = this.master.virtualKeys.KeyA !== undefined;
        this.d = this.master.virtualKeys.KeyD !== undefined;
        this.space = this.master.virtualKeys.Space !== undefined;
    }

    update() {
        if (this.master === undefined || this.slave === undefined) {
            return;
        }
        if (this.a && this.slave.hasGround) {
            this.slave.faced = 0;
            this.slave.inertion = -this.slave.speed;
        }

        if (this.d && this.slave.hasGround) {
            this.slave.faced = 1;
            this.slave.inertion = this.slave.speed;
        }

        if (this.space && this.slave.hasGround) {
            this.slave.eDown = -10;
            this.slave.hasGround = false;
            this.slave.state = "jump";
        }
    }
}

const GameKeyboard = new _GameKeyboard();

export default GameKeyboard;

export { _GameKeyboard };

import GameObject from "../GameObject";
import { _Keyboard } from "./Keyboard";

// tslint:disable-next-line: class-name
class _GameKeyboard {

    private a: boolean = false;
    private d: boolean = false;
    private space: boolean = false;

    private slave: GameObject;
    private master: _Keyboard;

    setMaster(keyboard: _Keyboard) {
        this.master = keyboard;
    }

    setSlave(obj: GameObject) {
        this.slave = obj;
    }

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

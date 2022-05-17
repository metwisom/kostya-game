import GameObject from "../GameObject";

class _Keyboard {

    a: Boolean = false;
    d: Boolean = false;
    space: Boolean = false;
    slave: GameObject;

    constructor() {
        document.addEventListener('keydown', e => this.codeReaction(e.code, true))
        document.addEventListener('keyup', e => this.codeReaction(e.code, false))
    }

    attach(slave: GameObject) {
        this.slave = slave
    }

    codeReaction(code: string, bool: Boolean) {
        switch (code) {
            case 'KeyA':
                this.a = bool
                break;
            case 'KeyD':
                this.d = bool
                break;
            case 'Space':
                this.space = bool
                break;
            default:
                break;
        }
    }

    update() {
        if (this.slave == undefined) {
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

const Keyboard = new _Keyboard();

export default Keyboard;


export { _Keyboard };
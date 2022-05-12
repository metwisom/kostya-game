import intersectRect from "../../utils/intersectRect";
import Physics from "./Physics";

class Keyboard {
    constructor() {
        this.a = false;
        this.d = false;
        this.space = false;
        document.addEventListener('keydown', e => this.codeReaction(e.code, true))
        document.addEventListener('keyup', e => this.codeReaction(e.code, false))
        this.last_time = new Date().valueOf()
        requestAnimationFrame(() => this.update())
    }
    codeReaction(code, bool) {
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
        let delta = new Date().valueOf() - this.last_time;
        if (this.slave == undefined) {
            return;
        }
        if (this.a && this.slave.may_ground) {
            this.slave.faced = 0;

            let new_x = this.slave.x - this.slave.speed * delta
            const hit_box = { left: new_x, top: this.slave.y, right: new_x + this.slave.width, bottom: this.slave.y + this.slave.height }
            const inter = Physics.checkCollision(hit_box, this.slave.id);

            if (inter.length == 0) {
                this.slave.state = 'run';
                this.slave.inertion = -this.slave.speed
            }


        }

        if (this.d && this.slave.may_ground) {
            this.slave.faced = 1;
            let new_x = this.slave.x + this.slave.speed * delta
            const hit_box = { left: new_x, top: this.slave.y, right: new_x + this.slave.width, bottom: this.slave.y + this.slave.height }
            const inter = Physics.checkCollision(hit_box, this.slave.id);

            if (inter.length == 0) {
                this.slave.state = 'run';
                this.slave.inertion = this.slave.speed
            }
        }

        if (this.space && this.slave.may_ground) {
            this.slave.e_down = -10;
            this.slave.may_ground = false;
            this.slave.state = 'jump';
        }
        requestAnimationFrame(() => this.update())
        this.last_time = new Date().valueOf()
    }
}

export default Keyboard;
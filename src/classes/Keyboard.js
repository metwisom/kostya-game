import intersectRect from "../utils/intersectRect";

class Keyboard {
    constructor(objects) {
        this.objects = objects;
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
        if (this.slave.may_ground) {
            this.slave.state = 'idle'
            this.slave.inertion = 0
        } else {
            let new_x = this.slave.x + this.slave.inertion * delta
            let inter = this.objects.filter(e => {
                if (e == this.slave) {
                    return;
                }
                return intersectRect(
                    { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height },
                    { left: new_x, top: this.slave.y, right: new_x + this.slave.width, bottom: this.slave.y + this.slave.height },
                )

            })
            if (inter.length == 0) {
                this.slave.x += this.slave.inertion * delta;
            }
        }
        if (this.a && this.slave.may_ground) {
            this.slave.faced = 0;

            let new_x = this.slave.x - this.slave.speed * delta
            let inter = this.objects.filter(e => {
                if (e == this.slave) {
                    return;
                }
                return intersectRect(
                    { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height },
                    { left: new_x, top: this.slave.y, right: new_x + this.slave.width, bottom: this.slave.y + this.slave.height },
                )

            })
            if (inter.length == 0) {
                this.slave.state = 'run';
                this.slave.x -= this.slave.speed * delta;
                this.slave.inertion = -this.slave.speed
            }


        }
        if (this.d && this.slave.may_ground) {
            this.slave.faced = 1;
            let new_x = this.slave.x + this.slave.speed * delta
            let inter = this.objects.filter(e => {
                if (e == this.slave) {
                    return;
                }
                return intersectRect(
                    { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height },
                    { left: new_x, top: this.slave.y, right: new_x + this.slave.width, bottom: this.slave.y + this.slave.height },
                )

            })
            if (inter.length == 0) {
                this.slave.state = 'run';
                this.slave.x += this.slave.speed * delta;
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
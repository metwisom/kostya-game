
class _Keyboard {
    constructor() {
        this.a = false;
        this.d = false;
        this.space = false;

        this.timeTouch = 0;


        this.timerEvent = undefined;


        window.addEventListener('touchstart', (e) => {
            this.timeTouch = new Date().valueOf();
            if (this.timerEvent == undefined) {
                this.timerEvent = setTimeout(() => {
                    let key = 'KeyA'
                    if (e.touches[0].clientX > window.innerWidth / 2) {
                        key = 'KeyD'
                    }
                    this.codeReaction(key, true)
                }, 100)
            }
        })

        window.addEventListener('touchend', (e) => {
            this.timeTouch = new Date().valueOf() - this.timeTouch;
            if (this.timeTouch <= 100) {
                clearTimeout(this.timerEvent);
                this.timerEvent = undefined;
                this.codeReaction('Space', true)
                setTimeout(() => this.codeReaction('Space', false), 50)
            } else {
                if (this.d || this.a) {
                    let key = 'KeyA'
                    if (e.touches[0].clientX > window.innerWidth / 2) {
                        key = 'KeyD'
                    }
                    this.codeReaction(key, false)
                }
            }
        })


        document.addEventListener('keydown', e => this.codeReaction(e.code, true))
        document.addEventListener('keyup', e => this.codeReaction(e.code, false))
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
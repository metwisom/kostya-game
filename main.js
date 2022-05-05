var display;
var scene;

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function recalcSceneSize() {
    let display_params = display.getBoundingClientRect();
    display.width = display_params.width;
    display.height = display_params.height;
}

document.addEventListener('DOMContentLoaded', () => {
    display = document.getElementById('display');
    scene = display.getContext('2d');
    recalcSceneSize();
    draw();
})

window.addEventListener('resize', () => {
    recalcSceneSize();
})

let objects = []

let fon = []

fon[1] = new Image();
fon[1].src = 'plx-1.png';

fon[2] = new Image();
fon[2].src = 'plx-2.png';

fon[3] = new Image();
fon[3].src = 'plx-3.png';

fon[4] = new Image();
fon[4].src = 'plx-4.png';

fon[5] = new Image();
fon[5].src = 'plx-5.png';

function draw() {
    scene.fillStyle = '#f00'
    scene.fillRect(0, 0, display.width, display.height);




    for(let i = 1;i < 6;i++){
        let fone = fon[i]
        let coef = display.height / fone.height
        let pass = (game_camera.attached.x * (i/10)) % (fone.width * coef )
        scene.drawImage(fone,0,0,fone.width,fone.height,-pass- (fone.width * coef),0,fone.width * coef,display.height)
        scene.drawImage(fone,0,0,fone.width,fone.height,-pass,0,fone.width * coef,display.height)
        scene.drawImage(fone,0,0,fone.width,fone.height,-pass + (fone.width * coef),0,fone.width * coef,display.height)
        scene.drawImage(fone,0,0,fone.width,fone.height,-pass + (fone.width * coef)*2,0,fone.width * coef,display.height)
    }



    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        object.draw(scene)
    }


    requestAnimationFrame(draw)
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function gravity() {
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (object.mass == 0) {
            continue;
        }
        if (object.e_down < 0) {
            object.y += object.e_down
            object.e_down += object.mass
        }
        let new_y = object.y + object.e_down
        let inter = objects.filter(e => {
            if (e == object) {
                return;
            }
            return intersectRect(
                { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height },
                { left: object.x, top: new_y, right: object.x + object.width, bottom: new_y + object.height },
            )

        })
        if (inter.length == 0) {
            object.y += object.e_down

            object.state = 'fall';
            object.e_down += object.mass
        } else {
            object.state = 'landing';
            object.e_down = 0
            object.may_ground = true;
        }

    }

    requestAnimationFrame(gravity)
}
requestAnimationFrame(gravity)

function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}

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
        if (this.slave.may_ground) {
            this.slave.state = 'idle'
            this.slave.inertion = 0
        } else {
            let new_x = this.slave.x + this.slave.inertion * delta
            let inter = objects.filter(e => {
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
            let inter = objects.filter(e => {
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
            let inter = objects.filter(e => {
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

const keyboard_controller = new Keyboard();

class Camera {
    attach(obj) {
        this.attached = obj
    }
}
let game_camera = new Camera()

class DrawObject {
    constructor() {
        objects.push(this)
    }
    draw(scene) {
        let sprite = this.sprites[this.state];
        scene.fillStyle = '#000'
        scene.imageSmoothingEnabled = false
            ;

        let coef = this.height / sprite.image.height;

        let sizeW = sprite.image.width * coef / sprite.max
        let sizeH = this.height

        scene.translate(display.width / 2, display.height / 2);
        if (this.faced == 0) {
            scene.scale(-1, 1);
        }
        let x = this.x - game_camera.attached.x - sizeW / 2
        let y = this.y - game_camera.attached.y
        scene.drawImage(
            sprite.image,

            sprite.image.width / (sprite.max) * Math.floor(sprite.cur),
            0,

            sprite.image.width / (sprite.max),
            sprite.image.height,

            x,
            y,

            sprite.image.width * coef / (sprite.max),
            this.height
        );
        if (this instanceof Character)
        //scene.fillRect(x,y,this.width,this.height)
        this.width = sprite.image.width * coef / (sprite.max);
        scene.resetTransform()
        sprite.update()
        //scene.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
    }
}

class Sprite {
    constructor(max, src, speed) {
        this.cur = 0;
        this.speed = speed
        this.max = max;
        this.image = new Image();
        this.image.src = src;
    }
    update() {
        this.cur += this.speed
        if (this.cur > this.max) {
            this.cur = 0;
        }
    }
}

class Structure extends DrawObject {
    constructor(x, y) {
        super()
        this.faced = 1;
        this.state = 'idle';
        this.sprites = {
            'idle': new Sprite(1, 'block.png', 0)
        }
        this.x = x;
        this.y = y
        this.mass = 0;
        this.height = 100;
        this.width = 100;
    }
}

for (let i = 0; i < 100; i++)
    new Structure(50 + i * 250, 300)


class Character extends DrawObject {
    constructor(x, y) {
        super()
        this.faced = 1;
        this.state = 'idle';
        this.sprites = {
            'idle': new Sprite(12, 'idle.png', 0.2),
            'run': new Sprite(8, 'run.png', 0.2),
            'jump': new Sprite(1, 'jump.png', 0),
            'fall': new Sprite(2, 'fall.png', 0.1),
            'landing': new Sprite(1, 'landing.png', 0),
        }
        this.x = x;
        this.y = y
        this.height = 165;
        this.width = 100;
        this.speed = 0.25
        this.mass = .5;
        this.e_down = 0;
        this.may_ground = false;
        this.inertion = 0;
    }
    setController(controller) {
        controller.slave = this;
    }
}

let Kostya = new Character(100, 100);
Kostya.setController(keyboard_controller)
game_camera.attach(Kostya);

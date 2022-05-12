import requestAnimationFrame from "../../utils/requestAnimationFrame";
import intersectRect from "../../utils/intersectRect";
import Keyboard from "./Keyboard";

class _Physics {

    constructor() {
        this.objects = [];
        this.last_time = new Date().valueOf()
    }

    addObject(obj) {
        this.objects.push(obj)
    }

    start() {

        const { objects } = this;

        const calc = () => {
            Keyboard.update();
            let delta = new Date().valueOf() - this.last_time;
            objects.map(object => {
                if (object.mass == 0) {
                    return;
                }
                object.e_down += object.mass

                let new_y = 0, new_x = 0, hit_box = undefined, inter = true;

                new_y = object.y + object.e_down;
                new_x = object.x;
                hit_box = { left: new_x, top: new_y, right: new_x + object.width, bottom: new_y + object.height }
                inter = this.checkCollision(hit_box, object.id)
                if (inter.length == 0) {
                    object.y += object.e_down
                    object.state = 'fall';
                } else {
                    object.y = inter[0].top - object.height
                    object.e_down = 0
                    object.may_ground = true;
                    object.state = 'idle';
                }

                new_y = object.y
                new_x = object.x + object.inertion * delta;
                hit_box = { left: new_x, top: new_y, right: new_x + object.width, bottom: new_y + object.height }
                inter = this.checkCollision(hit_box, object.id)

                if (inter.length == 0) {
                    object.state = 'run';
                    object.x += object.inertion * delta;
                    if (object.may_ground) {
                        object.inertion -= (object.inertion * 0.7);
                    }
                } else {
                    object.inertion = 0
                }

                if (Math.abs(object.inertion) < 0.001) {
                    object.inertion = 0;
                }

                if (object.inertion == 0) {
                    if (object.state != 'fall') {
                        object.state = 'idle';
                    }
                }

            })

            requestAnimationFrame(() => calc())
            this.last_time = new Date().valueOf()
        }

        calc();
    }

    checkCollision(hit_box, ignore = '') {
        let inter = this.objects.map(e => {
            if (e.id == ignore) {
                return undefined;
            }
            if (intersectRect({ left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }, hit_box,)) {
                return { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }
            } else {
                return undefined
            }
        }).filter(e => e)
        return inter;
    }

}

const Physics = new _Physics()

export default Physics;
import requestAnimationFrame from "../../utils/requestAnimationFrame";
import intersectRect from "../../utils/intersectRect";

class _Physics {

    constructor() {
        this.objects = [];
    }

    addObject(obj) {
        this.objects.push(obj)
    }

    start() {

        const { objects } = this;

        const calc = () => {
            objects.map(object => {
                if (object.mass == 0) {
                    return;
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
            })

            requestAnimationFrame(() => calc())
        }

        calc();
    }

}

const Physics = new _Physics()

export default Physics;
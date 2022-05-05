import requestAnimationFrame from "./utils/requestAnimationFrame";
import intersectRect from "./utils/intersectRect";

function gravity(objects) {
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

    requestAnimationFrame(() => gravity(objects))
}


export default gravity;
import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {intersectRect} from "../../utils/intersectRect";
import {StatableItem} from "../StatableItem";
import {BoxArea} from "../Box/Box";
import {D2Updatable} from "../D2Updatable";
import {InputController} from "./Input/InputController";


const Physics = (function () {

    const removeList: D2Updatable[] = [];
    let objects: D2Updatable[] = [];

    const removeObject = (obj: StatableItem) => {
        if (objects.includes(obj)) {
            objects.splice(objects.indexOf(obj), 1);
        }
    }

    const cleanUp = () => {
        removeList.map(removeObject)
        removeList.length = 0;
    }
    const toRemove = (obj: D2Updatable) => {
        removeList.push(obj);
    };

    return Object.freeze({
        get obj() {
            return objects;
        },
        addObject(obj: D2Updatable) {
            objects.push(obj);
        },

        start() {
            const calc = () => {
                InputController.update();
                const delta = new Date().valueOf() - this;
                objects.map(object => {
                    if (!object.isActual()) {
                        return toRemove(object);
                    }
                    object.update(delta);
                });

                requestAnimationFrame(calc.bind(new Date().valueOf()));
                cleanUp();
            };

            calc.call(new Date().valueOf());
        },
        checkCollision(hitBox: BoxArea, ignore = "") {
            return objects.filter(e => {
                if (e.id !== ignore && e.physBox.hasCollision) {
                    const testBox = e.physBox.shift(0, 0);
                    return intersectRect(testBox, hitBox);
                }
            });
        }
    })


})();

export {Physics};

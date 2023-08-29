import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {intersectRect} from "../../utils/intersectRect";
import {Entity} from "../Entity";
import {GameKeyboard} from "./GameKeyboard";
import {BoxArea} from "../Box";


class _Physics {

  private removeList: Entity[] = [];
  private objects: Entity[] = [];
  private lastTime: number = new Date().valueOf();

  public get obj() {
    return this.objects;
  }

  addObject(obj: Entity) {
    this.objects.push(obj);
  }

  toRemove(obj: Entity) {
    this.removeList.push(obj);
  }

  cleanUp() {
    this.removeList.map(this.removeObject.bind(this));
    this.removeList = [];
  }

  removeObject(obj: Entity) {
    if (this.objects.includes(obj)) {
      this.objects.splice(this.objects.indexOf(obj), 1);
    }
  }

  start() {
    const {objects} = this;

    const calc = () => {
      GameKeyboard.update();
      const delta = new Date().valueOf() - this.lastTime;
      objects.map(object => {
        if (!object.isActual()) {
          return this.toRemove(object);
        }
        object.update(delta);
      });
      requestAnimationFrame(calc);
      this.lastTime = new Date().valueOf();
      this.cleanUp();
    };

    calc();
  }

  checkCollision(hitBox: BoxArea, ignore = "") {
    return this.objects.map(e => {
      if (e.id === ignore || !e.hasCollision) {
        return undefined;
      }
      const testBox = e.physBox.get(e.x, e.y);
      if (intersectRect(testBox, hitBox,)) {
        return testBox;
      } else {
        return undefined;
      }
    }).filter(e => e);
  }

}

const Physics = new _Physics();

export {Physics};

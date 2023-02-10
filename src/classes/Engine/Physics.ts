import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {intersectRect} from "../../utils/intersectRect";
import {Entity} from "../Entity";
import {GameKeyboard} from "./GameKeyboard";


class _Physics {

  private removeList: Entity[] = [];
  private objects: Entity[] = [];
  private lastTime: number = new Date().valueOf();

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
          return this.toRemove.apply(this, object);
        }
        object.update(delta);
      });
      requestAnimationFrame(calc);
      this.lastTime = new Date().valueOf();
      this.cleanUp();
    };

    calc();
  }

  checkCollision(hitBox: Record<string, number>, ignore = "") {
    return this.objects.map(e => {
      if (e.id === ignore || !e.hasCollision) {
        return undefined;
      }
      if (intersectRect({left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height}, hitBox,)) {
        return {left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height};
      } else {
        return undefined;
      }
    }).filter(e => e);
  }

}

const Physics = new _Physics();

export {Physics};

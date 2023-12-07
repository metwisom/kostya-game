import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {intersectRect} from "../../utils/intersectRect";
import {Statable} from "../Statable";
import {BoxArea} from "../Box/Box";
import {D2Updatable} from "../D2Updatable";
import {InputController} from "./Input/InputController";


class _Physics {

  private removeList: D2Updatable[] = [];
  private objects: D2Updatable[] = [];
  private lastTime: number = new Date().valueOf();

  public get obj() {
    return this.objects;
  }

  addObject(obj: D2Updatable) {
    this.objects.push(obj);
  }

  toRemove(obj: D2Updatable) {
    this.removeList.push(obj);
  }

  cleanUp() {
    this.removeList.map(this.removeObject.bind(this));
    this.removeList = [];
  }

  removeObject(obj: Statable) {
    if (this.objects.includes(obj)) {
      this.objects.splice(this.objects.indexOf(obj), 1);
    }
  }

  start() {
    const {objects} = this;

    const calc = () => {
      InputController.update();
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
      if (e.id === ignore || !e.physBox.hasCollision) {
        return undefined;
      }
      const testBox = e.physBox.shift(0, 0);
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

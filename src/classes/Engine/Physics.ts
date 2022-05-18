import requestAnimationFrame from "../../utils/requestAnimationFrame";
import intersectRect from "../../utils/intersectRect";
import GameObject from "../GameObject";
import GameKeyboard from "./GameKeyboard";

// tslint:disable-next-line: class-name
class _Physics {

  objects: GameObject[] = [];
  lastTime: number = new Date().valueOf();

  addObject(obj: GameObject) {
    this.objects.push(obj);
  }

  removeObject(obj: GameObject) {
    if (this.objects.includes(obj)) {
      this.objects.splice(this.objects.indexOf(obj), 1);
    }
  }

  start() {

    const { objects } = this;

    const calc = () => {
      GameKeyboard.update();
      const delta = new Date().valueOf() - this.lastTime;
      objects.map(object => {

        object.eDown += object.mass;

        let newY = 0;
        let newX = 0;
        let hitBox;
        let inter = [];

        newY = object.y + object.eDown;
        newX = object.x;
        hitBox = { left: newX, top: newY, right: newX + object.width, bottom: newY + object.height };
        inter = this.checkCollision(hitBox, object.id);
        if (inter.length === 0) {
          object.y += object.eDown;
          object.state = "fall";
        } else {
          object.y = inter[0].top - object.height;
          object.eDown = 0;
          object.hasGround = true;
          object.state = "idle";
        }

        newY = object.y;
        newX = object.x + object.inertion * delta;
        hitBox = { left: newX, top: newY, right: newX + object.width, bottom: newY + object.height };
        inter = this.checkCollision(hitBox, object.id);

        if (inter.length === 0) {
          object.state = "run";
          object.x += object.inertion * delta;
          if (object.hasGround) {
            object.inertion -= (object.inertion * 0.7);
          }
        } else {
          object.inertion = 0;
        }

        if (Math.abs(object.inertion) < 0.001) {
          object.inertion = 0;
        }

        if (object.inertion === 0) {
          if (object.state !== "fall") {
            object.state = "idle";
          }
        }

      });

      requestAnimationFrame(calc);
      this.lastTime = new Date().valueOf();
    };

    calc();
  }

  checkCollision(hitBox: Record<string, number>, ignore = "") {
    const inter = this.objects.map(e => {
      if (e.id === ignore || !e.hasCollision) {
        return undefined;
      }
      if (intersectRect({ left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }, hitBox,)) {
        return { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height };
      } else {
        return undefined;
      }
    }).filter(e => e);

    return inter;
  }

}

const Physics = new _Physics();

export default Physics;

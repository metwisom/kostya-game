import requestAnimationFrame from "../../utils/requestAnimationFrame";
import intersectRect from "../../utils/intersectRect";
import GameObject from "../GameObject";
import GameKeyboard from "./GameKeyboard";
import Character from "../content/Character";

class _Physics {

  private objects: GameObject[] = [];
  private lastTime: number = new Date().valueOf();

  addObject(obj: GameObject) {
    this.objects.push(obj);
  }

  // removeObject(obj: GameObject) {
  //   if (this.objects.includes(obj)) {
  //     this.objects.splice(this.objects.indexOf(obj), 1);
  //   }
  // }

  start() {
    const {objects} = this;

    const calc = () => {
      GameKeyboard.update();
      const delta = new Date().valueOf() - this.lastTime;
      objects.filter(e => e.mass > 0 || e.eDown != 0 || e.momentum != 0).map(object => {

        object.eDown += object.mass;

        let newY: number;
        let newX: number;
        let hitBox;
        let inter: { left: number, top: number, right: number, bottom: number }[];

        newY = object.y + object.eDown;
        newX = object.x;
        hitBox = {left: newX, top: newY, right: newX + object.width, bottom: newY + object.height};
        inter = this.checkCollision(hitBox, object.id);
        if (inter.length === 0) {
          object.y += object.eDown;
          object.hasGround = false;
          object.state = "fall";
        } else {
          object.y = inter[0].top - object.height;
          object.eDown = 0;
          object.hasGround = true;
          object.state = "idle";
        }

        newY = object.y;
        newX = object.x + object.momentum * delta;
        hitBox = {left: newX, top: newY, right: newX + object.width, bottom: newY + object.height};
        inter = this.checkCollision(hitBox, object.id);

        if (inter.length === 0) {
          //object.state = "run";
          object.x += object.momentum * delta;
          if (object.hasGround) {
            object.momentum -= (object.momentum * 0.7);
          }
        } else {
          if (object.hasGround) {
            object.momentum = 0;
          }else{
            object.momentum -= (object.momentum * 0.7);
          }
        }

        if(object.y > 300 && object instanceof Character){
          object.x = 0;
          object.y = 0;
        }

        if (Math.abs(object.momentum) < 0.001) {
          object.momentum = 0;
        }

        if (object.eDown < 0) {
          if (!object.hasGround) {
            object.state = "jump";
          }
        } else {
          if (!object.hasGround) {
            object.state = "fall";
          }
        }

        if (object.momentum === 0) {
          if (object.hasGround) {
            object.state = "idle";
          }
        } else {
          if (object.hasGround) {
            object.state = "run";
          }
        }



      });


      requestAnimationFrame(calc);
      this.lastTime = new Date().valueOf();
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

export default Physics;

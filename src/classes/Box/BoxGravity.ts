import {Physics} from "../Engine/Physics";
import {D2Updatable} from "../D2Updatable";
import {StatableItem} from "../StatableItem";
import {BoxCollision} from "./BoxCollision";


class BoxGravity extends BoxCollision {
  hasGround = false;
  momentum = 0;
  public eDown = 1;

  protected readonly maintainer: D2Updatable & StatableItem;

  constructor(x: number, y: number, width: number, height: number, maintainer: D2Updatable) {
    super(x, y, width, height, maintainer);
  }

  update(delta: number = 1) {
    if (this.eDown != 0 || this.momentum != 0) {

      let inter: D2Updatable[] = [];

      // console.log(this.momentum)
      // console.log(delta)

      const xCollision = this.shift(this.momentum * delta, 0);
      if (this.hasCollision) {
        inter = Physics.checkCollision(xCollision, this.maintainer.id);
      }

      if (this.momentum && Math.abs(this.momentum) < 0.001) {
        this.momentum = 0;
      }
      if (inter.length === 0) {
        this.maintainer.x += this.momentum * delta;
      }
      if (this.hasGround) {
        if (inter.length === 0) {
          this.momentum -= (this.momentum * 0.5);
        } else {
          this.momentum = 0;
        }
      }

      this.eDown += 0.3;
      const yCollision = this.shift(0, this.eDown);
      inter = [];
      if (this.hasCollision) {
        inter = Physics.checkCollision(yCollision, this.maintainer.id);
      }
      if (inter.length === 0) {
        this.maintainer.y += this.eDown;
        this.hasGround = false;
      } else {
        if (this.maintainer.y != inter[0].y) {
          this.maintainer.y = inter[0].y;
          this.hasGround = true;
        }
        this.eDown = 0;
      }

      if (this.hasGround) {
        if (this.momentum != 0) {

          this.maintainer.state = "run";
          if (this.momentum > 0) {
            this.maintainer.faced = "right";
          } else {
            if (this.momentum < 0) {
              this.maintainer.faced = "left";
            }
          }
        } else {
          this.maintainer.state = "idle";
        }

      } else {
        if (this.eDown > 0) {
          this.maintainer.state = "jump";
        } else {
          if (this.eDown < 0) {
            this.maintainer.state = "fall";
          }
        }
      }


    }
  }


}

export {BoxGravity};
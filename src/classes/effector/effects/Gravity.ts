import {D2Updatable, D2UpdatableComponent} from "../../Engine/D2Updatable";
import {ItemWithStates, ItemWithStatesComponent} from "../../Engine/ItemWithStates";
import {Engine} from "../../Engine/Engine";
import {IEffect} from "../IEffect";


interface Gravitational {
  hasGround: boolean;
  eDown: number;
}

const Gravity = function (maintainer: ItemWithStatesComponent & Gravitational) {
  const _maintainer = maintainer;
  const obj: IEffect = {
    update(delta: number = 1) {
      const {physBox, id} = this._maintainer;
      let inter: D2UpdatableComponent[] = [];

      this._maintainer.eDown += 0.1;
      const yCollision = physBox.prop(0, this._maintainer.eDown * delta);

      if (physBox.hasCollision) {
        inter = Engine.checkCollision(yCollision, id);
      }

      if (inter.length === 0) {
        this._maintainer.y += this._maintainer.eDown * delta;
        this._maintainer.hasGround = false;
      } else {
        const {y} = inter[0];
        if (this._maintainer.y !== y) {
          this._maintainer.y = y;
          this._maintainer.hasGround = true;
        }
        this._maintainer.eDown = 0;
      }

      if (this._maintainer.eDown > 0) {
        this._maintainer.state = "jump";
      } else {
        if (this._maintainer.eDown < 0) {
          this._maintainer.state = "fall";
        } else {
          if (this._maintainer.state === "jump" || this._maintainer.state === "fall") {
            this._maintainer.state = "idle";
          }
        }
      }
    }
  };
  return obj;
};

export {Gravity, Gravitational};

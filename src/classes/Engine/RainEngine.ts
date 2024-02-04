import {Rain} from "../content/Rain";
import {Camera} from "./Camera";
import {Engine} from "./Engine";


const RainEngine = (function () {

  let couple: Rain[] = [];

  let is_active: boolean = false;
  const create = () => {
    if (Camera && Camera.target != undefined && is_active) {

      const rain = new Rain(Camera.y + 1000);
      couple.push(rain)
      Engine.addObject(rain);
      Engine.addObjectPhys(rain);

      if(couple.length < 100){
        setTimeout(() => {
          create()
        },10)
      }
    }
  };

  return Object.freeze({
    get couple() {
      return couple
    },
    start() {
      is_active = true;
      create();
    },
    stop() {
      couple.map(i => i.destroy())
      couple = []
      is_active = false;
    },
    toggle() {
      is_active = !is_active;
      if (!is_active) {
        this.stop()
      }else {
        create();
      }
    }
  });
})();

export {RainEngine};
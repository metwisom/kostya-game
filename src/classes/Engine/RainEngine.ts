import {Rain} from "../content/Rain";
import {Camera} from "./Camera";
import {Display} from "./Display";
import {Physics} from "./Physics";


const RainEngine = (function () {

  let couple: Rain[] = [];

  let is_active: boolean = false;
  const create = () => {
    if (Camera && Camera.target != undefined && is_active) {
      for (let i = 0; i < 250; i++) {
        let rain = new Rain(Camera.y + 1000);
        couple.push(rain)
        Display.addObject(rain);
        Physics.addObject(rain);
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
        stop()
      }
      create();
    }
  });
})();

export {RainEngine};
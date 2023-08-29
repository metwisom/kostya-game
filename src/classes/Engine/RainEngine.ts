import {Rain} from "../content/Rain";
import {Display} from "./Display";
import {Physics} from "./Physics";
import {getRandom} from "../../utils/getRandom";
import {Camera} from "./Camera";


class RainEngine {
  is_active: boolean = true;


  constructor() {

  }

  start() {
    this.is_active = true;
    this.create();
  }

  create() {
    if(Camera.target != undefined) {
      let rain = new Rain(getRandom(Camera.x - Display.width / 2, Camera.x + Display.width / 2), Camera.y - Display.height / 2);
      Physics.addObject(rain)
      Display.addObject(rain)
    }
    if (this.is_active) {
      setTimeout(this.create.bind(this), 10);
    }
  }
}



export {RainEngine};
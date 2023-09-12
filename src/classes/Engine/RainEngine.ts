import {Rain} from "../content/Rain";
import {Display} from "./Display";
import {getRandom} from "../../utils/getRandom";
import {Camera} from "./Camera";


class _RainEngine {
  is_active: boolean = true;


  constructor() {

  }

  start() {
    this.is_active = true;
  }

  create() {
    if (Camera.target != undefined && this.is_active) {
      return  new Rain(getRandom(Camera.x - Display.width / 2, Camera.x + Display.width / 2), Camera.y - Display.height / 2);
    }
    return undefined
  }
}

const RainEngine = new _RainEngine();


export {RainEngine};
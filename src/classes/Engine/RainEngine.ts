import {Rain} from "../content/Rain";
import {getRandom} from "../../utils/getRandom";


class _RainEngine {
  is_active: boolean = false;

  _camera: any;

  constructor() {
  }

  setCamera(camera: any) {
    this._camera = camera;
  }

  start() {
    this.is_active = true;
    this.create();
  }
  stop() {
    this.is_active = false;
  }
  toggle() {
    this.is_active = !this.is_active;
    this.create();
  }

  create() {
    if (this._camera && this._camera.target != undefined && this.is_active) {
      new Rain(getRandom(this._camera.x - 1000, this._camera.x + 1000), this._camera.y - 1000, this._camera.y + 1000);
    }
    if (this.is_active) {
      setTimeout(this.create.bind(this), 1);
    }
  }
}

const RainEngine = new _RainEngine();


export {RainEngine};
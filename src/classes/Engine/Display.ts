import {Layer} from "./Layer";
import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {Entity} from "../Entity";
import {DisplayAddons} from "./DisplayAddons";
import {Camera} from "./Camera";


class MainDisplay {

  private removeList: Entity[] = [];
  private layers: Layer[] = [];
  readonly addons: DisplayAddons = new DisplayAddons();
  private display: HTMLCanvasElement;
  private scene: CanvasRenderingContext2D;

  get height() {
    return this.display.height;
  }

  set height(value: number) {
    this.display.height = value;
  }

  get width() {
    return this.display.width;
  }

  set width(value: number) {
    this.display.width = value;
  }

  get canvas() {
    return this.display;
  }

  attach(id: string) {
    this.display = document.getElementById(id) as HTMLCanvasElement;
    this.recalculateSceneSize();
  }

  recalculateSceneSize() {
    const {width, height} = Display.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.scene = this.display.getContext("2d");
    this.scene.imageSmoothingEnabled = false;
    this.scene.fillStyle = "#000";
  }

  addObject(obj: Entity, layer: number) {
    const {layers} = this;
    if (typeof layers[layer] === "undefined") {
      layers[layer] = new Layer();
    }
    layers[layer].addObject(obj);
  }

  toRemove(obj: Entity) {
    this.removeList.push(obj);
  }

  cleanUp() {
    this.removeList.map(this.removeObject.bind(this));
    this.removeList = [];
  }

  removeObject(obj: Entity) {
    for (const layerId in this.layers) {
      this.layers[layerId].removeObject(obj);
    }
  }

  start() {

    const {scene, layers, addons} = this;

    scene.imageSmoothingEnabled = false;
    scene.fillStyle = "#000";

    const draw = () => {
      scene.translate(Display.width / 2, Display.height / 2);
      scene.translate(-Camera.x - Camera.target.view.x + Camera.target.view.width , -Camera.y - Camera.target.view.y + Camera.target.view.height);
      layers.map(layer => layer.items.map(item => {
        if (!item.isActual()) {
          return this.toRemove(item);
        }
        item.draw(scene);
      }));
      scene.resetTransform();
      addons.postWork(scene);
      requestAnimationFrame(draw);
      this.cleanUp();
    };

    draw();
  }
}

const Display = new MainDisplay();

export {Display};

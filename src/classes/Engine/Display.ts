import {Layer} from "./Layer";
import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {Entity} from "../Entity";
import {DisplayAddons} from "./DisplayAddons";
import {Camera} from "./Camera";
import Element from "./Gui/Element";


class MainDisplay {

  private removeList: Entity[] = [];
  private _layers: Layer[] = [];
  private _gui: Element[] = [];
  readonly addons: DisplayAddons = new DisplayAddons();
  private display: HTMLCanvasElement;
  private scene: CanvasRenderingContext2D;

  public debug = {
    showBoxes: false
  }

  public get layers(): Layer[] {
    return this._layers;
  }

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

  attach(canvas: HTMLCanvasElement) {
    this.display = canvas;
    this.recalculateSceneSize();
    window.removeEventListener("resize", Display.recalculateSceneSize.bind(this));
    window.addEventListener("resize", Display.recalculateSceneSize.bind(this));
  }

  recalculateSceneSize() {
    const {width, height} = Display.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.scene = this.display.getContext("2d");
    this.scene.imageSmoothingEnabled = false;
    this.scene.fillStyle = "#000";
  }

  addObject(obj: Entity | Element, layer: number = 0) {
    if (obj instanceof Entity) {
      const {_layers} = this;
      if (typeof _layers[layer] === "undefined") {
        _layers[layer] = new Layer();
      }
      _layers[layer].addObject(obj);
    }else{
      this._gui.push(obj)
    }
  }


  toRemove(obj: Entity) {
    this.removeList.push(obj);
  }

  cleanUp() {
    this.removeList.map(this.removeObject.bind(this));
    this.removeList = [];
  }

  removeObject(obj: Entity) {
    for (const layerId in this._layers) {
      this._layers[layerId].removeObject(obj);
    }
  }

  start() {

    const {cleanUp,scene, _layers:Layers,_gui:Gui, addons} = this;

    scene.imageSmoothingEnabled = false;
    scene.fillStyle = "#000";

    const draw = () => {
      scene.globalAlpha = 1;
      scene.translate(Display.width / 2, Display.height / 2);

      scene.scale(
        1 / (Camera.target.physBox.scale == 1 ? Camera.target.physBox.curScale :
            (Camera.target.physBox.curScale * 3 < 1 ? Camera.target.physBox.curScale * 3 : 1)
        ),
        1 / (Camera.target.physBox.scale == 1 ? Camera.target.physBox.curScale :
          (Camera.target.physBox.curScale * 3 < 1 ? Camera.target.physBox.curScale * 3 : 1))
      )

      scene.translate(-Camera.x - Camera.target.viewBox.x + Camera.target.viewBox.width / 2, -Camera.y + Camera.target.viewBox.y - Camera.target.viewBox.height / 2);


      Layers.map(layer => layer.items.map(item => {

        if (!item.isActual()) {
          return this.toRemove(item);
        }
        item.draw(scene);
      }));
      scene.resetTransform();


      Gui.map(element => {
        element.Draw(scene)
      })


      addons.run(scene);
      requestAnimationFrame(draw);
      cleanUp.apply(this,[]);
    };

    draw();
  }
}

const Display = new MainDisplay();

export {Display};

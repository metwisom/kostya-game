import {Layer} from "./Layer";
import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {Statable} from "../Statable";
import {DisplayAddons} from "./DisplayAddons";
import {Camera} from "./Camera";
import {D2Drawable} from "../D2Drawable";
import Element from "./Gui/Element";


class MainDisplay {

  private removeList: D2Drawable[] = [];
  private _layers: Layer[] = [];
  private _gui: D2Drawable[] = [];
  readonly addons: DisplayAddons = new DisplayAddons();
  private display: HTMLCanvasElement;
  private scene: CanvasRenderingContext2D;

  public debug = {
    showBoxes: false
  };

  public get layers(): Layer[] {
    return this._layers;
  }

  get canvas() {
    return this.display;
  }

  attach(canvas: HTMLCanvasElement) {
    this.display = canvas;
    this.recalculateSceneSize();
    window.removeEventListener("resize", this.recalculateSceneSize.bind(this));
    window.addEventListener("resize", this.recalculateSceneSize.bind(this));
  }

  recalculateSceneSize() {
    const {width, height} = this.canvas.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
    this.scene = this.display.getContext("2d");
    this.scene.imageSmoothingEnabled = false;
    this.scene.fillStyle = "#000";
  }

  addObject(obj: D2Drawable, layer: number = 0) {
    if (obj instanceof Element) {
      this._gui.push(obj);
    } else {
      const {_layers} = this;
      if (typeof _layers[layer] === "undefined") {
        _layers[layer] = new Layer();
      }
      _layers[layer].addObject(obj);
    }
  }


  toRemove(obj: D2Drawable) {
    this.removeList.push(obj);
  }

  cleanUp() {
    this.removeList.map(this.removeObject.bind(this));
    this.removeList = [];
  }

  removeObject(obj: Statable) {
    for (const layerId in this._layers) {
      this._layers[layerId].removeObject(obj);
    }
  }

  start() {

    const {cleanUp, scene, _layers: Layers, _gui: Gui, addons} = this;

    scene.imageSmoothingEnabled = false;
    scene.fillStyle = "#000";

    const draw = () => {
      scene.globalAlpha = 1;
      scene.translate(
        Display.canvas.width / 2 - Camera.x,
        Display.canvas.height / 2 - Camera.y + Camera.target.viewBox.height / 2);

      this.drawCollection([].concat(...Layers.map(layer => layer.items).filter(i => i)));

      scene.resetTransform();

      this.drawCollection(Gui);


      addons.run(scene);
      requestAnimationFrame(draw);
      cleanUp.apply(this, []);
    };

    draw();
  }

  private drawCollection(collection: D2Drawable[]) {
    collection.map(item => {
      if (!item.isActual()) {
        return this.toRemove(item);
      }
      const viewBox = item.draw();

      // if(item instanceof Parallax) {
      //
      //   console.log(0, 0,
      //
      //     viewBox.x,
      //     viewBox.y,
      //     viewBox.width,
      //     viewBox.height)
      // }


      this.scene.drawImage(viewBox.texture.get(),
        0, 0,
        viewBox.texture.get().width,
        viewBox.texture.get().height,
        viewBox.x,
        viewBox.y,
        viewBox.width,
        viewBox.height);

    });

  }
}

const Display = new MainDisplay();

export {Display};

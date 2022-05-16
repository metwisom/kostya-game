import Layer from "./Layer";
import requestAnimationFrame from "../../utils/requestAnimationFrame";
import recalcSceneSize from "../../utils/recalcSceneSize";
import GameObject from "../GameObject";
import DisplayAddons from "./DisplayAddons";

class _Display {

  layers: Layer[] = [];
  addons: DisplayAddons = new DisplayAddons();;
  display: HTMLCanvasElement;
  scene: CanvasRenderingContext2D;

  get height() {
    return this.display.height;
  }

  get width() {
    return this.display.width;
  }

  attach(id: string) {
    this.display = <HTMLCanvasElement>document.getElementById(id);
    recalcSceneSize(this);
    this.scene = this.display.getContext('2d');
  }

  addObject(obj: GameObject, layer: number) {
    if (this.layers[layer] == undefined) {
      this.layers[layer] = new Layer()
    }
    this.layers[layer].addObject(obj);
  }

  startDrawing() {

    const { scene, display, layers, addons } = this;

    const draw = () => {
      scene.fillStyle = '#f00'
      scene.fillRect(0, 0, display.width, display.height);

      layers.map(layer => {
        layer.objects.map(object => object.draw(scene))
      })

      addons.postWork(scene);

      requestAnimationFrame(() => draw())

    }

    draw()
  }
}

const Display = new _Display()

export default Display;


export { _Display };
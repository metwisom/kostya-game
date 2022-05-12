import Layer from "./Layer";
import requestAnimationFrame from "../../utils/requestAnimationFrame";
import recalcSceneSize from "../../utils/recalcSceneSize";
import DisplayAddons from "./DisplayAddons";

class _Display {

  constructor() {
    this.layers = [];
    this.addons = new DisplayAddons();
  }

  get height() {
    return this.display.height;
  }

  attach(id) {
    this.display = document.getElementById(id);
    recalcSceneSize(this);
    this.scene = this.createScene();
  }

  createScene() {
    return this.display.getContext('2d');
  }

  addObject(obj, layer) {
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
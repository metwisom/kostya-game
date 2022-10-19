import Layer from "./Layer";
import requestAnimationFrame from "../../utils/requestAnimationFrame";
import GameObject from "../GameObject";
import DisplayAddons from "./DisplayAddons";
import Camera from "./Camera";

class _Display {

  private parallax: Layer = new Layer();
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
    this.recalcSceneSize();
  }

  recalcSceneSize()  {
    const { width, height } = Display.canvas.getBoundingClientRect();
    Display.width = width;
    Display.height = height;
    this.scene = this.display.getContext("2d");
    this.scene.imageSmoothingEnabled = false;
    this.scene.fillStyle = "#000";
  }

  addParallax(obj: GameObject) {
    const { parallax } = this;
    parallax.addObject(obj);
  }

  addObject(obj: GameObject, layer: number) {
    const { layers } = this;
    if (typeof layers[layer] === "undefined") {
      layers[layer] = new Layer();
    }
    layers[layer].addObject(obj);
  }

  startDrawing() {

    const { scene, parallax, layers, addons } = this;

    scene.imageSmoothingEnabled = false;
    scene.fillStyle = "#000";

    const draw = () => {
      parallax.objects.map(object => object.draw(scene));

      scene.translate(Display.width / 2, Display.height / 2);
      scene.translate(-Camera.x, -Camera.y);

      layers.map(layer => {
        layer.objects.map(object => object.draw(scene));
      });

      scene.resetTransform();

      addons.postWork(scene);

      requestAnimationFrame(draw);

    };

    draw();
  }
}

const Display = new _Display();

export default Display;

export { _Display };

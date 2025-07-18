import {Layer} from './Layer';
import {requestAnimationFrame} from '../../../utils/requestAnimationFrame';
import {DisplayAddons, DisplayAddonsComponent} from '../DisplayAddons';
import {Camera} from '../Camera';
import {D2DrawableComponent} from '../D2Drawable';
import {Graphic, GraphicComponent} from './Graphic2';
import {D2UpdatableComponent} from '../D2Updatable';
import {InputController} from '../Input/InputController';
import {ItemWithStatesComponent} from '../ItemWithStates';
import {BoxArea} from '../Box/Box';
import {intersectRect} from '../../../utils/intersectRect';
import {Layers, LayersComponent} from "./Layers";
import {PerfTest} from "../../../utils/perfTest";

type EngineComponent = {
  layers: LayersComponent
  removeListU: D2UpdatableComponent[]
  objects: D2UpdatableComponent[]
  removeList: D2DrawableComponent[]
  gui: D2DrawableComponent[]
  graphic: GraphicComponent
  addons: DisplayAddonsComponent
  getDisplay(): HTMLCanvasElement
  cleanUp(): void
  clearGui(): void
  addObject(obj: D2DrawableComponent, layer?: number): void
  attach(canvas: HTMLCanvasElement): void
  addObjectPhys(obj: D2UpdatableComponent): void
  start(): void
  drawCollection(collection: D2DrawableComponent[], delta: number): void
  removeObject(obj: ItemWithStatesComponent): void
  toRemove(obj: D2UpdatableComponent): void
}

const Engine = (function () {

  const obj: EngineComponent = {
    layers: Layers,
    removeListU: [],
    objects: [],
    removeList: [],
    gui: [],
    graphic: undefined,
    addons: DisplayAddons(),
    getDisplay() {
      return this.graphic.display;
    },
    cleanUp() {
      obj.removeList.map(item => obj.layers.each(layer => layer.removeObject(item)));
      this.removeList.length = 0;

      this.removeListU.map(this.removeObject);
      this.removeListU.length = 0;
    },
    clearGui() {
      obj.gui.map(i => i.destroy());
      this.gui.length = 0;
    },
    addObject(obj: D2DrawableComponent, layer: number = 0) {
      if (obj.type == 'Button') {
        this.gui.push(obj);
      } else {
        this.layers.addObject(obj,layer);
      }
    },
    attach(canvas: HTMLCanvasElement) {
      this.graphic = Graphic(canvas);
    },
    addObjectPhys(obj: D2UpdatableComponent) {
      this.objects.push(obj);
    },
    start() {
      const drawWorld = (delta: number) => {
        this.graphic.centerTo(Camera.x, Camera.y + Camera.target.viewBox.height / 2);
        obj.layers.each(({items}) => this.drawCollection(items, delta));
      };

      const drawGui = (delta: number) => {
        this.graphic.resetTransform();
        this.drawCollection(this.gui, delta);
        this.addons.run(this.graphic);
      };
      const draw = (time: number) => {
        PerfTest.start()

        InputController.update();
        const delta = performance.now() - time;
        obj.objects.map(object => {
          if (!object.isActual()) {
            return this.toRemove(object);
          }
          object.update(Math.min(delta, 100));
        });

        drawWorld(delta);
        drawGui(delta);
        requestAnimationFrame(draw.bind(undefined, [performance.now()]));
        this.cleanUp();

        PerfTest.stop();
      };
      requestAnimationFrame(draw);
    },
    drawCollection(collection: D2DrawableComponent[], delta: number) {
      collection.map(item => {
        if (!item.isActual()) {
          return this.removeList.push(item);
        }
        const viewBox = item.draw();
        this.graphic.drawImage(viewBox.texture.get(delta),
          0, 0,
          viewBox.texture.get(delta).width,
          viewBox.texture.get(delta).height,
          viewBox.x,
          viewBox.y,
          viewBox.width,
          viewBox.height);
      });
    },
    removeObject(object: ItemWithStatesComponent) {
      if (obj.objects.includes(object)) {
        obj.objects.splice(obj.objects.indexOf(object), 1);
      }
    },
    toRemove(obj: D2UpdatableComponent) {
      this.removeListU.push(obj);
    },
  };
  return obj;

})();


export {Engine, EngineComponent};

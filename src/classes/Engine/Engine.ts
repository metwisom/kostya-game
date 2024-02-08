import {Layer} from './Layer';
import {requestAnimationFrame} from '../../utils/requestAnimationFrame';
import {DisplayAddons} from './DisplayAddons';
import {Camera} from './Camera';
import {D2Drawable} from './D2Drawable';
import Element from './Gui/Element';
import {Graphic} from './Graphic';
import {D2Updatable} from './D2Updatable';
import {InputController} from './Input/InputController';
import {ItemWithStates} from './ItemWithStates';
import {BoxArea} from './Box/Box';
import {intersectRect} from '../../utils/intersectRect';


class _Engine {


  private removeListU: D2Updatable[] = [];
  private objects: D2Updatable[] = [];

  private removeList: D2Drawable[] = [];
  private _layers: Layer[] = [];
  private gui: D2Drawable[] = [];
  private _addons: DisplayAddons = new DisplayAddons();
  private graphic: Graphic = undefined;
  public drawTime = 0;

  private drawCollection(collection: D2Drawable[]) {
    collection.map(item => {
      if (!item.isActual()) {
        return this.removeList.push(item);
      }
      const viewBox = item.draw();
      this.graphic.drawImage(viewBox.texture.get(),
        0, 0,
        viewBox.texture.get().width,
        viewBox.texture.get().height,
        viewBox.x,
        viewBox.y,
        viewBox.width,
        viewBox.height);
    });
  }


  private removeObject = (obj: ItemWithStates) => {
    if (this.objects.includes(obj)) {
      this.objects.splice(this.objects.indexOf(obj), 1);
    }
  };

  private toRemove = (obj: D2Updatable) => {
    this.removeListU.push(obj);
  };

  public cleanUp() {
    this.removeList.map(item => this._layers.map(layer => layer.removeObject(item)));
    this.removeList.length = 0;

    this.removeListU.map(this.removeObject);
    this.removeListU.length = 0;
  };

  public checkCollision<T = D2Updatable>(hitBox: BoxArea, ignore = '', onlyType?: new (...args: any[]) => T): T[] {
    return this.objects.filter(e => {
      const typeExact = onlyType != undefined ? e instanceof onlyType : true;
      if (e.id !== ignore && e.physBox.hasCollision && typeExact) {
        const testBox = e.physBox.prop();
        return intersectRect(testBox, hitBox);
      }
    }) as T[];
  }

  public get layers() {
    return this._layers;
  }

  public clearLayers() {
    this._layers.map(i => i.items.map(i => i.destroy()));
  }

  public get addons() {
    return this._addons;
  }

  public get display() {
    return this.graphic.display;
  }

  public addObject(obj: D2Drawable, layer: number = 0) {
    if (obj instanceof Element) {
      this.gui.push(obj);
    } else {
      if (this.layers[layer] === undefined) {
        this.layers[layer] = new Layer();
      }
      this.layers[layer].addObject(obj);
    }
  }

  public attach(canvas: HTMLCanvasElement) {
    this.graphic = new Graphic(canvas);
  }


  get obj() {
    return this.objects;
  }

  public addObjectPhys(obj: D2Updatable) {
    this.objects.push(obj);
  }

  public start() {
    const drawWorld = () => {
      this.graphic.centerTo(Camera.x, Camera.y + Camera.target.viewBox.height / 2);
      this.layers.map(({items}) => this.drawCollection(items));
    };


    const drawGui = () => {
      this.graphic.resetTransform();
      this.drawCollection(this.gui);
      this._addons.run(this.graphic);
    };
    const draw = (time: number) => {
      const startDraw = performance.now();

      InputController.update();
      const delta = performance.now() - time;
      this.objects.map(object => {
        if (!object.isActual()) {
          return this.toRemove(object);
        }
        object.update(Math.min(delta, 100));
      });


      drawWorld();
      drawGui();
      requestAnimationFrame(draw.bind(undefined, [performance.now()]));
      this.cleanUp();
      this.drawTime = performance.now() - startDraw;
    };
    requestAnimationFrame(draw);
  }
}

const Engine = new _Engine();

export {Engine};

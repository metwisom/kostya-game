import {Layer, LayerComponent} from "./Layer";
import {D2DrawableComponent} from "../D2Drawable";


type LayersComponent = {
  layer: LayerComponent[];
  each(cb: (layer: LayerComponent) => void): void;
  clear(): void;
  addLayer(layer: LayerComponent): void;
  removeLayer(layer: LayerComponent): void;
  addObject(obj: D2DrawableComponent, layer: number): void;
};

const Layers = (function () {
  let layers: LayerComponent[] = [];
  const obj: LayersComponent = {

    each(cb: (layer: LayerComponent) => void) {
      layers.forEach((layer) => cb(layer));
    },

    clear() {
      layers.forEach((layer) =>
        layer.items.forEach((item) => item.destroy())
      );
      layers = [];
    },
    get layer() {
      return layers;
    },
    addObject(obj: D2DrawableComponent, layer: number = 0) {
      if (layers[layer] === undefined) {
        layers[layer] = Layer();
      }
      layers[layer].addObject(obj);
    },

    addLayer(layer: LayerComponent) {
      layers.push(layer);
    },

    removeLayer(layer: LayerComponent) {
      const index = layers.indexOf(layer);
      if (index !== -1) {
        layers.splice(index, 1);
      }
    },
  };

  return Object.freeze(obj) as Readonly<LayersComponent>;
})();

export {LayersComponent, Layers};
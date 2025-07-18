import {D2DrawableComponent} from "../D2Drawable";


type LayerComponent = {
  readonly items: ReadonlyArray<D2DrawableComponent>;
  addObject(obj: D2DrawableComponent): void;
  removeObject(obj: D2DrawableComponent): boolean;
};

const Layer = () => {
  const items: D2DrawableComponent[] = [];

  const obj: LayerComponent = {
    get items() {
      return items as ReadonlyArray<D2DrawableComponent>;
    },
    addObject: function (obj: D2DrawableComponent): void {
      items.push(obj);
    },
    removeObject: function (obj: D2DrawableComponent): boolean {
      const index = items.indexOf(obj);
      if (index !== -1) {
        items.splice(index, 1);
        return true;
      }
      return false;
    },
  };

  return Object.freeze(obj);
};

export {Layer, LayerComponent};
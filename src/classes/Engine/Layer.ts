import {D2DrawableComponent} from './D2Drawable';

type LayerComponent = {
  items: D2DrawableComponent[];
  addObject(obj: D2DrawableComponent): void;
  removeObject(obj: D2DrawableComponent): boolean;
};

const Layer = () => {
  const obj: LayerComponent = {
    items: [],
    addObject(obj: D2DrawableComponent): void {
      this.items.push(obj);
    },
    removeObject(obj: D2DrawableComponent): boolean {
      const index = this.items.indexOf(obj);
      if (index !== -1) {
        this.items.splice(index, 1);
        return true;
      }
      return false;
    },
  };
  return obj as Readonly<LayerComponent>;
};

export {Layer, LayerComponent};

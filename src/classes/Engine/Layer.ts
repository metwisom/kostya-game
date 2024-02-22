import {D2DrawableComponent} from './D2Drawable';

class Layer {
  items: D2DrawableComponent[] = [];

  addObject(obj: D2DrawableComponent): void {
    this.items.push(obj);
  }

  removeObject(obj: D2DrawableComponent): boolean {
    const index = this.items.indexOf(obj);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

export {Layer};

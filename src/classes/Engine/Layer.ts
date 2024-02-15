import {D2Drawable} from './D2Drawable';

class Layer {
  items: D2Drawable[] = [];

  addObject(obj: D2Drawable): void {
    this.items.push(obj);
  }

  removeObject(obj: D2Drawable): boolean {
    const index = this.items.indexOf(obj);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

export {Layer};

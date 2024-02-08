import {D2Drawable} from './D2Drawable';

class Layer {

  items: D2Drawable[] = [];

  addObject(obj: D2Drawable) {
    this.items.push(obj);
  }

  removeObject(obj: D2Drawable) {
    if (this.items.includes(obj)) {
      this.items.splice(this.items.indexOf(obj), 1);
      return true;
    }
  }
}

export {Layer};

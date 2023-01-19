import {Entity} from "../Entity";

class Layer {

  items: Entity[] = [];

  get objects() {
    return this.items;
  }

  addObject(obj: Entity) {
    this.items.push(obj);
  }

  removeObject(obj: Entity) {
    if (this.items.includes(obj)) {
      this.items.splice(this.items.indexOf(obj), 1);
    }
  }
}

export {Layer};

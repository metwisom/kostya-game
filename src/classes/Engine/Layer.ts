import GameObject from "../GameObject";

class Layer {

  items: GameObject[] = [];

  get objects() {
    return this.items;
  }

  addObject(obj: GameObject) {
    this.items.push(obj);
  }
}

export default Layer;

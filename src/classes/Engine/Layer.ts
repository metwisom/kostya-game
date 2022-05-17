import GameObject from "../GameObject";

class Layer {

  objects: GameObject[] = [];

  addObject(obj: GameObject) {
    this.objects.push(obj)
  }
}

export default Layer
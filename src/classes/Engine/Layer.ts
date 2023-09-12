import {Entity} from "../Entity";
import GameElement from "../GameElement";

class Layer {

  items: GameElement[] = [];

  addObject(obj: GameElement) {
    this.items.push(obj);
  }

  removeObject(obj: GameElement) {
    if (this.items.includes(obj)) {
      this.items.splice(this.items.indexOf(obj), 1);
    }
  }
}

export {Layer};

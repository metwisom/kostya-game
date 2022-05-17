import GameObject from "./GameObject";
import Sprite from "./Sprite";

class Structure extends GameObject {

  constructor(x: number, y: number) {

    super();

    this.faced = 1;
    this.sprites = {
      'idle': new Sprite(1, 'block.png', 0)
    }
    this.x = x;
    this.y = y
    this.height = 100;
    this.width = 100;
  }
}

export default Structure;
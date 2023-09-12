import {Entity} from "../Entity";
import {getRandomFloat} from "../../utils/getRandom";
import {Display} from "../Engine/Display";
import {Physics} from "../Engine/Physics";
import {Box} from "../Box";


class Rain extends Entity {

  windAngle = getRandomFloat(Math.PI, Math.PI * 2);
  maxDepth: number;

  hasCollision = false

  constructor(x: number, y: number, maxDepth: number) {

    super();
    this.hasCollision = false;

    this._physBox = new Box(4, 8, 2, 8);

    this.speed = 0.5;
    this.x = x;
    this.y = y;
    Display.addObject(this);
    Physics.addObject(this)

  }

  draw(scene: CanvasRenderingContext2D) {
    for (let size = 4; size > 0; size -= 1) {
      scene.fillRect(this.x - size / 2, this.y + size * 2, size, size);
    }
    this.x += Math.cos(this.windAngle);
  }

  update(delta: number) {
    this.y += this.speed * delta;
    // this.y += Math.sin(this.angle) * this.speed * delta;
    if (this.y > this.maxDepth) {
      this.destroy();
    }
  }

}

export {Rain};

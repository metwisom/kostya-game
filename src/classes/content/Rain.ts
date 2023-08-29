import {Entity} from "../Entity";
import {Camera} from "../Engine/Camera";
import {Display} from "../Engine/Display";
import {Box} from "../Box";
import {getRandom, getRandomFloat} from "../../utils/getRandom";


class Rain extends Entity {


  windAngle = getRandomFloat(Math.PI, Math.PI * 2);

  constructor(x: number, y: number) {

    super();

    this.hasCollision = true;

    this._physBox = new Box(4, 8, 2, 8);

    this.speed = 0.5;
    this.x = x;
    this.y = y;
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
    if (this.y > Camera.y + Display.height / 2) {
      this.destroy();
    }
  }


}

export {Rain};

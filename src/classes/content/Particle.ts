import {Entity} from "../Entity";


class Particle extends Entity {

  angle: number;
  size: number;

  constructor(x: number, y: number) {

    super();

    this.hasCollision = false;

    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.1;
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 2;
  }

  draw(scene: CanvasRenderingContext2D) {
    //console.log("draw part");
    scene.fillRect(this.x, this.y, this.size, this.size);
  }

  update(delta:number) {
    this.x += Math.cos(this.angle) * this.speed * delta;
    this.y += Math.sin(this.angle) * this.speed * delta;
    this.size *= 0.99;
    if (this.size < 3) {
      this.destroy();
    }
    // console.log("update part");
  }


}

export {Particle};

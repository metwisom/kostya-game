import {Entity} from "../Entity";


class Particle extends Entity {
  angle: number;
  size: number;
  startSize: number;

  constructor(x: number, y: number) {

    super();

    this.hasCollision = false;

    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.05;
    this.x = x;
    this.y = y;
    this.size = this.startSize = Math.random() * 2 + 2;
  }

  draw(scene: CanvasRenderingContext2D) {
    scene.globalAlpha = 1 - 1 / (this.startSize);
    scene.fillRect(this.x, this.y, this.size, this.size);
    scene.globalAlpha = 1;
  }

  update(delta:number) {
    this.x += Math.cos(this.angle) * this.speed * delta;
    this.y += Math.sin(this.angle) * this.speed * delta;
    this.size *= 0.95;
    if (this.size < 1) {
      this.destroy();
    }
  }


}

export {Particle};

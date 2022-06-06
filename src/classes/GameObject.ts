import Camera from "./Engine/Camera";
import Sprites from "./Sprites";

class GameObject {

  readonly id: string;
  state: keyof Sprites = "idle";
  sprites: Sprites;
  height: number;
  width: number;
  x: number;
  y: number;
  faced: number;
  hasGround = true;
  speed = 0;
  inertion = 0;
  eDown = 0;
  mass = 0;
  hasCollision = true;

  constructor() {
    this.id = Math.random().toString(16).slice(2);
  }

  draw(scene: CanvasRenderingContext2D) {
    const { faced } = this;
    const sprite = this.sprites[this.state];
    const image = sprite.image[faced];
    const coef = this.height / image.height;

    const sizeW = image.width * coef / sprite.max;

    const x = this.x - sizeW / 2;
    const y = this.y - Camera.target.height / 2;

    scene.drawImage(
      image,

      image.width / (sprite.max) * Math.floor(sprite.cur),
      0,

      image.width / (sprite.max),
      image.height,

      x,
      y,

      image.width * coef / (sprite.max),
      this.height
    );

    sprite.update();
  }
}

export default GameObject;

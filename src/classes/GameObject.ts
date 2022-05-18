import Camera from "./Engine/Camera";
import Sprite from "./Sprite";

class GameObject {

  id: string;
  state: string = "idle";
  sprites: Record<string, Sprite>;
  height: number;
  width: number;
  x: number;
  y: number;
  faced: number;
  hasGround: boolean = true;
  speed: number = 0;
  inertion: number = 0;
  eDown: number = 0;
  mass: number = 0;
  hasCollision: boolean = true;

  constructor() {
    this.id = Math.random().toString(16).slice(2);
  }

  draw(scene: CanvasRenderingContext2D) {
    const { faced } = this;
    const sprite = this.sprites[this.state];
    const image = sprite.image[faced];
    const coef = this.height / image.height;

    const sizeW = image.width * coef / sprite.max;
    const sizeH = this.height;

    const x = this.x - sizeW / 2;
    const y = this.y - Camera.attached.height / 2;

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

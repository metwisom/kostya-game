import Camera from "./Engine/Camera";
import Sprite from "./Sprite";

class GameObject {

  id: string;
  state: string;
  sprites: Record<string, Sprite>;
  height: number;
  width: number;
  x: number;
  y: number;
  faced: number;
  may_ground: boolean;
  speed: number;
  inertion: number;
  e_down: number;
  mass: number

  constructor() {
    this.id = Math.random().toString(16).slice(2);
  }

  draw(scene: CanvasRenderingContext2D) {
    let sprite = this.sprites[this.state];
    let coef = this.height / sprite.image[this.faced].height;

    let sizeW = sprite.image[this.faced].width * coef / sprite.max
    let sizeH = this.height

    let x = this.x - sizeW / 2
    let y = this.y - Camera.attached.height / 2

    scene.drawImage(
      sprite.image[this.faced],

      sprite.image[this.faced].width / (sprite.max) * Math.floor(sprite.cur),
      0,

      sprite.image[this.faced].width / (sprite.max),
      sprite.image[this.faced].height,

      x,
      y,

      sprite.image[this.faced].width * coef / (sprite.max),
      this.height
    );
    sprite.update()
  }
}

export default GameObject;
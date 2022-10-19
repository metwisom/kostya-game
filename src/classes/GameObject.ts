import Sprites from "./Sprites";
import Camera from "./Engine/Camera";
import {Direction} from "./Sprite";

class GameObject {

  readonly id: string;
  state: keyof Sprites = "idle";
  sprites: Sprites;
  height: number;
  width: number;
  x: number;
  y: number;
  faced: keyof Direction<CanvasRenderingContext2D>;
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
    const {faced, state} = this;
    const sprite = this.sprites[state];
    const image = sprite.image[faced];
    const proportion = this.height / image.height;

    const frameWidth = image.width / (sprite.framesCount);
    const frameHeight = image.height;

    const resultFrameWidth = image.width * proportion / sprite.framesCount;
    const resultFrameHeight = image.height * proportion;

    const x = this.x - resultFrameWidth / 2;
    // Сдвигаем весь мир на половину высоты нашего объекта в фокусе камеры, что бы он был точно в центре
    const y = this.y - Camera.target.height / 2;

    let imagePos = 0;

    if (sprite.framesCount > 1) {
      imagePos = image.width / (sprite.framesCount) * Math.floor(sprite.framesCount - sprite.cur);
      if (faced === "left") {
        imagePos = image.width / (sprite.framesCount) * Math.floor(sprite.cur);
      }
    }

    scene.drawImage(
      image, imagePos, 0,
      frameWidth, frameHeight,
      x, y,
      resultFrameWidth, resultFrameHeight
    );

    sprite.update();
  }


  refreshSprite() {
    return;
  }
}

export default GameObject;

import {Sprites} from "./Sprites";
import {Camera} from "./Engine/Camera";
import {Direction} from "./Sprite";
import {Physics} from "./Engine/Physics";
import {Box} from "./Box";

class Entity {

  private isDestroyed = false;

  readonly id: string;
  state: keyof Sprites = "idle";
  sprites: Sprites;
  phys: Box;
  view: Box;
  x: number;
  y: number;
  faced: keyof Direction<CanvasRenderingContext2D>;
  hasGround = true;
  speed = 0;
  momentum = 0;
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
    const proportion = this.view.height / image.height;

    const frameWidth = image.width / (sprite.framesCount);
    const frameHeight = image.height;

    const resultFrameWidth = image.width * proportion / sprite.framesCount;
    const resultFrameHeight = image.height * proportion;

    const x = this.x;
    // Сдвигаем весь мир на половину высоты нашего объекта в фокусе камеры, что бы он был точно в центре
    const y = this.y ;

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

    scene.fillRect( x, y,
      resultFrameWidth, resultFrameHeight)

    sprite.update();

  }

  isActual(){
    return !this.isDestroyed;
  }

  update(delta: number) {
    if (this.mass > 0 || this.eDown != 0 || this.momentum != 0) {
      this.eDown += this.mass;

      let newY: number;
      let newX: number;
      let hitBox;
      let inter: { left: number, top: number, right: number, bottom: number }[];

      hitBox = this.phys.get(this.x,this.y + this.eDown);
      inter = Physics.checkCollision(hitBox, this.id);
      if (inter.length === 0) {
        this.y += this.eDown;
        this.hasGround = false;
        this.state = "fall";
      } else {
        this.y = inter[0].top - 1;
        this.eDown = 0;
        this.hasGround = true;
        this.state = "idle";
      }

      hitBox = this.phys.get(this.x + this.momentum * delta,this.y) ;
      inter = Physics.checkCollision(hitBox, this.id);

      if (Math.abs(this.momentum) < 0.001) {
        this.momentum = 0;
      }
      if (inter.length === 0) {
        this.x += this.momentum * delta;
      }
      if (this.hasGround) {
        if (inter.length === 0) {
          this.momentum -= (this.momentum * 0.7);
        } else {
          this.momentum = 0;
        }
        this.state = this.momentum === 0 ? "idle" : "run";
      } else {
        this.state = this.eDown < 0 ? "jump" : "fall";
      }

    }
  }

  destroy() {
    this.isDestroyed = true;
  }

  refreshSprite() {
    return;
  }
}

export {Entity};

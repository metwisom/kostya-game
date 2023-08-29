import {Sprites} from "./Sprites";
import {Direction} from "./Sprite";
import {Physics} from "./Engine/Physics";
import {Box} from "./Box";
import {Display} from "./Engine/Display";
import {Character} from "./content/Character";


class Entity {

  private isDestroyed = false;

  readonly id: string;
  state: keyof Sprites = "idle";
  sprites: Sprites;
  _physBox: Box;
  _viewBox: Box;
  x: number;
  y: number;
  faced: keyof Direction<CanvasRenderingContext2D>;
  hasGround = true;
  speed = 0;
  momentum = 0;
  eDown = 0;
  private _mass = 0;
  hasCollision = true;

  public set mass(value:number){
    this._mass = value
  }

  public  get mass(){
    return this._mass * this.physBox.curScale
  }

  public get physBox() {
    return this._physBox;
  }

  public set physBox(box: Box) {
    this._physBox = box;
  }

  public get viewBox() {
    return this._viewBox != undefined ? this._viewBox : this._physBox;
  }

  public set viewBox(box: Box) {
    this._viewBox = box;
  }

  constructor() {
    this.id = Math.random().toString(16).slice(2);
  }

  draw(scene: CanvasRenderingContext2D) {
    const {faced, state} = this;
    const sprite = this.sprites[state];
    const image = sprite.image[faced];

    const frameWidth = image.width / (sprite.framesCount);
    const frameHeight = image.height;


    let imagePos = 0;

    if (sprite.framesCount > 1) {
      imagePos = image.width / (sprite.framesCount) * Math.floor(sprite.framesCount - sprite.cur);
      if (faced === "left") {
        imagePos = image.width / (sprite.framesCount) * Math.floor(sprite.cur);
      }
    }

    const x = this.x - this.physBox.x;
    // Сдвигаем весь мир на половину высоты нашего объекта в фокусе камеры, что бы он был точно в центре
    const y = this.y - this.physBox.y;




    scene.drawImage(
      image, imagePos, 0,
      frameWidth, frameHeight,
      x, y,
      this.physBox.width, this.physBox.height
    );

    if (Display.debug.showBoxes) {
      scene.strokeStyle = "red";
      scene.strokeRect(this.x - this.physBox.x, this.y - this.physBox.y,
        this.physBox.width, this.physBox.height);
      scene.strokeStyle = "green";
      scene.strokeRect(this.x - this.viewBox.x, this.y - this.viewBox.y,
        this.viewBox.width, this.viewBox.height);
    }


    sprite.update();

  }

  isActual() {
    return !this.isDestroyed;
  }

  update(delta: number) {
    if (this.mass > 0 || this.eDown != 0 || this.momentum != 0) {
      this.eDown += this.mass;

      let hitBox;
      let inter: { left: number, top: number, right: number, bottom: number }[];

      hitBox = this.physBox.get(this.x, this.y + this.eDown);
      inter = Physics.checkCollision(hitBox, this.id);
      if (inter.length === 0) {
        this.y += this.eDown;
        this.hasGround = false;
        this.state = "fall";
      } else {
        this.y = inter[0].top;
        this.eDown = 0;
        this.hasGround = true;
        this.state = "idle";
      }

      hitBox = this.physBox.get(this.x + this.momentum * delta, this.y);
      inter = Physics.checkCollision(hitBox, this.id);

      if (this.momentum && Math.abs(this.momentum) < 0.001) {
        this.momentum = 0;
      }
      if (inter.length === 0) {
        this.x += this.momentum * delta * this.physBox.curScale;
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

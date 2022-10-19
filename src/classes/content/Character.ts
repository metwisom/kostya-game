import GameObject from "../GameObject";
import Sprite from "../Sprite";

class Character extends GameObject {

  constructor(x: number, y: number) {

    super();

    this.faced = "right";
    this.sprites = {
      "idle": new Sprite("idle.png"),
      "run": new Sprite("run.png"),
      "jump": new Sprite("jump.png"),
      "levitate": new Sprite("levitate.png"),
      "fall": new Sprite("fall.png"),
      "landing": new Sprite("landing.png"),
    };
    this.x = x;
    this.y = y;
    this.height = 165;
    this.width = 100;
    this.speed = 0.25;
    this.mass = .5;
    this.hasGround = false;
    this.hasCollision = false;
  }
}

export default Character;

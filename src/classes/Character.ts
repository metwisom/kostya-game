import GameObject from "./GameObject";
import Sprite from "./Sprite";

class Character extends GameObject {

  constructor(x: number, y: number) {

    super();

    this.faced = 1;
    this.sprites = {
      "idle": new Sprite(12, "idle.png", 0.30),
      "run": new Sprite(8, "run.png", 0.2),
      "jump": new Sprite(1, "jump.png", 0),
      "fall": new Sprite(2, "fall.png", 0.1),
      "landing": new Sprite(1, "landing.png", 0),
    };
    this.x = x;
    this.y = y;
    this.height = 165;
    this.width = 100;
    this.speed = 0.25;
    this.mass = .5;
    this.hasGround = false;
  }
}

export default Character;

import {Entity} from "../Entity";
import {Sprite} from "../Sprite";
import {Particle} from "./Particle";
import {Display} from "../Engine/Display";
import {Physics} from "../Engine/Physics";


class Character extends Entity {

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

  draw(scene: CanvasRenderingContext2D) {
    super.draw(scene);
    if (this.momentum != 0 && audio.paused) {
      audio.play().then();
    }
    if (this.momentum == 0 && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  update(delta: number) {
    super.update(delta);

    if(this.momentum != 0 && this.hasGround) {
      for(let i =0;i < 3;i++) {
        const part = new Particle(this.x + this.momentum + Math.random() * 30 - 15, this.y + this.height / 2 + Math.random() * 3 - 1.5);
        Display.addObject(part, 2);
        Physics.addObject(part);
      }
    }

    if (this.y > 300 && this instanceof Character) {
      this.x = 0;
      this.y = 0;
    }
  }
}

const audio = new Audio("/resources/step.wav");
audio.playbackRate = 1.8;
audio.loop = true;

export {Character};

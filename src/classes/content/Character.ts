import {Entity} from "../Entity";
import {Sprite} from "../Sprite";
import {Particle} from "./Particle";
import {Display} from "../Engine/Display";
import {Physics} from "../Engine/Physics";
import {Box} from "../Box";


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
    this.physBox = new Box(40,82,20,82)
    this.viewBox = new Box(50,82,25,82)
    this.speed = 0.25;
    this.mass = .5;
    this.hasCollision = false;
  }

  draw(scene: CanvasRenderingContext2D) {
    super.draw(scene);
  }

  update(delta: number) {
    super.update(delta);

    this.createStepParticle()

    if (this.y > 300 && this instanceof Character) {
      this.x = 0;
      this.y = 0;
    }

    if (this.momentum != 0 && audio.paused) {
      audio.play().then();
    }
    if (this.momentum == 0 && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  private createStepParticle(){
    if (this.momentum != 0 && this.hasGround) {
      for (let i = 0; i < 1; i++) {
        const part = new Particle(this.x + this.momentum + Math.random() * 30 - 15, this.y + Math.random() * 3 - 1.5,this.physBox.curScale);
        Display.addObject(part, 2);
        Physics.addObject(part);
      }
    }
  }

}

const audio = new Audio("/resources/audio/step.wav");
audio.playbackRate = 1.8;
audio.loop = true;

export {Character};

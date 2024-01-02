import {StatableItem} from "../StatableItem";
import {BoxTextured} from "../Box/BoxTextured";
import {TextureCollection} from "../Texture/TextureCollection";
import {Texture} from "../Texture/Texture";
import {BoxGravity} from "../Box/BoxGravity";
import {Eventful} from "../Engine/interfaces/Eventful";
import {GameKeys} from "../Engine/Input/InputKey";
import {InputMap} from "../Engine/Input/InputController";
import {Display} from "../Engine/Display";
import {Physics} from "../Engine/Physics";
import {Particle} from "./Particle";


class Character extends StatableItem implements Eventful {

  protected _physBox: BoxGravity;

  public get physBox(): typeof this._physBox {
    return this._physBox;
  }


  protected audio = new Audio("/resources/audio/step.wav");



  constructor(x: number, y: number) {
    super();

    this.audio.playbackRate = 1.8;
    this.audio.loop = true;

    this.x = x;
    this.y = y;
    this._physBox = new BoxGravity(20, 82, 40, 82, this);
    this.viewBox = new BoxTextured(25, 82, 50, 82, this);

    const textures = new TextureCollection();
    textures.addState("left_idle", new Texture("left_idle.png"));
    textures.addState("right_idle", new Texture("right_idle.png"));
    textures.addState("left_run", new Texture("left_run.png"));
    textures.addState("right_run", new Texture("right_run.png"));
    textures.addState("left_jump", new Texture("left_jump.png"));
    textures.addState("right_jump", new Texture("right_jump.png"));
    textures.addState("left_levitate", new Texture("left_levitate.png"));
    textures.addState("right_levitate", new Texture("right_levitate.png"));
    textures.addState("left_fall", new Texture("left_fall.png"));
    textures.addState("right_fall", new Texture("right_fall.png"));
    textures.addState("left_landing", new Texture("left_landing.png"));
    textures.addState("right_landing", new Texture("right_landing.png"));
    this.viewBox.setTexture(textures);
    this.state = "idle";
  }

  draw() {
    return super.draw();
  }

  public Event(keyMap: InputMap) {
    if (keyMap[GameKeys.A].status()) {
      if (this.physBox.hasGround) {
        this.physBox.momentum = -0.15;
      }
    }
    if (keyMap[GameKeys.D].status()) {
      if (this.physBox.hasGround) {
        this.physBox.momentum = 0.15;
      }
    }
    if (keyMap[GameKeys.Space].status()) {
      if (this.physBox.hasGround) {
        this.physBox.eDown = -8;
        this.physBox.momentum = this.physBox.momentum * 2;
      }
    }
  }

  public set state(state: string) {
    this._state = this.faced + "_" + state;
    this.viewBox.setState(this._state);
  }

  update(delta: number) {
    super.update(delta);

    this.createStepParticle();

    if (this.y > 300 && this instanceof Character) {
      this.x = 0;
      this.y = 0;
    }

    if (this.physBox.momentum != 0 && this.audio.paused) {
        this.audio.play().then();
        console.log(1)
    }
    if (this.physBox.momentum == 0 && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  private createStepParticle() {
    if (this.physBox.momentum != 0 && this.physBox.hasGround) {
      // console.log('test')
        for (let i = 0; i < 1; i++) {
            const part = new Particle(this.x + this.physBox.momentum + Math.random() * 30 - 15, this.y + Math.random() * 3 - 1.5, 1);
            Display.addObject(part, 2);
            Physics.addObject(part);
        }
    }
  }

}

export {Character};

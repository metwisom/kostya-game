import {ItemWithStates} from '../Engine/ItemWithStates';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {TextureCollection} from '../Engine/Texture/TextureCollection';
import {Texture} from '../Engine/Texture/Texture';
import {Eventful, SomeEvent} from '../Engine/interfaces/Eventful';
import {GameKeys} from '../Engine/Input/InputKey';
import {Engine} from '../Engine/Engine';
import {Particle} from './Particle';
import {Box} from '../Engine/Box/Box';
import {Gravitational, Gravity} from '../effector/effects/Gravity';
import {Inertia, Inertial} from '../effector/effects/Inertia';

class Character extends ItemWithStates implements Eventful, Gravitational, Inertial {

  public hasGround = false;
  public eDown = 0;
  public momentum = 0;

  protected _physBox: Box;

  public get physBox(): typeof this._physBox {
    return this._physBox;
  }

  protected audio = new Audio('/resources/audio/step.wav');

  constructor(x: number, y: number) {
    super();
    this.audio.playbackRate = 1.8;
    this.audio.loop = true;

    this.effector.addEffect(new Gravity(this));
    this.effector.addEffect(new Inertia(this));

    this.x = x;
    this.y = y;
    this._physBox = new Box(20, 82, 40, 82, this);
    this._physBox.hasCollision = true;
    this.viewBox = new BoxTextured(25, 82, 50, 82, this);

    const textures = new TextureCollection();
    textures.addState('left_idle', new Texture('left_idle.png'));
    textures.addState('right_idle', new Texture('right_idle.png'));
    textures.addState('left_run', new Texture('left_run.png'));
    textures.addState('right_run', new Texture('right_run.png'));
    textures.addState('left_jump', new Texture('left_jump.png'));
    textures.addState('right_jump', new Texture('right_jump.png'));
    textures.addState('left_levitate', new Texture('left_levitate.png'));
    textures.addState('right_levitate', new Texture('right_levitate.png'));
    textures.addState('left_fall', new Texture('left_fall.png'));
    textures.addState('right_fall', new Texture('right_fall.png'));
    textures.addState('left_landing', new Texture('left_landing.png'));
    textures.addState('right_landing', new Texture('right_landing.png'));
    this.viewBox.texture = textures;
    this.state = 'idle';
  }

  public Event(event: SomeEvent) {
    if(event.keyMap == undefined){
      return;
    }
    if (event.keyMap[GameKeys.A].status()) {
      if (this.hasGround) {
        this.momentum = -0.55;
      }
    }
    if (event.keyMap[GameKeys.D].status()) {
      if (this.hasGround) {
        this.momentum = 0.55;
      }
    }
    if (event.keyMap[GameKeys.Space].status()) {
      if (this.hasGround) {
        this.eDown = -1;
      }
    }
  }

  public set state(state: string) {
    this._state = this.faced + '_' + state;
    this.viewBox.state = this._state;
  }

  update(delta: number) {
    super.update(delta);

    this.createStepParticle();

    if (this.y > 300) {
      this.x = 0;
      this.y = 0;
    }

    if (this.momentum != 0 && this.audio.paused) {
      this.audio.play().then();
    }
    if (this.momentum == 0 && !this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  private createStepParticle() {
    if (this.momentum != 0 && this.hasGround) {
      for (let i = 0; i < 1; i++) {
        const part = new Particle(this.x + this.momentum + Math.random() * 30 - 15, this.y + Math.random() * 3 - 1.5, 1);
        Engine.addObject(part, 2);
        Engine.addObjectPhys(part);
      }
    }
  }

  public destroy() {
    super.destroy();
    this.audio.pause();
  }

}

export {Character};

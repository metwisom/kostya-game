import {ItemWithStates, ItemWithStatesComponent} from "../Engine/ItemWithStates";
import {BoxTextured} from "../Engine/Box/BoxTextured";
import {TextureCollection} from "../Engine/Texture/TextureCollection";
import {Texture} from "../Engine/Texture/Texture";
import {Eventful, SomeEvent} from "../Engine/interfaces/Eventful";
import {GameKeys} from "../Engine/Input/InputKey";
import {Engine} from "../Engine/Engine";
import {Box, BoxComponent} from "../Engine/Box/Box";
import {Gravitational, Gravity} from "../effector/effects/Gravity";
import {Inertia, Inertial} from "../effector/effects/Inertia";
import {ParticleFabric} from "./ParticleFabric";
import {ResourceLoader, SoundResource} from "../Engine/ResourceLoader/ResourceLoader";


type CharacterComponent = ItemWithStatesComponent & {
  createStepParticle(): void
} & Eventful & Gravitational & Inertial

const Character = function (x: number, y: number) {
  const audio = ResourceLoader.get<SoundResource>("step.wav").content;
  audio.playbackRate = 1.8;
  audio.loop = true;
  let _state: string;


  const parent = ItemWithStates();
  const obj: CharacterComponent = {
    eDown: 0, hasGround: false, momentum: 0,
    ...parent,
    createStepParticle() {
      if (this.momentum != 0 && this.hasGround) {

        const part = ParticleFabric.getParticle(this.x + this.momentum + Math.random() * 30 - 15, this.y + Math.random() * 3 - 1.5, 1);
        Engine.addObject(part, 2);
        Engine.addObjectPhys(part);

      }
    },
    set state(state: string) {
      _state = this.faced + "_" + state;
      this.viewBox.state = state;
    },
    destroy() {
      parent.destroy();
      this.audio.pause();
    },
    x, y,
    update(delta: number) {
      parent.update(delta);

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
    },
    Event(event: SomeEvent) {
      if (event.keyMap == undefined) {
        return;
      }
      if (event.keyMap[GameKeys.A].status()) {
        if (this.hasGround) {
          this.momentum = -0.55 * this.sprint;
        }
      }
      if (event.keyMap[GameKeys.D].status()) {
        if (this.hasGround) {
          this.momentum = 0.55 * this.sprint;
        }
      }
      if (event.keyMap[GameKeys.SHIFT].status()) {
        this.sprint = 1.3;
      } else {
        this.sprint = 1;
      }
      if (event.keyMap[GameKeys.Space].status()) {
        if (this.hasGround) {
          this.eDown = -1;
        }
      }
    }
  };
  obj.physBox = Box(20, 82, 40, 82, this);
  obj.physBox.setCollision(true);
  obj.viewBox = BoxTextured(25, 82, 50, 82, this);

  obj.effector.addEffect(Inertia(this));
  obj.effector.addEffect(Gravity(this));

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
  obj.viewBox.setTexture(textures);
  obj.state = "idle";
};


export {Character, CharacterComponent};

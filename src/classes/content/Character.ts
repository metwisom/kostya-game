import {ItemWithStates, ItemWithStatesComponent} from '../Engine/ItemWithStates';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {TextureCollection} from '../Engine/Texture/TextureCollection';
import {TextureDynamic} from '../Engine/Texture/TextureDynamic';
import {Eventful, SomeEvent} from '../Engine/interfaces/Eventful';
import {GameKeys} from '../Engine/Input/InputKey';
import {Engine} from '../Engine/Engine';
import {Box} from '../Engine/Box/Box';
import {Gravitational, Gravity} from '../effector/effects/Gravity';
import {Inertia, Inertial} from '../effector/effects/Inertia';
import {ParticleFabric} from './ParticleFabric';
import {ResourceLoader, SoundResource} from '../Engine/ResourceLoader/ResourceLoader';


type CharacterComponent = ItemWithStatesComponent & {
  createStepParticle(): void
} & Eventful & Gravitational & Inertial

const Character = function (x: number, y: number) {
  const audio = ResourceLoader.get<SoundResource>('step.wav').content;
  audio.playbackRate = 1.8;
  audio.loop = true;
  let sprint = 1;


  const parent = ItemWithStates();
  const obj: CharacterComponent = {
    ...parent,
    eDown: 0,
    hasGround: false,
    momentum: 0,
    type: 'Character',
    createStepParticle() {
      if (this.momentum != 0 && this.hasGround) {

        const part = ParticleFabric.getParticle(this.x + this.momentum + Math.random() * 30 - 15, this.y + Math.random() * 3 - 1.5, 1);
        Engine.addObject(part, 2);
        Engine.addObjectPhys(part);

      }
    },

    destroy() {
      parent.destroy();
      audio.pause();
    },
    x, y,
    update(delta: number) {
      parent.update.bind(this)(delta);

      this.createStepParticle();

      if (this.y > 300) {
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
    },
    Event(event: SomeEvent) {
      if (event.keyMap == undefined) {
        return;
      }
      if (event.keyMap[GameKeys.A].status(false)) {
        if (this.hasGround) {
          this.momentum = -0.55 * sprint;
        }
      }
      if (event.keyMap[GameKeys.D].status(false)) {
        if (this.hasGround) {
          this.momentum = 0.55 * sprint;
        }
      }
      if (event.keyMap[GameKeys.SHIFT].status(false)) {
        sprint = 1.3;
      } else {
        sprint = 1;
      }
      if (event.keyMap[GameKeys.Space].status(false)) {
        if (this.hasGround) {
          this.hasGround = false;
          this.eDown = -1;
        }
      }
    },
  };
  obj.physBox = Box(20, 82, 40, 82, obj);
  obj.physBox.setCollision(true);
  obj.viewBox = BoxTextured(25, 82, 50, 82, obj);

  obj.effector.addEffect(Inertia(obj));
  obj.effector.addEffect(Gravity(obj));

  const textures = TextureCollection();
  textures.addState('left_idle', TextureDynamic('left_idle.png'));
  textures.addState('right_idle', TextureDynamic('right_idle.png'));
  textures.addState('left_run', TextureDynamic('left_run.png'));
  textures.addState('right_run', TextureDynamic('right_run.png'));
  textures.addState('left_jump', TextureDynamic('left_jump.png'));
  textures.addState('right_jump', TextureDynamic('right_jump.png'));
  textures.addState('left_levitate', TextureDynamic('left_levitate.png'));
  textures.addState('right_levitate', TextureDynamic('right_levitate.png'));
  textures.addState('left_fall', TextureDynamic('left_fall.png'));
  textures.addState('right_fall', TextureDynamic('right_fall.png'));
  textures.addState('left_landing', TextureDynamic('left_landing.png'));
  textures.addState('right_landing', TextureDynamic('right_landing.png'));
  obj.viewBox.setTexture(textures);
  return obj;
};


export {Character, CharacterComponent};

import {getRandom, getRandomFloat} from '../../utils/getRandom';
import {Engine} from '../Engine/Engine';
import {Camera} from '../Engine/Camera';
import {TextureRain} from '../Engine/Texture/TextureRain';
import {Box} from '../Engine/Box/Box';
import {Gravitational, Gravity} from '../effector/effects/Gravity';
import {BoxTextured, BoxTexturedComponent} from '../Engine/Box/BoxTextured';
import {ItemWithStates, ItemWithStatesComponent} from '../Engine/ItemWithStates';


const textureRain = new TextureRain(5, 11);
textureRain.setColor('#65ada0');

type RainComponent = ItemWithStatesComponent & Gravitational

const Rain = function (maxDepth: number) {
  let eDown = 1;
  let hasGround = false;
  let windAngle = Math.PI / 2 + getRandomFloat(-10, 10);
  let maxDepth = maxDepth;
  let speed = 0.5;
  let _viewBox: BoxTexturedComponent;

  const parent = ItemWithStates();
  const obj = {
    ...parent,
    respawn(): void {
      eDown = 1;
      this.x = getRandom(Camera.x - Engine.display.width / 2, Camera.x + Engine.display.width / 2);
      this.y = Camera.y - 1500;
      speed = getRandom(18, 40);
    },
    update(delta: number): void {
      super.update(delta);
      this.x += Math.cos(windAngle) * 4;
      if (this.y > Engine.display.height) {
        this.respawn();
      }
    },
  };

  obj.effector.addEffect(Gravity(this));
  obj.physBox = Box(4, 8, 5, 11, this);
  obj.viewBox = BoxTextured(0, 0, 5, 11, this, textureRain);
  obj.physBox.setCollision(false);
  obj.respawn();
  return obj;
};

export {Rain, RainComponent};

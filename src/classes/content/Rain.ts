import {getRandom, getRandomFloat} from '../../utils/getRandom';
import {Engine} from '../Engine/Engine';
import {Camera} from '../Engine/Camera';
import {Box} from '../Engine/Box/Box';
import {Gravitational, Gravity} from '../effector/effects/Gravity';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {ItemWithStates, ItemWithStatesComponent} from '../Engine/ItemWithStates';
import {TextureStatic} from '../Engine/Texture/TextureStatic';


const textureRain = TextureStatic('waterdrop.png');

type RainComponent = ItemWithStatesComponent & Gravitational & {
  respawn(): void
}

const Rain = function (_maxDepth: number) {
  let windAngle = Math.PI / 2 + getRandomFloat(-10, 10);
  let speed = 0.5;

  const parent = ItemWithStates();
  const obj: RainComponent = {
    ...parent,
    type: 'Rain',
    hasGround: false,
    eDown: 1,
    respawn(): void {
      this.eDown = 1;
      this.x = getRandom(Camera.x - Engine.getDisplay().width / 2, Camera.x + Engine.getDisplay().width / 2);
      this.y = Camera.y - 1500;
      speed = getRandom(18, 40);
    },
    update(delta: number): void {
      parent.update.bind(this)(delta);
      this.x += Math.cos(windAngle) * 4;
      if (this.y > Engine.getDisplay().height) {
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

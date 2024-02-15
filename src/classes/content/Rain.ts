import { getRandom, getRandomFloat } from '../../utils/getRandom';
import { Engine } from '../Engine/Engine';
import { Camera } from '../Engine/Camera';
import { TextureRain } from '../Engine/Texture/TextureRain';
import { Box } from '../Engine/Box/Box';
import { Gravitational, Gravity } from '../effector/effects/Gravity';
import { BoxTextured } from '../Engine/Box/BoxTextured';
import { ItemWithStates } from '../Engine/ItemWithStates';

const textureRain = new TextureRain(5, 11);
textureRain.setColor('#65ada0');

class Rain extends ItemWithStates implements Gravitational {
  public eDown = 1;
  public hasGround = false;
  public windAngle = Math.PI / 2 + getRandomFloat(-10, 10);
  public maxDepth: number;
  public speed = 0.5;
  public hasCollision = false;
  protected _viewBox: BoxTextured;

  constructor(maxDepth: number) {
    super();
    this.effector.addEffect(new Gravity(this));
    this.hasCollision = false;
    this.maxDepth = maxDepth;
    this._physBox = new Box(4, 8, 5, 11, this);
    this._physBox.hasCollision = false;
    this._viewBox = new BoxTextured(0, 0, 5, 11, this, textureRain);
    this.respawn();
  }

  respawn(): void {
    this.eDown = 1;
    this.x = getRandom(Camera.x - Engine.display.width / 2, Camera.x + Engine.display.width / 2);
    this.y = Camera.y - 1500;
    this.speed = getRandom(18, 40);
  }

  draw() {
    return this._viewBox.prop();
  }

  update(delta: number): void {
    super.update(delta);
    this.x += Math.cos(this.windAngle) * 4;
    if (this.y > Engine.display.height) {
      this.respawn();
    }
  }
}

export { Rain };

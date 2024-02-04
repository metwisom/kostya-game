import {getRandom, getRandomFloat} from '../../utils/getRandom';
import {Engine} from '../Engine/Engine';
import {Camera} from '../Engine/Camera';
import {TextureRain} from '../Texture/TextureRain';
import {Box} from '../Box/Box';
import {Gravitational, Gravity} from '../Effector/Gravity';
import {BoxTextured} from '../Box/BoxTextured';
import {ItemWithStates} from '../ItemWithStates';

const texture = new TextureRain(5, 11);
texture.setColor('#65ada0');

class Rain extends ItemWithStates implements Gravitational{

  public eDown = 1;
  public hasGround = false

  _physBox: Box;
  windAngle = Math.PI / 2 + getRandomFloat(-10, 10);
  maxDepth: number;

  speed = 0.5;
  hasCollision = false;

  constructor(maxDepth: number) {

    super();

   this._effector.addEffect(new Gravity(this));

    this.hasCollision = false;
    this.maxDepth = maxDepth;

     this._physBox = new Box(4, 8, 5, 11, this);
    this.physBox.hasCollision = false;

    this.viewBox = new BoxTextured(0, 0, 5, 11, this, texture);

    this.respawn();

  }

  respawn() {
    this.eDown = 1;
    this.x = getRandom(Camera.x - Engine.display.width / 2, Camera.x + Engine.display.width / 2);
    this.y = getRandom(Camera.y - 500, Camera.y - 1500);
    this.speed = getRandom(18, 40);
  }

  draw() {
    return this._viewBox.prop();
  }

  update(delta: number) {
    super.update(delta);
    this.x += Math.cos(this.windAngle) * 4;
    if (this.y > Engine.display.height) {
      this.respawn();
    }
  }

}

export {Rain};

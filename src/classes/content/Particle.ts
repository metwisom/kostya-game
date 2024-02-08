import {TextureBlank} from '../Engine/Texture/TextureBlank';
import {Box} from '../Engine/Box/Box';
import {D2Updatable} from '../Engine/D2Updatable';


class Particle extends D2Updatable {
  angle: number;
  size: number;
  startSize: number;
  speed: number;

  constructor(x: number, y: number, size = 1) {
    super();
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.05 * size;
    this.x = x;
    this.y = y;
    this.size = this.startSize = (Math.random() * 2 + 2) * size;
    this._physBox = new Box(0, 0, 10, 10, this);
    this._physBox.hasCollision = false;
    const texture = new TextureBlank(10, 10);
    texture.setColor('#4b3c1a');
    this._viewBox.texture = texture;
  }

  update(delta: number) {
    this.x += Math.cos(this.angle) * this.speed * delta;
    this.y += Math.sin(this.angle) * this.speed * delta;
    this.size *= 0.95;
    this._viewBox.width = this.size;
    this._viewBox.height = this.size;
    if (this.size < 1) {
      this.destroy();
    }
  }

}

export {Particle};

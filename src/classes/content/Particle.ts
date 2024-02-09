import {TextureBlank} from '../Engine/Texture/TextureBlank';
import {Box} from '../Engine/Box/Box';
import {D2Updatable} from '../Engine/D2Updatable';
import {ParticleFabric} from './ParticleFabric';


class Particle extends D2Updatable {
  angle: number;
  _size: number;
  _speed: number;
  private _destroyTime: number;

  constructor(x: number, y: number, size = 1, speed = 0.05, destroyTime = 0.95) {
    super();
    this._destroyTime = destroyTime;
    this.angle = Math.random() * Math.PI * 2;
    this._speed = speed * size;
    this.x = x;
    this.y = y;
    this._size = (Math.random() * 2 + 2) * size;
    this._physBox = new Box(0, 0, 10, 10, this);
    this._physBox.hasCollision = false;
    const texture = new TextureBlank(10, 10);
    texture.setColor('#4b3c1a');
    this._viewBox.texture = texture;
  }

  set speed(newValue:number){
    this._speed = newValue * this.size
  }
  get speed(){
    return this._speed
  }
  set size(newValue:number){
    this._size = (Math.random() * 2 + 2) * newValue
  }
  get size(){
    return this._size
  }
  set destroyTime(newValue:number){
    this._destroyTime = newValue
  }
  get destroyTime(){
    return this._destroyTime
  }

  update(delta: number) {
    this.x += Math.cos(this.angle) * this._speed * delta;
    this.y += Math.sin(this.angle) * this._speed * delta;
    this._size *= this._destroyTime;
    this._viewBox.width = this._size;
    this._viewBox.height = this._size;
    if (this._size < 1) {
      this.destroy();
    }
  }

  destroy() {
    this.isDestroyed = true;
    ParticleFabric.release(this)
  }

  unDestroy(){
    this.isDestroyed = false;
  }

}

export {Particle};

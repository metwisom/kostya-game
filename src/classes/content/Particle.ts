import {TextureBlank} from "../Engine/Texture/TextureBlank";
import {Box} from "../Engine/Box/Box";
import {D2Updatable, D2UpdatableComponent} from "../Engine/D2Updatable";
import {ParticleFabric} from "./ParticleFabric";


type ParticleComponent = Omit<D2UpdatableComponent, "destroy" | "isActual"> & {
  isActual: () => boolean
  destroy: () => void
  unDestroy: () => void
  speed: number
  size: number
  destroyTime: number
}

const Particle = function (x: number, y: number, size = 1, speed = 0.05, destroyTime = 0.95) {
  let _angle = Math.random() * Math.PI * 2;
  let _size = (Math.random() * 2 + 2) * size;
  let _speed = speed * size;
  let _destroyTime = destroyTime;
  let isDestroyed = false;
  const obj = {
    ...D2Updatable(x, y),
    physBox: Box(0, 0, 10, 10, this),
    set speed(newValue: number) {
      _speed = newValue * this.size;
    },
    get speed() {
      return _speed;
    },
    set size(newValue: number) {
      _size = (Math.random() * 2 + 2) * newValue;
    },
    get size() {
      return _size;
    },
    set destroyTime(newValue: number) {
      _destroyTime = newValue;
    },
    get destroyTime() {
      return _destroyTime;
    },

    update(delta: number) {
      this.x += Math.cos(_angle) * _speed * delta;
      this.y += Math.sin(_angle) * _speed * delta;
      _size *= _destroyTime;
      this._viewBox.width = _size;
      this._viewBox.height = _size;
      if (_size < 1) {
        this.destroy();
      }
    },
    isActual() {
      return !isDestroyed;
    },
    destroy() {
      isDestroyed = true;
      ParticleFabric.release(this);
    },
    unDestroy() {
      isDestroyed = false;
    }
  };
  obj.physBox.setCollision(false);
  const texture = new TextureBlank(10, 10);
  texture.setColor("#4b3c1a");
  obj.viewBox.setTexture(texture);
  return obj;
};


export {Particle,ParticleComponent};

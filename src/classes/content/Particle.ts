import {Box} from '../Engine/Box/Box';
import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {ParticleFabric} from './ParticleFabric';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {TextureStatic} from '../Engine/Texture/TextureStatic';


type ParticleComponent = Omit<D2UpdatableComponent, 'destroy' | 'isActual'> & {
  isActual: () => boolean
  destroy: () => void
  unDestroy: () => void
  speed: number
  size: number
  destroyTime: number
}


const Particle = function (x: number, y: number, newSize = 1, speed = 0.05, destroyTime = 0.95) {
  let angle = Math.random() * Math.PI * 2;
  let _size = (Math.random() * 2 + 2) * newSize;
  // let _speed = speed * size;
  let _destroyTime = destroyTime;
  let isDestroyed = false;
  const obj:ParticleComponent = {
    ...D2Updatable(x, y),
    type: 'Particle',
    speed,
    size: newSize,
    destroyTime,

    update(delta: number) {
      this.x += Math.cos(angle) * this.speed * delta;
      this.y += Math.sin(angle) * this.speed * delta;
      _size *= _destroyTime;
      this.viewBox.width = _size;
      this.viewBox.height = _size;
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
      angle = Math.random() * Math.PI * 2;
      _size = (Math.random() * 2 + 2) * newSize
    },
  };

  obj.physBox = Box(0, 0, 10, 10, obj);
  obj.viewBox = BoxTextured(0, 0, 10, 10, obj);
  obj.physBox.setCollision(false);
  const texture = TextureStatic('particle.png');
  obj.viewBox.setTexture(texture);
  return obj;
};


export {Particle, ParticleComponent};

import {TextureBlank} from '../Engine/Texture/TextureBlank';
import {Box} from '../Engine/Box/Box';
import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {ParticleFabric} from './ParticleFabric';
import {BoxTextured} from '../Engine/Box/BoxTextured';


type ParticleComponent = Omit<D2UpdatableComponent, 'destroy' | 'isActual'> & {
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
  // let _speed = speed * size;
  let _destroyTime = destroyTime;
  let isDestroyed = false;
  const obj = {
    ...D2Updatable(x, y),
    type: 'Particle',
    speed,
    size,
    destroyTime,

    update(delta: number) {
      this.x += Math.cos(_angle) * this.speed * delta;
      this.y += Math.sin(_angle) * this.speed * delta;
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
    },
  };

  obj.physBox = Box(0, 0, 10, 10, obj);
  obj.viewBox = BoxTextured(0, 0, 10, 10, obj);
  obj.physBox.setCollision(false);
  const texture = TextureBlank(10, 10);
  texture.setColor('#4b3c1a');
  obj.viewBox.setTexture(texture);
  return obj;
};


export {Particle, ParticleComponent};

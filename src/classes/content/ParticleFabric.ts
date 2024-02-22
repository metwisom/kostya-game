import {Particle, ParticleComponent} from './Particle';

type ParticleFabric = {
  release(item: ParticleComponent): void
  getParticle(x: number, y: number, size?: number, speed ?: number, destroyTime?: number): ParticleComponent
  particle: number
}

const ParticleFabric = (() => {
  const fabric: ParticleFabric = Object.create(null);

  const particles: ParticleComponent[] = [];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      particles.push(Particle(0, 0));
    }, i * 20);
  }

  let generatorRunning = false;

  Object.defineProperty(fabric, 'particle', {
    get: () => particles.length,
    enumerable: false,
    configurable: false,
  });

  fabric.getParticle = (x: number, y: number, size = 1, speed = 0.05, destroyTime = 0.95) => {
    if (particles.length < 100 && !generatorRunning) {
      generatorRunning = true;
      for (let i = 0; i < 100 - particles.length; i++) {
        setTimeout(() => {
          particles.push(Particle(0, 0));
        }, i * 20);
      }
      setTimeout(() => {
        generatorRunning = false;
      }, (100 - particles.length) * 20);

    }
    const particle = particles.pop() || Particle(x, y);
    particle.unDestroy();
    particle.x = x;
    particle.y = y;
    particle.size = size;
    particle.speed = speed;
    particle.destroyTime = destroyTime;
    return particle;
  };

  fabric.release = (item: ParticleComponent) => {
    particles.push(item);
  };
  return Object.freeze(fabric);
})();

export {ParticleFabric};
import { Engine } from '../classes/Engine/Engine';
import { CanvasStore } from '../classes/Engine/CanvasStore';
import { Graphic } from '../classes/Engine/Graphic';
import { ParticleFabric } from '../classes/content/ParticleFabric';

const objectCounter = () => {
  let skipCount = 0;
  let drawCount = '';
  let physCount = '';
  let canvasStoreCount = '';
  let particlesStoreCount = '';

  return (graphic: Graphic) => {
    skipCount = skipCount > 30 ? 0 : skipCount + 1;

    if (skipCount === 0) {
      let totalDrawCount = 0;
      for (const layer of Engine.layers) {
        totalDrawCount += layer.items.length;
      }
      drawCount = `Objects: ${totalDrawCount}`;
      physCount = `Physics: ${Engine.obj.length}`;
      canvasStoreCount = `Canvas: ${CanvasStore.count}`;
      particlesStoreCount = `Particles: ${ParticleFabric.particle}`;
    }

    // Отображение информации на холсте
    graphic.drawText(
      `${drawCount}\n${physCount}\n${canvasStoreCount}\n${particlesStoreCount}`,
      20,
      60
    );
  };
};

export { objectCounter };

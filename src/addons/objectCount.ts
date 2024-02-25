import {Engine} from '../classes/Engine/Engine';
import {CanvasStore} from '../classes/Engine/CanvasStore';
import {GraphicComponent} from '../classes/Engine/Graphic';
import {ParticleFabric} from '../classes/content/ParticleFabric';

const objectCounter = () => {
  let skipCount = 0;
  let drawCount = '';
  let physCount = '';
  let canvasStoreCount = '';
  let particlesStoreCount = '';

  return (graphic: GraphicComponent) => {
    skipCount = skipCount > 30 ? 0 : skipCount + 1;

    if (skipCount === 0) {
      let totalDrawCount = 0;
      Engine.layers.map(layer => totalDrawCount += layer.items.length);
      drawCount = `Objects: ${totalDrawCount}`;
      physCount = `Physics: ${Engine.getObj.length}`;
      canvasStoreCount = `Canvas: ${CanvasStore.count}`;
      particlesStoreCount = `Particles: ${ParticleFabric.particle}`;
    }

    graphic.drawText(
      `${drawCount}\n${physCount}\n${canvasStoreCount}\n${particlesStoreCount}`,
      20,
      60,
    );
  };
};

export {objectCounter};

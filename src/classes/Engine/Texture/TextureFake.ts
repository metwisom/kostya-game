import {ImageResource} from '../ResourceLoader/ResourceLoader';
import {TextureStaticComponent} from './TextureStatic';

type TextureFakeComponent = TextureStaticComponent

const TextureFake = function () {
  const resource: ImageResource = undefined;

  const img = document.createElement('img');
  // noinspection SpellCheckingInspection
  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC';

  const obj: TextureFakeComponent = {
    type: 'TextureFake',
    reference: resource,
    get(): HTMLImageElement {
      return img;
    },
    destroy() {
    },
  };
  return obj;
};

export {TextureFake, TextureFakeComponent};

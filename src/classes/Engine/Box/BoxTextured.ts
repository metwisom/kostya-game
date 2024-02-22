import {Texture} from '../Texture/Texture';
import {TextureCollection} from '../Texture/TextureCollection';
import {D2DrawableComponent} from '../D2Drawable';
import {Box, BoxArea, BoxComponent} from './Box';
import {TextureBlank} from '../Texture/TextureBlank';


type ViewArea = BoxArea & {
  texture: Texture;
}

type BoxTexturedComponent = Omit<BoxComponent, 'prop'> & {
  setTexture: (texture: Texture) => void
  state: string
  destroy: () => void
  prop(x?: number, y?: number): ViewArea
}

const BoxTextured = function (x: number, y: number, width: number, height: number, maintainer: D2DrawableComponent, texture: TextureBlank = undefined) {
  let _texture: Texture = undefined;
  const parent = Box(x, y, width, height, maintainer);
  const obj: BoxTexturedComponent = {
    ...parent,
    setTexture(texture: Texture) {
      _texture = texture;
    },
    set state(newState: string) {
      if (_texture instanceof TextureCollection) {
        _texture.state = newState;
      }
    },
    prop(): ViewArea {
      return {
        ...parent.prop(0, 0),
        texture: _texture,
      };
    },
    destroy(): void {
      _texture.destroy();
    },
  };
  return Object.freeze(obj);
};

export {BoxTextured, BoxTexturedComponent, ViewArea};
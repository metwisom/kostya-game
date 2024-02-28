import {TextureComponent} from '../Texture/Texture';
import {D2DrawableComponent} from '../D2Drawable';
import {Box, BoxArea, BoxComponent} from './Box';
import {TextureCollectionComponent} from '../Texture/TextureCollection';


type ViewArea = BoxArea & {
  texture: TextureComponent;
}

type BoxTexturedComponent = Omit<BoxComponent, 'prop'> & {
  setTexture: (texture: TextureComponent) => void
  setState(newState: string): void
  destroy: () => void
  prop(x?: number, y?: number): ViewArea
}

const BoxTextured = function (x: number, y: number, width: number, height: number, maintainer: D2DrawableComponent, texture: TextureComponent = undefined) {
  let _texture: TextureComponent = texture;
  const parent = Box(x, y, width, height, maintainer);
  const obj: BoxTexturedComponent = {
    ...parent,
    setTexture(texture: TextureComponent) {
      _texture = texture;
    },
    setState(newState: string) {
      if (_texture.type == 'TextureCollection') {
        (_texture as TextureCollectionComponent).currentState = newState;
      }
    },
    prop(): ViewArea {
      return {
        ...parent.prop.bind(this)(0, 0),
        texture: _texture,
      };
    },
    destroy(): void {
      _texture.destroy();
    },
  };
  return obj;
};

export {BoxTextured, BoxTexturedComponent, ViewArea};
import {TextureDynamicComponent} from '../Texture/TextureDynamic';
import {D2DrawableComponent} from '../D2Drawable';
import {Box, BoxArea, BoxComponent} from './Box';
import {TextureCollectionComponent} from '../Texture/TextureCollection';
import {TextureStaticComponent} from '../Texture/TextureStatic';


type ViewArea = BoxArea & {
  texture: TextureDynamicComponent;
}

type BoxTexturedComponent = Omit<BoxComponent, 'prop'> & {
  setTexture: (texture: TextureStaticComponent) => void
  setState(newState: string): void
  prop(): ViewArea
  destroy: () => void
}

const BoxTextured = function (x: number, y: number, width: number, height: number, maintainer: D2DrawableComponent, texture: TextureStaticComponent = undefined) {
  let _texture: TextureStaticComponent = texture;
  const parent = Box(x, y, width, height, maintainer);
  const obj: BoxTexturedComponent = {
    ...parent,
    setTexture(texture: TextureStaticComponent) {
      _texture = texture;
    },
    setState(newState: string) {
      if (_texture.type == 'TextureCollection') {
        (_texture as unknown as TextureCollectionComponent).currentState = newState;
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
import {Texture} from '../Texture/Texture';
import {TextureCollection} from '../Texture/TextureCollection';
import {D2Drawable} from '../D2Drawable';
import {Box, BoxArea} from './Box';
import {TextureBlank} from '../Texture/TextureBlank';


type ViewArea = BoxArea & {
  texture: Texture;
}

class BoxTextured extends Box {
  private _texture: Texture;

  constructor(x: number, y: number, width: number, height: number, maintainer: D2Drawable, texture: TextureBlank = undefined) {
    super(x, y, width, height, maintainer);
    this._texture = texture;
  }

  set texture(newTexture: Texture) {
    this._texture = newTexture;
  }
  get texture() {
    return this._texture;
  }

  set state(newState: string) {
    if (this.texture instanceof TextureCollection) {
      this.texture.state = newState;
    }
  }

  prop(): ViewArea {
    return {
      ...super.prop(),
      texture: this.texture,
    };
  }

  destroy() {
    this.texture.destroy();
  }
}

export {BoxTextured, ViewArea};
import {Texture} from "../Texture/Texture";
import {TextureCollection} from "../Texture/TextureCollection";
import {D2Drawable} from "../D2Drawable";
import {Box} from "./Box";
import {TextureBlank} from "../Texture/TextureBlank";


type ViewArea = {
  x: number; y: number; width: number; height: number; texture: Texture;
}

class BoxTextured extends Box {
  private texture: Texture;

  constructor(x: number, y: number, width: number, height: number, maintainer: D2Drawable) {
    super(x, y, width, height, maintainer);
    this.texture = new TextureBlank(10, 10);
  }

  setTexture(texture: Texture) {
    this.texture = texture;
  }

  setState(state: string) {
    if (this.texture instanceof TextureCollection) {
      this.texture.setState(state);
    }
  }

  get(): ViewArea {
    return {
      x: super.get().x,
      y: super.get().y,
      width: super.get().width,
      height: super.get().height,
      texture: this.texture
    };
  }

  destroy(){
    this.texture.destroy()
  }
}

export {BoxTextured, ViewArea};
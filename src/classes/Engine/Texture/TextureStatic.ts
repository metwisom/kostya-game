import {ImageResource, ResourceLoader} from '../ResourceLoader/ResourceLoader';

type TextureStaticComponent = {
  type: string;
  reference: ImageResource
  get(delta: number): HTMLImageElement;
  destroy(): void
}

const TextureStatic = function (src: string) {
  const resource = ResourceLoader.get<ImageResource>(src);
  const obj: TextureStaticComponent = {
    type: 'TextureStatic',
    reference: resource,
    get(_: number = 1): HTMLImageElement {
      return this.reference.content;
    },
    destroy(){
      this.reference = undefined
    }
  };
  return obj;
};

export {TextureStatic, TextureStaticComponent};

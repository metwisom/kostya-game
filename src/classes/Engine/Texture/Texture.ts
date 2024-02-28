import {ImageResource, ResourceLoader} from '../ResourceLoader/ResourceLoader';
import {CanvasStore} from '../CanvasStore';

type TextureComponent = {
  type: string
  referenceImage: HTMLImageElement
  virtualCanvas: HTMLCanvasElement;
  virtualScene: CanvasRenderingContext2D;
  get(): HTMLImageElement
  destroy(): void
  render(position: number): void
}

const Texture = function (src: string = undefined) {
  let framesCount = 0;
  let speed = 0;
  let resource: ImageResource = undefined;

  let cur = 0;
  if (src != undefined) {
    resource = ResourceLoader.get<ImageResource>(src);
    framesCount = resource.params.frames;
    speed = resource.params.speed;
  }
  const canvas = CanvasStore.get();
  const obj: TextureComponent = {
    type: 'Texture',
    virtualCanvas: canvas,
    virtualScene: canvas.getContext('2d'),
    referenceImage: undefined,
    render(position: number) {
      const imagePos = this.virtualCanvas.width * position;
      this.virtualScene.clearRect(0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
      this.virtualScene.drawImage(this.referenceImage, imagePos, 0, this.virtualCanvas.width, this.virtualCanvas.height, 0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
    },
    get(): HTMLImageElement {
      if (speed != 0 && speed != undefined) {
        const prevCur = Math.floor(cur);
        cur += speed;
        if (cur >= framesCount) {
          cur = cur - framesCount;
        }
        const lastCur = Math.floor(cur);
        if (prevCur != lastCur) {
          this.render(lastCur);
        }
      }
      return this.virtualCanvas as unknown as HTMLImageElement;
    },
    destroy() {
      CanvasStore.release(this.virtualCanvas);
      this.virtualCanvas = undefined;
    },
  };
  if (resource) {
    obj.referenceImage = resource.content;
    obj.virtualCanvas.width = obj.referenceImage.width / framesCount;
    obj.virtualCanvas.height = obj.referenceImage.height;
    obj.render(0);
  }
  return obj;
};

export {Texture, TextureComponent};

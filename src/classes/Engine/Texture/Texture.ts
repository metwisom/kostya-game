import {ImageResource, ResourceLoader} from '../ResourceLoader/ResourceLoader';
import {CanvasStore} from '../CanvasStore';

type TextureComponent = {
  referenceImage: HTMLImageElement
  virtualCanvas: HTMLCanvasElement;
  virtualScene: CanvasRenderingContext2D;
  cur: number;
  speed: number;
  framesCount: number;
  get(): HTMLImageElement
  destroy(): void
  render(position: number): void
}

const Texture = function (src: string = undefined) {

  const canvas = CanvasStore.get();
  const obj: TextureComponent = {

    virtualCanvas: canvas,
    virtualScene: canvas.getContext('2d'),
    cur: 0,
    referenceImage: undefined,
    speed: 0,
    framesCount: 0,
    render(position: number) {
      const imagePos = this.virtualCanvas.width * position;
      this.virtualScene.clearRect(0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
      this.virtualScene.drawImage(this.referenceImage, imagePos, 0, this.virtualCanvas.width, this.virtualCanvas.height, 0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
    },
    get(): HTMLImageElement {
      if (this.speed != 0 && this.speed != undefined) {
        const prevCur = Math.floor(this.cur);
        this.cur += this.speed;
        if (this.cur >= this.framesCount) {
          this.cur = this.cur - this.framesCount;
        }
        const lastCur = Math.floor(this.cur);
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
  if (src != undefined) {
    obj.referenceImage = ResourceLoader.get<ImageResource>(src).content;
    obj.speed = ResourceLoader.get<ImageResource>(src).params.speed;
    obj.framesCount = ResourceLoader.get<ImageResource>(src).params.frames;
    obj.virtualCanvas.width = obj.referenceImage.width / obj.framesCount;
    obj.virtualCanvas.height = obj.referenceImage.height;
    obj.render(0);
  }
  return obj;
};

export {Texture, TextureComponent};

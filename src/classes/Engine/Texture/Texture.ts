import {ImageResource, ResourceLoader} from '../ResourceLoader/ResourceLoader';
import {CanvasStore} from '../CanvasStore';


class Texture {

  public referenceImage: HTMLImageElement;
  protected virtualCanvas = CanvasStore.get();
  protected virtualScene = this.virtualCanvas.getContext('2d');
  private cur = 0;
  private readonly speed: number;
  private readonly framesCount: number;

  constructor(src: string = undefined) {
    if (src != undefined) {
      this.referenceImage = ResourceLoader.get<ImageResource>(src).content;
      this.speed = ResourceLoader.get<ImageResource>(src).params.speed;
      this.framesCount = ResourceLoader.get<ImageResource>(src).params.frames;
      this.virtualCanvas.width = this.referenceImage.width / this.framesCount;
      this.virtualCanvas.height = this.referenceImage.height;
      this.render(0);
    }
  }

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
  }

  destroy() {
    CanvasStore.release(this.virtualCanvas);
    this.virtualCanvas = undefined;
  }

  protected render(position: number) {
    const imagePos = this.virtualCanvas.width * position;
    this.virtualScene.clearRect(0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
    this.virtualScene.drawImage(this.referenceImage, imagePos, 0, this.virtualCanvas.width, this.virtualCanvas.height, 0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
  }
}

export {Texture};

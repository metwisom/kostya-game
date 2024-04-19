import {CanvasStore} from '../CanvasStore';
import {TextureStatic, TextureStaticComponent} from './TextureStatic';

type TextureDynamicComponent = TextureStaticComponent & {
  virtualCanvas: HTMLCanvasElement;
  virtualScene: CanvasRenderingContext2D;
  render(position: number): void
}

const TextureDynamic = function (src: string = undefined) {
  let cur = 0;

  const parent = TextureStatic(src);

  const canvas = CanvasStore.get();

  const obj: TextureDynamicComponent = {
    ...parent,
    type: 'TextureDynamic',
    virtualCanvas: canvas,
    virtualScene: canvas.getContext('2d'),
    render(position: number) {
      const imagePos = this.virtualCanvas.width * position;
      this.virtualScene.clearRect(0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
      this.virtualScene.drawImage(this.reference.content, imagePos, 0, this.virtualCanvas.width, this.virtualCanvas.height, 0, 0, this.virtualCanvas.width, this.virtualCanvas.height);
    },
    get(delta: number = 1): HTMLImageElement {
      if (this.reference.params.speed != 0 && this.reference.params.speed != undefined) {
        const prevCur = Math.floor(cur);
        cur += this.reference.params.speed * delta;
        if (cur >= this.reference.params.frames) {
          cur = cur - this.reference.params.frames;
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
  if (obj.reference) {
    obj.virtualCanvas.width = obj.reference.content.width / obj.reference.params.frames;
    obj.virtualCanvas.height = obj.reference.content.height;
    obj.render(0);
  }
  return obj;
};

export {TextureDynamic, TextureDynamicComponent};

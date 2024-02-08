import {Engine} from "../classes/Engine/Engine";
import {CanvasStore} from "../classes/Engine/CanvasStore";
import {Graphic} from "../classes/Engine/Graphic";


const objectCounter = () => {
  let skipCount = 0;
  let drawCount = '';
  let physCount = '';
  let canvasStoreCount = '';
  return (graphic: Graphic) => {

    skipCount = skipCount > 30 ? skipCount = 0 : skipCount + 1
    if (skipCount === 0) {
      drawCount = Engine.layers.reduce((prev, cur) => {
        return prev + cur.items.length
      }, 0).toString();
      physCount = Engine.obj.length.toString();
      canvasStoreCount = CanvasStore.count.toString();
    }

    graphic.drawText(`objects: ${drawCount}\nphys: ${physCount}\ncanvas: ${canvasStoreCount}`, 20, 60)
  };
};

export {objectCounter};

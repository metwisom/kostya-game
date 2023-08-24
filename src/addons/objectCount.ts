import {Display} from "../classes/Engine/Display";


const objectCounter = () => {
  return (scene: CanvasRenderingContext2D) => {

    const count = Display.layers.reduce((prev,cur) => {
      return prev + cur.items.length
    },0)

    scene.fillText("objects: " + count.toString(), 20, 40);
  };
};

export {objectCounter};

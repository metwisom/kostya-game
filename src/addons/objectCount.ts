import {Display} from "../classes/Engine/Display";
import {Physics} from "../classes/Engine/Physics";


const objectCounter = () => {
  return (scene: CanvasRenderingContext2D) => {

    const count = Display.layers.reduce((prev,cur) => {
      return prev + cur.items.length
    },0)

    scene.fillText("objects: " + count.toString() + '\nphys: ' + Physics.obj.length ,20, 40);
  };
};

export {objectCounter};

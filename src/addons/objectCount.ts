import {Display} from "../classes/Engine/Display";
import {Physics} from "../classes/Engine/Physics";
import {CanvasStore} from "../classes/CanvasStore";


const objectCounter = () => {
  return (scene: CanvasRenderingContext2D) => {

    const count = Display.layers.reduce((prev,cur) => {
      return prev + cur.items.length
    },0)

    scene.fillText("objects: " + count.toString() ,20, 40);
    scene.fillText(`phys: ` + Physics.obj.length  ,20, 50);
    scene.fillText( '\ncanvas: ' + CanvasStore.count() ,20, 60);

  };
};

export {objectCounter};

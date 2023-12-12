import {StatableItem} from "../StatableItem";
import {BoxTextured} from "../Box/BoxTextured";


const Camera = (function () {

  let attached: StatableItem = undefined;

  const temp = new StatableItem();
  temp.x = 0;
  temp.y = 0;

  temp.viewBox = new BoxTextured(0, 0, 0, 0, temp);
  attached = temp;

  return Object.freeze({
    get target() {
      return attached ? attached : temp;
    },
    get x() {
      return attached ? attached.x : 0;
    },
    get y() {
      return attached ? attached.y : 0;
    },
    attach(obj: StatableItem) {
      attached = obj;
    },
  });

})();


export {Camera};

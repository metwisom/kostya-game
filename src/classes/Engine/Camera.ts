import {Statable} from "../Statable";
import {BoxTextured} from "../Box/BoxTextured";


const Camera = (function () {

  let attached: Statable = undefined;

  const temp = new Statable();
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
    attach(obj: Statable) {
      attached = obj;
    },
  });

})();


export {Camera};

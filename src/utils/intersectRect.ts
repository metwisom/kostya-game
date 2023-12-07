import {BoxArea} from "../classes/Box/Box";


const intersectRect = (r1: BoxArea, r2: BoxArea) => {
  return !(r2.x >= r1.width + r1.x ||
    r2.x + r2.width <= r1.x ||
    r2.y >= r1.height + r1.y ||
    r2.y + r2.height <= r1.y);
};

export {intersectRect};

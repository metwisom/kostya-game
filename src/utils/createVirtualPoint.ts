import {Entity} from "../classes/Entity";
import {Box} from "../classes/Box";


const createVirtualPoint = (x = 100, y = 100) => {
  const point = new Entity();
  point.x = x;
  point.y = y;
  point.phys = new Box(0,0,0,0)
  point.speed = 1;
  point.hasCollision = false;

  return point;
};

export {createVirtualPoint};

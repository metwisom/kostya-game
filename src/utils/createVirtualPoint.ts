import {Entity} from "../classes/Entity";

const createVirtualPoint = (x = 100, y = 100) => {
  const point = new Entity();
  point.x = x;
  point.y = y;
  point.width = 1;
  point.height = 1;
  point.speed = 1;
  point.hasCollision = false;

  return point;
};

export {createVirtualPoint};

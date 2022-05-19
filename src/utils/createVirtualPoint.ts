import GameObject from "../classes/GameObject";

const createVirtualPoint = (x: number = 100, y: number = 100) => {
    const point = new GameObject();
    point.x = x;
    point.y = y;
    point.width = 1;
    point.height = 1;
    point.speed = 1;
    point.hasCollision = false;

    return point;
};

export default createVirtualPoint;

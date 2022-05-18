
const intersectRect = (r1: Record<string, number>, r2: Record<string, number>) => {
  return !(r2.left >= r1.right ||
    r2.right <= r1.left ||
    r2.top >= r1.bottom ||
    r2.bottom <= r1.top);
};

export default intersectRect;

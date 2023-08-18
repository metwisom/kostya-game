type BoxArea = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

class Box {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  get(x: number, y: number): BoxArea {
    return {
      left: x - this.x,
      top: y - this.y,
      right: x - this.x + this.width,
      bottom: y - this.y + this.height
    };
  }
}

export {Box, BoxArea};
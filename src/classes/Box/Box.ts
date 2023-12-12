import {D2Drawable} from "../D2Drawable";


type BoxArea = {
  x: number;
  y: number;
  width: number;
  height: number;
}

class Box {

  protected readonly _x: number;
  protected readonly _y: number;
  protected _width: number;
  protected _height: number;
  protected readonly maintainer: D2Drawable;

  constructor(x: number, y: number, width: number, height: number, maintainer: D2Drawable) {
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
    this.maintainer = maintainer;
  }

  update(_: number): void {

  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public set width(newWidth: number) {
    this._width = newWidth;
  }

  public set height(newHeight: number) {
    this._height = newHeight;
  }

  public get x() {
    return this.maintainer.x - this._x;
  }

  public get y() {
    return this.maintainer.y - this._y;
  }

  public shift(x: number, y: number): BoxArea {
    return {
      x: this.x + x,
      y: this.y + y,
      width: this.width,
      height: this.height
    };
  }

  get(): BoxArea {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

}

export {Box, BoxArea};
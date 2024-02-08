import {D2Drawable} from '../D2Drawable';

interface BoxArea {
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
  private _hasCollision: boolean = false;

  constructor(x: number, y: number, width: number, height: number, maintainer: D2Drawable) {
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
    this.maintainer = maintainer;
  }

  public get hasCollision(){
    return this._hasCollision
  }
  public set hasCollision(newCollisionState){
    this._hasCollision = newCollisionState
  }

  public get height() {
    return this._height;
  }

  public set height(newHeight: number) {
    this._height = newHeight;
  }

  public get width() {
    return this._width;
  }

  public set width(newWidth: number) {
    this._width = newWidth;
  }

  prop(x: number = 0, y: number = 0): BoxArea {
    return {
      x: this.maintainer.x - this._x + x,
      y: this.maintainer.y - this._y + y,
      width: this.width,
      height: this.height,
    };
  }

}

export {Box, BoxArea};
type BoxArea = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

class Box {
  private _currentScale = 1
  private _targetScale  = 1
  readonly _x: number;
  readonly _y: number;
  private _width: number;
  private _height: number;

  constructor(width: number, height: number, x: number, y: number) {
    this._width = width;
    this._height = height;
    this._x = x;
    this._y = y;
  }

  public get width(){
    return this._width * this._currentScale
  }
  public get height(){
    return this._height * this._currentScale
  }
  public get x(){
    return this._x * this._currentScale
  }
  public get y(){
    return this._y * this._currentScale
  }

  public set scale(value:number){
    console.log(this._targetScale)
    console.log(this._currentScale)
    this._targetScale = value;
  }

  public get scale(){
    return this._targetScale;
  }
  public get curScale(){
    return this._currentScale;
  }

  get(x: number, y: number): BoxArea {
    this._currentScale += (this._targetScale - this._currentScale) / 10
    return {
      left: x - this.x ,
      top: y - this.y ,
      right: x - this.x  + this.width ,
      bottom: y - this.y  + this.height
    };
  }
}

export {Box, BoxArea};
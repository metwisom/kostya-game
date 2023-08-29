import {Display} from "../Display";


export enum FloatX {
  left = 1,
  center,
  right,
}

export enum FloatY {
  top = 1,
  center,
  bottom,
}

export class GuiBox {
  private _origX: number;
  private _origY: number;
  private _y: number;
  private _x: number;
  private _width: number;
  private _height: number;
  private _floatX: FloatX;
  private _floatY: FloatY;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.floatX = FloatX.left;
    this.floatY = FloatY.top;
  }

  public set x(value: number) {
    this._origX = value;
    switch (this.floatX) {
    case FloatX.center:
      this._x = value + Display.canvas.width / 2 - this.width / 2;
      break;
    case FloatX.right:
      this._x = Display.canvas.width - value - this.width / 2;
      break;
    default:
      this._x = value - this.width / 2;
    }
  }

  public get x() {
    return this._x;
  }

  public set y(value: number) {
    this._origY = value;
    switch (this.floatY) {
    case FloatY.center:
      this._y = value + Display.canvas.height / 2 - this.height / 2;
      break;
    case FloatY.bottom:
      this._y = Display.canvas.height - value - this.height / 2;
      break;
    default:
      this._y = value - this.height / 2;
    }
  }

  public get y() {
    return this._y;
  }

  public set floatX(value: FloatX) {
    this._floatX = value;
    this.x = this._origX;
  }

  public get floatX() {
    return this._floatX;
  }

  public set floatY(value: FloatY) {
    this._floatY = value;
    this.y = this._origY;
  }

  public get floatY() {
    return this._floatY;
  }

  public set width(value: number) {
    this._width = value;
    this.x = this._origX;
  }

  public get width() {
    return this._width;
  }

  public set height(value: number) {
    this._height = value;
    this.y = this._origY;
  }

  public get height() {
    return this._height;
  }

  public Intersect(x: number, y: number): boolean {
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        return true;
      }
    }
  }
}
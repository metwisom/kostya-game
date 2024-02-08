import {GuiBox} from './GuiBox';
import {D2Drawable} from '../D2Drawable';
import {Engine} from '../Engine';


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

export default class Element extends D2Drawable {

  protected _viewBox: GuiBox;
  private _origX: number;
  private _origY: number;
  private _floatX: FloatX;
  private _floatY: FloatY;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.viewBox = new GuiBox(0, 0, width, height, this);
    this.floatX = FloatX.left;
    this.floatY = FloatY.top;

    window.addEventListener('resize', () => {
      this.x = this._origX;
    });
  }

  public set x(value: number) {
    this._origX = value;
    switch (this.floatX) {
      case FloatX.center:
        this._x = value + Engine.display.width / 2 - this.width / 2;
        break;
      case FloatX.right:
        this._x = Engine.display.width - this.width / 2 - value;
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
        this._y = value + Engine.display.height / 2 - this.height / 2;
        break;
      case FloatY.bottom:
        this._y = Engine.display.height - this.height / 2 - value;
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
    this.viewBox.width = value;
  }

  public get width() {
    return this.viewBox.width;
  }

  public set height(value: number) {
    this.viewBox.height = value;
  }

  public get height() {
    return this.viewBox.height;
  }

  public update() {
    return;
  }

}

import {BoxTextured, ViewArea} from './Box/BoxTextured';


/**
 * @class
 * @classdesc Отрисовываемый объект
 * @property {string} id - Уникальный идентификатор объекта
 * @property {number} x - Положение обьекта в мире по оси X
 * @property {number} y - Положение обьекта в мире по оси Y
 * @property {string} viewBox - Уникальный идентификатор объекта
 * @property {string} id - Уникальный идентификатор объекта
 * @property {string} id - Уникальный идентификатор объекта
 * @property {string} id - Уникальный идентификатор объекта
 */
class D2Drawable {

  readonly id: string = Math.random().toString(16).slice(2);
  protected isDestroyed = false;
  protected _viewBox: BoxTextured;
  protected _y: number = 0;
  protected _x: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this._viewBox = new BoxTextured(0, 0, 0, 0, this);
    this.x = x;
    this.y = y;
  }

  public get y() {
    return this._y;
  }

  public set y(newY: number) {
    this._y = newY;
  }

  public get x() {
    return this._x;
  }

  public set x(newX: number) {
    this._x = newX;
  }

  public get viewBox() {
    return this._viewBox;
  }

  public set viewBox(newViewBox: BoxTextured) {
    this._viewBox = newViewBox;
  }

  draw(): ViewArea {
    return this._viewBox.prop();
  }

  isActual() {
    return !this.isDestroyed;
  }

  destroy() {
    this.isDestroyed = true;
    this._viewBox.destroy();
  }
}

export {D2Drawable};

import {BoxTextured, ViewArea} from "./Box/BoxTextured";


class D2Drawable {

    readonly id: string = Math.random().toString(16).slice(2);
    private isDestroyed = false;
    protected _viewBox: BoxTextured;
    protected _y: number = 0;
    protected _x: number = 0;

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
        return this._viewBox.get();
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

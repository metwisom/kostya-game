import {Display} from "../Display";


type marginX = "left" | "center" | "right"
type marginY = "top" | "center" | "bottom"

class Element {
  public _x: number;
  public _y: number;
  public width: number;
  public height: number;
  public ownEvent: () => void;

  public floatX = "left";
  public floatY = "top";

  public set x(value: number){
    this._x = value
  }

  public get x(){
    if(this.floatX == 'center'){
      return this._x + Display.canvas.width / 2 - this.width / 2
    }else if(this.floatX == 'right'){
      return Display.canvas.width - this._x - this.width / 2
    }
    return this._x  - this.width / 2
  }

  public set y(value: number){
    this._y = value
  }
  public get y(){
    if(this.floatY == 'center'){
      return this._y + Display.canvas.height / 2  - this.height / 2
    }else if(this.floatY == 'bottom'){
      return Display.canvas.height - this._y - this.height / 2
    }
    return this._y - this.height / 2
  }

  constructor() {

  }

  public Draw(scene: CanvasRenderingContext2D) {
    let x = this.x
    let y = this.y

    scene.fillRect(
      x - this.width / 2,
      y - this.height / 2,
      this.width,
      this.height);
  }

  public Intersect(x: number, y: number): boolean {
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        return true;
      }
    }
  }

  public Event() {
    console.log("hello");
    if (this.ownEvent != undefined) {
      this.ownEvent();
    }
  }
}

export default Element;
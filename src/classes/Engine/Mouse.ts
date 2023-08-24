import {Entity} from "../Entity";
import {GameKeyboard, _GameKeyboard} from "./GameKeyboard";
import Element from "./Gui/Element";
import {Display} from "./Display";


class _Mouse {

  private slaves: Element[] = [];
  private pressed: boolean;
  public x: number;
  public y: number;

  constructor() {
    document.addEventListener("mousedown", this.click.bind(this));
    document.addEventListener("mouseup", this.click.bind(this));
    document.addEventListener("mousemove", this.move.bind(this));
  }

  addSlave(obj: Element) {
    this.slaves.push(obj);
  }

  move(e: MouseEvent) {
    this.x = e.clientX;
    this.y = e.clientY;
    let hasIntersect = false
    this.slaves.map(element => {
      if (element.Intersect(this.x, this.y)) {
        hasIntersect = true
      }
    });
    console.log(hasIntersect)
    if(hasIntersect){
      Display.canvas.style.cursor = "pointer"
    }else{
      Display.canvas.style.cursor = "default"
    }
  }

  click(e: MouseEvent) {
    if (e.type == "mousedown") {
      this.pressed = true;
      this.slaves.map(element => {
        if (element.Intersect(this.x, this.y)) {
          element.Event();
        }
      });
    }
    if (e.type == "mouseup") {
      this.pressed = false;
    }
  }
}

const Mouse = new _Mouse();

export {Mouse, _Mouse};

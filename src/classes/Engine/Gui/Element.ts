import {GuiBox} from "./GuiBox";
import GameElement from "../../GameElement";


export default class Element extends GameElement{
  public viewBox: GuiBox;
  public ownEvent: () => void;

  constructor(x: number, y: number, width: number, height: number) {
    super()
    this.viewBox = new GuiBox(x, y, width, height);
  }

  public draw(scene: CanvasRenderingContext2D) {
    scene.fillRect(
      this.viewBox.x - this.viewBox.width / 2,
      this.viewBox.y - this.viewBox.height / 2,
      this.viewBox.width,
      this.viewBox.height);
  }

  public Event() {
    if (this.ownEvent != undefined) {
      this.ownEvent();
    }
  }
}

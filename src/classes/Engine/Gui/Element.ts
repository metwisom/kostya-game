import {GuiBox} from "./GuiBox";


export default class Element {
  public viewBox: GuiBox;
  public ownEvent: () => void;

  constructor(x: number, y: number, width: number, height: number) {
    this.viewBox = new GuiBox(x, y, width, height);
  }

  public Draw(scene: CanvasRenderingContext2D) {
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

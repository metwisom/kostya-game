import Element from "./Element";


export class Button extends Element {
  public text: string;
  public color: string;

  constructor(x: number, y: number, width: number, height: number, text: string) {
    super(x, y, width, height);
    this.text = text;
  }

  public Draw(scene: CanvasRenderingContext2D) {
    scene.fillStyle = "rgb(0, 0, 0)";
    scene.fillRect(
      this.viewBox.x,
      this.viewBox.y,
      this.viewBox.width,
      this.viewBox.height);


    scene.fillStyle = "#65ada0";
    scene.font = "10px 'Press Start 2P'";
    let metrics = scene.measureText(this.text);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    scene.fillText(this.text, this.viewBox.x + this.viewBox.width / 2 - metrics.width / 2, this.viewBox.y + this.viewBox.height / 2 + actualHeight / 2);
  }

}



import Element from "./Element";


class Button extends Element{
  public text: string;
  public color: string;
  constructor() {
    super();
  }

  public Draw(scene: CanvasRenderingContext2D) {
    scene.fillStyle = "rgb(0, 0, 0)";
      scene.fillRect(
        this.x,
        this.y,
        this.width,
        this.height);


    scene.fillStyle = "#65ada0";
    scene.font = "10px 'Press Start 2P'"
    let metrics = scene.measureText(this.text);
    let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      scene.fillText(this.text,this.x + this.width / 2 - metrics.width / 2,this.y + this.height / 2 + actualHeight / 2)
  }

}

export default Button
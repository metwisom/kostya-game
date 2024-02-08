import {BoxTextured} from "../Box/BoxTextured";
import {D2Drawable} from "../D2Drawable";


export class GuiBox extends BoxTextured {

  constructor(x: number, y: number, width: number, height: number, maintainer: D2Drawable) {
    super(x, y, width, height, maintainer);
  }

  update(): string {
    return "";
  }
}
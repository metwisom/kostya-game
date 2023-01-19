import {Entity} from "../Entity";
import {Sprite} from "../Sprite";
import {MapLoader} from "../Engine/Map/MapLoader";

class Structure extends Entity {

  matrixPosX = 0;
  matrixPosY = 0;

  constructor(x: number, y: number) {

    super();

    this.faced = "right";
    this.sprites = {
      "idle": new Sprite("block.png")
    };
    this.matrixPosX = x;
    this.matrixPosY = y;
    this.height = 50;
    this.width = 50;
    this.x = x * this.width;
    this.y = y * this.height;
  }

  refreshSprite() {
    let view = 0;
    view += MapLoader.get(this.matrixPosX, this.matrixPosY + 1) ? 1 : 0;
    view += MapLoader.get(this.matrixPosX - 1, this.matrixPosY + 1) ? 2 : 0;
    view += MapLoader.get(this.matrixPosX - 1, this.matrixPosY) ? 4 : 0;
    view += MapLoader.get(this.matrixPosX - 1, this.matrixPosY - 1) ? 8 : 0;
    view += MapLoader.get(this.matrixPosX, this.matrixPosY - 1) ? 16 : 0;
    view += MapLoader.get(this.matrixPosX + 1, this.matrixPosY - 1) ? 32 : 0;
    view += MapLoader.get(this.matrixPosX + 1, this.matrixPosY) ? 64 : 0;
    view += MapLoader.get(this.matrixPosX + 1, this.matrixPosY + 1) ? 128 : 0;
    if (this.byteCalc(view, [1], [4, 16, 64])) {
      this.sprites["idle"] = new Sprite("block_one_foot.png");
    }
    if (this.byteCalc(view, [4, 64], [16])) {
      this.sprites["idle"] = [
        new Sprite("block.png"),
        new Sprite("block2.png"),
        new Sprite("block3.png"),
      ][Math.floor(Math.random() * 3)];
    }
    if (this.byteCalc(view, [4], [64])) {
      this.sprites["idle"] = new Sprite("block_left.png");
      this.faced = "left";
    }
    if (this.byteCalc(view, [64], [4])) {
      this.sprites["idle"] = new Sprite("block_left.png");
      this.faced = "right";
    }
    if (this.byteCalc(view, [4, 16, 64], [8, 32])) {
      this.sprites["idle"] = new Sprite("block_mouse.png");
      this.faced = "right";
    }
  }

  byteCalc(view: number, include: number[], exclude: number[]) {
    return exclude.reduce((prev, curr) => ((view & curr) !== curr) && prev,
      include.reduce((prev, curr) => ((view & curr) === curr) && prev, true));
  }
}

export {Structure};

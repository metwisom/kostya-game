import {MapLoader} from '../Engine/Map/MapLoader';
import {D2Updatable} from '../Engine/D2Updatable';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {Texture} from '../Engine/Texture/Texture';
import {Box} from '../Engine/Box/Box';


class Structure extends D2Updatable {

  matrixPosX = 0;
  matrixPosY = 0;

  constructor(x: number, y: number) {
    super();

    this.matrixPosX = x;
    this.matrixPosY = y;
    this.physBox = Box(0, 0, 50, 50, this);
    this._physBox.hasCollision = true;
    this.viewBox = BoxTextured(0, 0, 50, 50, this);
    this.x = x * 50;
    this.y = y * 50;
    this.refreshSprite();
  }

  //8   16  32
  //4   X   64
  //2   1   128
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
    if (this.byteCalc(view, [32, 64], [16])) {
      this.viewBox.texture = new Texture('sub_corner_left.png');
    } else {
      if (this.byteCalc(view, [8, 4], [16])) {
        this.viewBox.texture = new Texture('sub_corner_right.png');
      } else {
        if (this.byteCalc(view, [1], [4, 16, 64])) {
          this.viewBox.texture = new Texture('block_one_foot.png');
        } else {
          if (this.byteCalc(view, [4, 64], [16])) {
            this.viewBox.texture = new Texture('block.png');
          } else {
            if (this.byteCalc(view, [4], [64])) {
              this.viewBox.texture = new Texture('block_right.png');
            } else {
              if (this.byteCalc(view, [64], [4])) {
                this.viewBox.texture = new Texture('block_left.png');
              } else {
                this.viewBox.texture = new Texture('block_mouse.png');
              }
            }
          }
        }
      }
    }
    if (this.viewBox.prop(0,0).texture == undefined) {

    }
  }

  byteCalc(view: number, include: number[], exclude: number[]) {
    return exclude.reduce((prev, curr) => ((view & curr) !== curr) && prev,
      include.reduce((prev, curr) => ((view & curr) === curr) && prev, true));
  }
}

export {Structure};

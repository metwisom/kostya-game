import {MapLoader} from '../Engine/Map/MapLoader';
import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {Texture} from '../Engine/Texture/Texture';
import {Box} from '../Engine/Box/Box';

type StructureComponent = D2UpdatableComponent & {
  refreshSprite(): void
  byteCalc(view: number, include: number[], exclude: number[]): boolean
}

//8   16  32
//4   X   64
//2   1   128
const Structure = function (x: number, y: number) {
  const matrixPosX = x;
  const matrixPosY = y;
  const parent = D2Updatable(x * 50, y * 50);
  const obj: StructureComponent = {
    ...parent,
    type: 'Structure',
    refreshSprite() {
      let view = 0;
      view += MapLoader.gets(matrixPosX, matrixPosY + 1) ? 1 : 0;
      view += MapLoader.gets(matrixPosX - 1, matrixPosY + 1) ? 2 : 0;
      view += MapLoader.gets(matrixPosX - 1, matrixPosY) ? 4 : 0;
      view += MapLoader.gets(matrixPosX - 1, matrixPosY - 1) ? 8 : 0;
      view += MapLoader.gets(matrixPosX, matrixPosY - 1) ? 16 : 0;
      view += MapLoader.gets(matrixPosX + 1, matrixPosY - 1) ? 32 : 0;
      view += MapLoader.gets(matrixPosX + 1, matrixPosY) ? 64 : 0;
      view += MapLoader.gets(matrixPosX + 1, matrixPosY + 1) ? 128 : 0;
      if (this.byteCalc(view, [32, 64], [16])) {
        this.viewBox.setTexture(Texture('sub_corner_left.png'));
      } else {
        if (this.byteCalc(view, [8, 4], [16])) {
          this.viewBox.setTexture(Texture('sub_corner_right.png'));
        } else {
          if (this.byteCalc(view, [1], [4, 16, 64])) {
            this.viewBox.setTexture(Texture('block_one_foot.png'));
          } else {
            if (this.byteCalc(view, [4, 64], [16])) {
              this.viewBox.setTexture(Texture('block.png'));
            } else {
              if (this.byteCalc(view, [4], [64])) {
                this.viewBox.setTexture(Texture('block_right.png'));
              } else {
                if (this.byteCalc(view, [64], [4])) {
                  this.viewBox.setTexture(Texture('block_left.png'));
                } else {
                  this.viewBox.setTexture(Texture('block_mouse.png'));
                }
              }
            }
          }
        }
      }
      if (this.viewBox.prop(0, 0).texture == undefined) {

      }
    },
    byteCalc(view: number, include: number[], exclude: number[]) {
      return exclude.reduce((prev, curr) => ((view & curr) !== curr) && prev,
        include.reduce((prev, curr) => ((view & curr) === curr) && prev, true));
    },
  };
  obj.physBox = Box(0, 0, 50, 50, obj);
  obj.physBox.setCollision(true);
  obj.viewBox = BoxTextured(0, 0, 50, 50, obj);
  obj.refreshSprite();
  return obj;
};

export {Structure, StructureComponent};

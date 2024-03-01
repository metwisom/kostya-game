import {MapLoader} from '../Engine/Map/MapLoader';
import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {Box} from '../Engine/Box/Box';
import {byteCalc} from '../../utils/byteCalc';
import {TextureDynamic} from '../Engine/Texture/TextureDynamic';

type StructureComponent = D2UpdatableComponent & {
  refreshSprite(): void
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
      let textureSrc = 'block_mouse.png';
      switch (true) {
        case byteCalc(view, [32, 64], [16]):
          textureSrc = 'sub_corner_left.png';
          break;
        case byteCalc(view, [8, 4], [16]):
          textureSrc = 'sub_corner_right.png';
          break;
        case byteCalc(view, [1], [4, 16, 64]):
          textureSrc = 'block_one_foot.png';
          break;
        case byteCalc(view, [4, 64], [16]):
          textureSrc = 'block.png';
          break;
        case byteCalc(view, [4], [64]):
          textureSrc = 'block_right.png';
          break;
        case byteCalc(view, [64], [4]):
          textureSrc = 'block_left.png';
          break;
      }
      this.viewBox.setTexture(TextureDynamic(textureSrc));
    },
  };
  obj.physBox = Box(0, 0, 50, 50, obj);
  obj.physBox.setCollision(true);
  obj.viewBox = BoxTextured(0, 0, 50, 50, obj);
  obj.refreshSprite();
  return obj;
};

export {Structure, StructureComponent};

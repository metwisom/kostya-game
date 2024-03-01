import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {TextureDynamic} from '../Engine/Texture/TextureDynamic';
import {Box} from '../Engine/Box/Box';
import {TextureFake} from '../Engine/Texture/TextureFake';


const FakeAnimate = function () {
  const parent: D2UpdatableComponent = D2Updatable();
  const obj: D2UpdatableComponent = {
    ...parent,
    type: 'FakeAnimate',
    x: 0,
    y: 0,
    draw() {
      this.x += 0.9;
      return parent.draw.bind(this)();
    },
  };
  obj.physBox = Box(0, 0, 0, 0, obj);
  obj.viewBox = BoxTextured(0, 0, 0, 0, obj);
  obj.viewBox.setTexture(TextureFake());
  return obj;
};


export {FakeAnimate};

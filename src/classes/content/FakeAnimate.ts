import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {Texture} from '../Engine/Texture/Texture';
import {Box} from '../Engine/Box/Box';


const FakeAnimate = function () {
  const parent: D2UpdatableComponent = D2Updatable();
  const obj = {
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
  obj.viewBox.setTexture(Texture());
  return obj;
};


export {FakeAnimate};

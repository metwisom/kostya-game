import {BoxTextured} from "../Engine/Box/BoxTextured";
import {Texture} from "../Engine/Texture/Texture";
import {Box, BoxComponent} from "../Engine/Box/Box";
import {D2Updatable, D2UpdatableComponent} from "../Engine/D2Updatable";
import {D2DrawableComponent} from "../Engine/D2Drawable";


const FakeAnimate = function () {
  const parent: D2UpdatableComponent = D2Updatable();
  const obj = {
    ...parent,
    draw() {
      this.x += 0.9;
      return parent.draw();
    }
  };
  return obj;
};


export {FakeAnimate};

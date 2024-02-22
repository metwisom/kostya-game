import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';


const FakeAnimate = function () {
  const parent: D2UpdatableComponent = D2Updatable();
  const obj = {
    ...parent,
    draw() {
      this.x += 0.9;
      return parent.draw();
    },
  };
  return obj;
};


export {FakeAnimate};

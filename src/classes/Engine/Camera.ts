import {D2DrawableComponent} from './D2Drawable';
import {FakeAnimate} from '../content/FakeAnimate';

type Camera = {
  readonly target: D2DrawableComponent;
  readonly x: number;
  readonly y: number;
  attach(obj: D2DrawableComponent): void;
};

const Camera = (() => {
  let attached: D2DrawableComponent = FakeAnimate();
  const camera: Camera = {
    get target(): D2DrawableComponent {
      return attached;
    },
    get x(): number {
      return attached.x;
    },
    get y(): number {
      return attached.y;
    },
    attach(obj: D2DrawableComponent): void {
      attached = obj;
    },
  };

  return Object.freeze(camera);
})();

export {Camera};

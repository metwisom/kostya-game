import {BoxTextured, ViewArea} from "../Engine/Box/BoxTextured";
import {Texture} from "../Engine/Texture/Texture";
import {D2Updatable, D2UpdatableComponent} from "../Engine/D2Updatable";
import {Camera} from "../Engine/Camera";
import {Engine} from "../Engine/Engine";
import {Box} from "../Engine/Box/Box";


type ParallaxComponent = D2UpdatableComponent & {
  setOriginX(x: number): void
}

const Parallax = function (image: string, bias: number) {

  const texture = new Texture(image);
  const ratio = Engine.display.height / texture.referenceImage.height;
  const width = texture.referenceImage.width * ratio;
  const height = texture.referenceImage.height * ratio;
  const _bias = bias;
  let _originX = 0;

  const parent = D2Updatable()
  const obj: ParallaxComponent = {
    ...parent,
    setOriginX(x: number) {
      _originX = x;
    },
    draw(): ViewArea {
      this.y = -Camera.y - Engine.display.height / 2;


      this.x = this.viewBox.width * Math.floor(Camera.x / this.viewBox.width);

      this.x = this.x + (Camera.x * _bias / 20) % this.viewBox.width;

      this.x = (this.x + _originX);
      this.y = Camera.y - Engine.display.height / 2 + Camera.target.viewBox.height / 2;

      return parent.draw();

    }
  };
  obj.physBox = Box(0, 0, width, height, this);
  obj.viewBox = BoxTextured(0, 0, width, height, this);
  obj.viewBox.setTexture(texture);
  return obj;
};


export {Parallax, ParallaxComponent};

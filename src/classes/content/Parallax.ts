import {BoxTextured, ViewArea} from '../Engine/Box/BoxTextured';
import {Texture} from '../Engine/Texture/Texture';
import {D2Updatable, D2UpdatableComponent} from '../Engine/D2Updatable';
import {Camera} from '../Engine/Camera';
import {Engine} from '../Engine/Engine';
import {Box} from '../Engine/Box/Box';


type ParallaxComponent = D2UpdatableComponent & {
  originX: number
}

const Parallax = function (image: string, bias: number) {

  const texture = Texture(image);
  const ratio = Engine.getDisplay().height / texture.referenceImage.height;
  const width = texture.referenceImage.width * ratio;
  const height = texture.referenceImage.height * ratio;

  const parent = D2Updatable();
  const obj: ParallaxComponent = {
    ...parent,
    type: 'Parallax',
    originX: 0,
    draw(): ViewArea {
      this.y = -Camera.y - Engine.getDisplay().height / 2;
      this.x = this.viewBox.width * Math.floor(Camera.x / this.viewBox.width);
      this.x = this.x + (Camera.x * bias / 20) % this.viewBox.width;
      this.x = (this.x + this.originX);
      this.y = Camera.y - Engine.getDisplay().height / 2 + Camera.target.viewBox.height / 2;
      return parent.draw.bind(this)();
    },
  };
  obj.physBox = Box(0, 0, width, height, obj);
  obj.viewBox = BoxTextured(0, 0, width, height, obj);
  obj.viewBox.setTexture(texture);
  return obj;
};


export {Parallax, ParallaxComponent};

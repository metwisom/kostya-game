import {StatableItem} from "../StatableItem";
import {getRandom, getRandomFloat} from "../../utils/getRandom";
import {Display} from "../Engine/Display";
import {BoxGravity} from "../Box/BoxGravity";
import {BoxTextured} from "../Box/BoxTextured";
import {Camera} from "../Engine/Camera";
import {TextureRain} from "../Texture/TextureRain";


class Rain extends StatableItem {

  _physBox: BoxGravity;
  windAngle = Math.PI / 2 + getRandomFloat(-10,10)
  maxDepth: number;

  speed = 0.5
  hasCollision = false;

  constructor(maxDepth: number) {

    super();
    this.hasCollision = false;
    this.maxDepth = maxDepth;

    this._physBox = new BoxGravity(4, 8, 5, 11, this);
    this.physBox.hasCollision = false;
    this.viewBox = new BoxTextured(0, 0, 5, 11, this);


    this.respawn()

    const texture = new TextureRain(5, 11);
    texture.setColor("#65ada0")
    this.viewBox.setTexture(texture);
  }

  respawn(){
    this.x = getRandom(Camera.x - Display.display.width / 2, Camera.x + Display.display.width / 2);
    this.y = getRandom(Camera.y - 500, Camera.y - 1500);
    this.speed = getRandom(18,40);
  }

  draw() {
    return this._viewBox.get();
  }

  update(delta: number) {
    this._physBox.eDown = this.speed
    this.x += Math.cos(this.windAngle) * 4
    if (this.y > Display.display.height) {
      this.respawn()
    }
    super.update(delta);
  }


}

export {Rain};

import {ItemWithStates, ItemWithStatesComponent} from "../Engine/ItemWithStates";
import {BoxTextured} from "../Engine/Box/BoxTextured";
import {Texture} from "../Engine/Texture/Texture";
import {Eventful, SomeEvent} from "../Engine/interfaces/Eventful";
import {Box, BoxComponent} from "../Engine/Box/Box";
import {Attainable} from "../effector/effects/Attainable";
import {AntiGravity} from "../effector/effects/AntiGravity";
import {ResourceLoader, SoundResource} from "../Engine/ResourceLoader/ResourceLoader";


type ItemComponent = ItemWithStatesComponent & Eventful

const Item = function (x: number, y: number) {

  const audio = ResourceLoader.get<SoundResource>("taken.ogg");

  const parent = ItemWithStates();
  const obj: ItemComponent = {
    ...parent,
    Event(event: SomeEvent) {
      if (event.taken != undefined) {
        this.audio.content.play().then();
        event.taken.effector.addEffect(AntiGravity(event.taken));
      }
    }
  };
  obj.physBox = Box(18, 18, 36, 36, this);
  obj.physBox.hasCollision = false;
  obj.viewBox = BoxTextured(18, 18, 36, 36, this);

  obj.effector.addEffect(new Attainable(this));

  obj.viewBox.setTexture(new Texture("cherries.png"));
  obj.state = "idle";
};


export {Item, ItemComponent};

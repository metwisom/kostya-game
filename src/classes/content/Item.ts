import {ItemWithStates, ItemWithStatesComponent} from '../Engine/ItemWithStates';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {TextureDynamic} from '../Engine/Texture/TextureDynamic';
import {Eventful, SomeEvent} from '../Engine/interfaces/Eventful';
import {Box} from '../Engine/Box/Box';
import {Pickup} from '../effector/effects/Pickup';
import {AntiGravity} from '../effector/effects/AntiGravity';
import {ResourceLoader, SoundResource} from '../Engine/ResourceLoader/ResourceLoader';
import {D2UpdatableComponent} from '../Engine/D2Updatable';
import {Gravitational} from '../effector/effects/Gravity';


type ItemComponent = ItemWithStatesComponent & Eventful

const Item = function (x: number, y: number) {

  const audio = ResourceLoader.get<SoundResource>('taken.ogg');

  const parent = ItemWithStates();
  const obj: ItemComponent = {
    ...parent,
    x, y,
    type: 'Item',
    Event(event: SomeEvent) {
      if (event.taken != undefined) {
        audio.content.play().then();
        event.taken.effector.addEffect(AntiGravity(event.taken as D2UpdatableComponent & Gravitational));
      }
    },
  };
  obj.physBox = Box(18, 18, 36, 36, obj);
  obj.physBox.hasCollision = false;
  obj.viewBox = BoxTextured(18, 18, 36, 36, obj);

  obj.effector.addEffect(Pickup(obj));

  obj.viewBox.setTexture(TextureDynamic('cherries.png'));
  obj.setState('idle');
  return obj;
};


export {Item, ItemComponent};

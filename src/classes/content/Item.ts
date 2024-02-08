import {ItemWithStates} from '../Engine/ItemWithStates';
import {BoxTextured} from '../Engine/Box/BoxTextured';
import {Texture} from '../Engine/Texture/Texture';
import {Eventful, SomeEvent} from '../Engine/interfaces/Eventful';
import {Box} from '../Engine/Box/Box';
import {Attainable} from '../effector/effects/Attainable';
import {Poper} from '../effector/effects/Poper';

class Item extends ItemWithStates implements Eventful {

  protected audio = new Audio('/resources/audio/taken.ogg');

  protected _physBox: Box;

  public get physBox(): typeof this._physBox {
    return this._physBox;
  }

  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
    this._physBox = new Box(18, 18, 36, 36, this);
    this._physBox.hasCollision = false;
    this.viewBox = new BoxTextured(18, 18, 36, 36, this);

    this.effector.addEffect(new Attainable(this));

    this.viewBox.texture = new Texture('cherries.png');
    this.state = 'idle';
  }

  public Event(event: SomeEvent) {
    if (event.taken != undefined) {
      this.audio.play().then();
      event.taken.effector.addEffect(new Poper(event.taken));
    }
  }

  public set state(state: string) {
    this._state = this.faced + '_' + state;
    this.viewBox.state = this._state;
  }



  public destroy() {
    super.destroy();
  }

}

export {Item};

import Element from './Element';
import {Eventful} from '../interfaces/Eventful';
import {TextureBlank} from '../../Texture/TextureBlank';
import {InputMap} from '../Input/InputController';


export class Button extends Element implements Eventful {
  public text: string;
  protected _ownEvent: (keymap: InputMap) => void;

  public set ownEvent(cb: (keymap: InputMap) => void) {
    this._ownEvent = cb;
  }

  public get ownEvent() {
    return this._ownEvent;
  }

  readonly Event = (keymap: InputMap) => {
    if (this._ownEvent != undefined) {
      this.ownEvent(keymap);
    }
  };

  constructor(x: number, y: number, width: number, height: number, text: string) {
    super(x, y, width, height);
    this.text = text;
    const texture = new TextureBlank(width, height);
    texture.setText(text, 'red');
    this.viewBox.texture = texture;
  }

}



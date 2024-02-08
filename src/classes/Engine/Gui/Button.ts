import Element from './Element';
import {Eventful} from '../interfaces/Eventful';
import {InputMap} from '../Input/InputController';
import {TextureButton} from '../Texture/TextureButton';


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
    const texture = new TextureButton('panel_brown.png',width,height);
    texture.setText(text, '#ccc');
    this.viewBox.texture = texture;
  }

}



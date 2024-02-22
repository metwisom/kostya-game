import {Element, ElementComponent} from './Element';
import {Eventful, SomeEvent} from '../interfaces/Eventful';
import {TextureButton} from '../Texture/TextureButton';
import {BoxTextured} from '../Box/BoxTextured';


type ButtonComponent = ElementComponent & Eventful

function Button(x: number, y: number, width: number, height: number, text: string) {

  const texture = new TextureButton('panel_brown.png', width, height);
  texture.setText(text, '#ccc');

  const obj: ButtonComponent = {
    ...Element(x, y, width, height),
    text: text,
    _ownEvent: (cb: (event: SomeEvent) => void) => {
      this._ownEvent = cb;
    },
    Event: (event: SomeEvent) => {
      if (this._ownEvent != undefined) {
        this.ownEvent(event);
      }
    },
  };
  obj.viewBox = new BoxTextured(0, 0, width, height, obj);
  return obj;
}

export {Button};

export class Button extends Element implements Eventful {

  public text: string;

  constructor(x: number, y: number, width: number, height: number, text: string) {
    super(x, y, width, height);
    this.text = text;
    const texture = new TextureButton('panel_brown.png', width, height);
    texture.setText(text, '#ccc');
    this.viewBox.setTexture(texture);
  }

  protected _ownEvent: (event: SomeEvent) => void;

  public get ownEvent() {
    return this._ownEvent;
  }

  public set ownEvent(cb: (event: SomeEvent) => void) {
    this._ownEvent = cb;
  }

  readonly Event = (event: SomeEvent) => {
    if (this._ownEvent != undefined) {
      this.ownEvent(event);
    }
  };

}



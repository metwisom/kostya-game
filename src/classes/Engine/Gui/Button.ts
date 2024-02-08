import Element from './Element';
import {Eventful, SomeEvent} from '../interfaces/Eventful';
import {TextureButton} from '../Texture/TextureButton';
import {GuiBox} from './GuiBox';


export class Button extends Element implements Eventful {

  protected _viewBox: GuiBox & { texture: TextureButton };

  public text: string;
  protected _ownEvent: (event: SomeEvent) => void;

  public set ownEvent(cb: (event: SomeEvent) => void) {
    this._ownEvent = cb;
  }

  get viewBox() {
    return this._viewBox;
  }


  public set viewBox(newViewBox: GuiBox & { texture: TextureButton }) {
    this._viewBox = newViewBox;
  }

  public get ownEvent() {
    return this._ownEvent;
  }

  readonly Event = (event: SomeEvent) => {
    if (this._ownEvent != undefined) {
      this.ownEvent(event);
    }
  };

  constructor(x: number, y: number, width: number, height: number, text: string) {
    super(x, y, width, height);
    this.text = text;
    const texture = new TextureButton('panel_brown.png', width, height);
    texture.setText(text, '#ccc');
    this.viewBox.texture = texture;
  }

}



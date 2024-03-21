import {Element, ElementComponent} from './Element';
import {Eventful, SomeEvent} from '../interfaces/Eventful';
import {TextureButton} from '../Texture/TextureButton';
import {BoxTextured} from '../Box/BoxTextured';


type ButtonComponent = ElementComponent & Eventful & {
  text: string
  ownEvent(newCb: (event: SomeEvent) => void): void
}

function Button(x: number, y: number, width: number, height: number, text: string) {

  const texture = TextureButton('panel_brown.png', width, height);
  texture.setText(text, '#ccc');
  let _ownEvent: (event: SomeEvent) => void = (_e) => {
  };

  const parent = Element(x, y, width, height);

  const obj: ButtonComponent = {
    ...parent,
    type: 'Button',
    text: text,
    ownEvent(newCb: (event: SomeEvent) => void) {
      _ownEvent = newCb;
    },
    Event: (event: SomeEvent) => {
      if (_ownEvent != undefined) {
        _ownEvent(event);
      }
    },
  };
  obj.viewBox = BoxTextured(0, 0, width, height, obj);
  obj.viewBox.setTexture(texture);

  return obj;
}

export {Button};


import {InputMap} from '../Input/InputController';
import {Character} from '../../content/Character';


interface SomeEvent {
  keyMap?: InputMap;
  taken?: Character;
}

interface Eventful {
  readonly Event: (event: SomeEvent) => void;
}


export {Eventful, SomeEvent};
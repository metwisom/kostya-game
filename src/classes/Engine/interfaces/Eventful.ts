import {InputMap} from '../Input/InputController';


interface SomeEvent {
  keyMap?: InputMap;
  eventType?: 'taken';
}

interface Eventful {
  readonly Event: (event: SomeEvent) => void;
}


export {Eventful, SomeEvent};
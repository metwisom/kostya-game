import {InputMap} from '../Input/InputController';
import {D2UpdatableComponent} from '../D2Updatable';
import {Gravitational} from '../../effector/effects/Gravity';


interface SomeEvent {
  keyMap?: InputMap;
  taken?: D2UpdatableComponent | D2UpdatableComponent & Gravitational;
}

interface Eventful {
  readonly Event: (event: SomeEvent) => void;
}


export {Eventful, SomeEvent};
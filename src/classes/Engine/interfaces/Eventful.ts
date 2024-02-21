import {InputMap} from '../Input/InputController';
import {Character} from '../../content/Character';
import {D2UpdatableComponent} from "../D2Updatable";
import {Gravitational} from "../../effector/effects/Gravity";


interface SomeEvent {
  keyMap?: InputMap;
  taken?: Gravitational & D2UpdatableComponent;
}

interface Eventful {
  readonly Event: (event: SomeEvent) => void;
}


export {Eventful, SomeEvent};
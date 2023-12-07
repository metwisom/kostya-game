import {InputMap} from "../Input/InputController";

interface Eventful {
  readonly Event: (keyMap: InputMap)=> void;
}


export {Eventful}
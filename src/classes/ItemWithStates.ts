import {D2Updatable} from "./D2Updatable";
import {Eventful} from "./Engine/interfaces/Eventful";
import {InputMap} from "./Engine/Input/InputController";

type FacedStates = "right" | "left";

class ItemWithStates extends D2Updatable implements Eventful {

  _state: string = "idle";

  public faced: FacedStates = "right";

  constructor() {
    super();
    //this._viewBox = new BoxTextured(0, 0, 0, 0, this);
  }

  public Event(_: InputMap) {
  }

  public set state(state: string) {
    if(this._state == state){
      return;
    }
    this._state = state;
    this.viewBox.state = state;
    // console.log(state)
  }

  public get state() {
    return this._state;
  }
}

export {ItemWithStates};

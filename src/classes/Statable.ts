import {D2Updatable} from "./D2Updatable";
import {BoxTextured} from "./Box/BoxTextured";
import {TextureBlank} from "./Texture/TextureBlank";
import {Eventful} from "./Engine/interfaces/Eventful";
import {InputMap} from "./Engine/Input/InputController";


type FacedStates = "right" | "left";

class Statable extends D2Updatable implements Eventful {

  _state: string = "idle";

  public faced: FacedStates = "right";

  constructor() {
    super();
    this._viewBox = new BoxTextured(0, 0, 0, 0, this);
    this.viewBox.setTexture(new TextureBlank(10, 10));
  }

  public Event(keyMap: InputMap) {
  }

  public set state(state: string) {
    this._state = state;
    this.viewBox.setState(state);
  }

  public get state() {
    return this._state;
  }
}

export {Statable};

import {Texture} from "./Texture";


class TextureCollection extends Texture {
  private states: Record<string, Texture> = {};
  private currentState: string;

  addState(stateName: string, texture: Texture) {
    this.states[stateName] = texture;
  }

  get() {
    // console.log(this.states[this.currentState].get())
    return this.states[this.currentState].get();
  }

  setState(stateName: string) {
    if (this.states[stateName] === undefined) {
      console.trace("StateNotFound");
      throw "";
    }
    this.currentState = stateName
  }

}

export {TextureCollection};
import {Texture} from './Texture';


class TextureCollection extends Texture {
  private states: Record<string, Texture> = {};
  private currentState: string;

  addState(stateName: string, texture: Texture) {
    this.states[stateName] = texture;
  }

  get() {
    return this.states[this.currentState].get();
  }

  set state(newState: string) {
    if (this.states[newState] === undefined) {
      console.trace('StateNotFound');
      throw '';
    }
    this.currentState = newState;
  }
}

export {TextureCollection};
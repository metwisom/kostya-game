import {Texture, TextureComponent} from './Texture';

type TextureCollectionComponent = TextureComponent & {
  states: Record<string, TextureComponent>
  currentState: string
  addState(stateName: string, texture: TextureComponent): void
}

const TextureCollection = function () {
  const parent = Texture();
  const obj: TextureCollectionComponent = {
    ...parent,
    type: 'TextureCollection',
    states: {},
    currentState: 'left_idle',
    addState(stateName: string, texture: TextureComponent) {
      this.states[stateName] = texture;
    },
    get() {
      return this.states[this.currentState].get();
    },
  };
  return obj;
};

export {TextureCollectionComponent, TextureCollection};
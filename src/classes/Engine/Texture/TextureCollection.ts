import {TextureDynamic, TextureDynamicComponent} from './TextureDynamic';

type TextureCollectionComponent = TextureDynamicComponent & {
  states: Record<string, TextureDynamicComponent>
  currentState: string
  addState(stateName: string, texture: TextureDynamicComponent): void
}

const TextureCollection = function () {
  const parent = TextureDynamic();
  const obj: TextureCollectionComponent = {
    ...parent,
    type: 'TextureCollection',
    states: {},
    currentState: 'left_idle',
    addState(stateName: string, texture: TextureDynamicComponent) {
      this.states[stateName] = texture;
    },
    get(delta: number = 1) {
      return this.states[this.currentState].get(delta);
    },
  };
  return obj;
};

export {TextureCollectionComponent, TextureCollection};
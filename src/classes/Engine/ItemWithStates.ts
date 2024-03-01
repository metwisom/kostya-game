import {D2Updatable, D2UpdatableComponent} from './D2Updatable';


type FacedStates = 'right' | 'left';

type ItemWithStatesComponent = D2UpdatableComponent & {
  getState(): string
  setState(state: string): void
  faced: FacedStates
}

const ItemWithStates = function () {
  let state: string = 'right_idle';
  const parent = D2Updatable();
  const obj: ItemWithStatesComponent = {
    ...parent,
    type: 'ItemWithStates',
    faced: 'right',
    setState(newState: string) {
      const newStateFull = this.faced + '_' + newState
      if (state == newStateFull) {
        return;
      }
      state = newStateFull
      this.viewBox.setState(newStateFull);
    },
    getState() {
      return state;
    },
  };

  return obj;
};

export {ItemWithStates, ItemWithStatesComponent};

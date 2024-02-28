import {D2Updatable, D2UpdatableComponent} from './D2Updatable';


type FacedStates = 'right' | 'left';

type ItemWithStatesComponent = D2UpdatableComponent & {
  getState(): string
  setState(state: string): void
  faced: FacedStates
}

const ItemWithStates = function () {
  let _state: string = 'right_idle';
  const parent = D2Updatable();
  const obj: ItemWithStatesComponent = {
    ...parent,
    type: 'ItemWithStates',
    faced: 'right',
    setState(state: string) {
      if (_state == state) {
        return;
      }
      _state = this.faced + '_' + state;
      this.viewBox.setState(_state);
    },
    getState() {
      return _state;
    },
  };

  return obj;
};

export {ItemWithStates, ItemWithStatesComponent};

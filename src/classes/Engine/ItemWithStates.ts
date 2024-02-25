import {D2Updatable, D2UpdatableComponent} from './D2Updatable';


type FacedStates = 'right' | 'left';

type ItemWithStatesComponent = D2UpdatableComponent & {
  getState(): string
  setState(state: string): void
  faced: FacedStates
}

const ItemWithStates = function () {

  let _state: string = 'idle';
  const obj: ItemWithStatesComponent = {
    ...D2Updatable(),
    type: 'ItemWithStates',
    faced: 'right',
    setState(state: string) {
      if (_state == state) {
        return;
      }
      _state = this.faced + '_' + state;
      this.viewBox.setState(this.faced + '_' + state);
    },
    getState() {
      return _state;
    },
  };

  return obj;
};

export {ItemWithStates, ItemWithStatesComponent};

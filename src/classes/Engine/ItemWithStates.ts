import {D2Updatable, D2UpdatableComponent} from './D2Updatable';


type FacedStates = 'right' | 'left';

type ItemWithStatesComponent = D2UpdatableComponent & {
  state: string
  faced: FacedStates
}

const ItemWithStates = function () {

  let _state: string = 'idle';
  const obj: ItemWithStatesComponent = {
    ...D2Updatable(),
    faced: 'right',
    set state(state: string) {
      if (_state == state) {
        return;
      }
      _state = state;
      this.viewBox.state = state;
    },
    get state() {
      return _state;
    },
  };

  return obj;
};

export {ItemWithStates, ItemWithStatesComponent};

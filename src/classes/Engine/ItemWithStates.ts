import {D2Updatable} from './D2Updatable';

type FacedStates = 'right' | 'left';

class ItemWithStates extends D2Updatable {

  _state: string = 'idle';

  public faced: FacedStates = 'right';

  constructor() {
    super();
    //this._viewBox = new BoxTextured(0, 0, 0, 0, this);
  }

  public set state(state: string) {
    if (this._state == state) {
      return;
    }
    this._state = state;
    this.viewBox.state = state;
  }

  public get state() {
    return this._state;
  }
}

export {ItemWithStates};

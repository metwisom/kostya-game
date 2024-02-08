export enum GameKeys {
  A,
  D,
  C,
  Space,
  LEFT_MOUSE
}

class InputKey {
  _status = false;
  keyName: GameKeys;
  private propagation: boolean = true;
  public position = {
    x: 0,
    y: 0,
  };

  status(abs = false) {
    if (this.propagation || abs) {
      return this._status;
    }
    return false;
  }

  constructor(keyName: GameKeys) {
    this.keyName = keyName;
  }


  set(newStatus: boolean, propagation = true) {
    this.propagation = propagation;
    this._status = newStatus;
  }
}

export {InputKey};
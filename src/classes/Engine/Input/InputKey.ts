export enum GameKeys {
  A,
  D,
  C,
  Space,
  LEFT_MOUSE,
  SHIFT
}

class InputKey {
  _status = false;
  keyName: GameKeys;
  public position = {
    x: 0,
    y: 0,
  };
  private propagation: boolean = true;

  constructor(keyName: GameKeys) {
    this.keyName = keyName;
  }

  status(abs = false) {
    if (this.propagation || abs) {
      return this._status;
    }
    return false;
  }

  set(newStatus: boolean, propagation = true) {
    this.propagation = propagation;
    this._status = newStatus;
  }
}

export {InputKey};
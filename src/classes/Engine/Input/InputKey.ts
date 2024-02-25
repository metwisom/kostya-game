export enum GameKeys {
  A,
  D,
  C,
  Space,
  LEFT_MOUSE,
  SHIFT
}

type InputKeyComponent = {
  _status: boolean
  keyName: GameKeys
  position: {
    x: number,
    y: number,
  }
  propagation: boolean
  status(abs: boolean): boolean
  set(newStatus: boolean, propagation: boolean): void
}

const InputKey = function (keyName: GameKeys) {

  const obj: InputKeyComponent = {
    _status: false,
    position: {
      x: 0,
      y: 0,
    },
    keyName: keyName,
    propagation: true,
    status(abs = false) {
      if (this.propagation || abs) {
        return this._status;
      }
      return false;
    },
    set(newStatus: boolean, propagation = true) {
      this.propagation = propagation;
      this._status = newStatus;
    },
  };
  return obj;
};

export {InputKey, InputKeyComponent};
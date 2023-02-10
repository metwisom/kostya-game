class KeyboardKey {
  status = false;
  _pressed = false;

  get pressed(){
    const status = this._pressed;
    this._pressed = false;
    return status;
  }

  set(newStatus: boolean) {
    if (newStatus != this.status && newStatus == true) {
      this._pressed = true;
    }
    this.status = newStatus;
  }
}

export {KeyboardKey};
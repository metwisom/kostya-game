import createVirtualPoint from "../../utils/createVirtualPoint";
import GameObject from "../GameObject";
import Keyboard, { _Keyboard } from "./Keyboard";
import Physics from "./Physics";

class _Camera {

  private attached: GameObject;
  private customAttach = false;

  get target() {
    return this.attached;
  }

  get x() {
    return this?.attached.x;
  }

  get y() {
    return this?.attached.y;
  }

  private virtualAttach() {
    this.attached = createVirtualPoint();
    this.customAttach = true;
    Keyboard.attach(this.attached);
    Physics.addObject(this.attached);
  }

  attach(obj: GameObject | _Keyboard) {
    if (obj instanceof _Keyboard) {
      this.virtualAttach();

      return;
    }
    this.attached = obj;
  }

  unAttach() {
    if (this.customAttach) {
      Keyboard.unAttach();
      Physics.removeObject(this.attached);
      this.customAttach = false;
    }
    this.attached = undefined;
  }
}

const Camera = new _Camera();

export default Camera;

export { _Camera };

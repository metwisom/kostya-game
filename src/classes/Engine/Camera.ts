import createVirtualPoint from "../../utils/createVirtualPoint";
import GameObject from "../GameObject";
import Keyboard, { _Keyboard } from "./Keyboard";
import Physics from "./Physics";

// tslint:disable-next-line: class-name
class _Camera {

  private attached: GameObject;
  private customAttach: boolean = false;

  get target() {
    return this.attached;
  }

  get x() {
    return this?.attached.x;
  }

  get y() {
    return this?.attached.y;
  }

  attach(obj: GameObject | _Keyboard) {
    if (obj instanceof GameObject) {
      this.attached = obj;
    }
    if (obj instanceof _Keyboard) {
      this.attached = createVirtualPoint();
      this.customAttach = true;
      Keyboard.attach(this.attached);
      Physics.addObject(this.attached);
    }
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

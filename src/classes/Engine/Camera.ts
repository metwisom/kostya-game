import GameObject from "../GameObject";

class _Camera {

    attached: GameObject;

    attach(obj: GameObject) {
        this.attached = obj
    }
}

let Camera = new _Camera()

export default Camera;

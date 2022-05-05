import DrawObject from "./DrawObject";
import Sprite from "./Sprite";

class Structure extends DrawObject {
    constructor(x, y, objects) {
        super(objects)
        this.faced = 1;
        this.state = 'idle';
        this.sprites = {
            'idle': new Sprite(1, 'block.png', 0)
        }
        this.x = x;
        this.y = y
        this.mass = 0;
        this.height = 100;
        this.width = 100;
    }
}

export default Structure;
import Camera from "./Engine/Camera";
import Display from "./Engine/Display";
import GameObject from "./GameObject";

class Parallax extends GameObject {

    fon: HTMLImageElement;
    bias: number;

    constructor(image: string, bias: number) {


        super();
        this.fon = new Image();
        this.fon.src = image;

        this.bias = bias;

        /*this.faced = 1;
        this.state = 'idle';
        this.sprites = {
            'idle': new Sprite(1, 'block.png', 0)
        }
        this.x = x;
        this.y = y
        this.mass = 0;
        this.height = 100;
        this.width = 100;*/
    }


    draw(scene: CanvasRenderingContext2D) {
        let coef = Display.height / this.fon.height
        let pass = (Camera.attached.x * (this.bias / 10)) % (this.fon.width * coef)
        scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass - (this.fon.width * coef), 0, this.fon.width * coef, Display.height)
        scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass, 0, this.fon.width * coef, Display.height)
        scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass + (this.fon.width * coef), 0, this.fon.width * coef, Display.height)
        scene.drawImage(this.fon, 0, 0, this.fon.width, this.fon.height, -pass + (this.fon.width * coef) * 2, 0, this.fon.width * coef, Display.height)
    }
}

export default Parallax;
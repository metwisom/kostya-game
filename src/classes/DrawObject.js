import Camera from "./Engine/Camera";
import Character from "./Character";

class DrawObject {
    constructor() {
        this.id = Math.random().toString(16).slice(2);
    }
    draw(scene) {
        let sprite = this.sprites[this.state];
        scene.fillStyle = '#000'
        scene.imageSmoothingEnabled = false;
        let coef = this.height / sprite.image[this.faced].height;

        let sizeW = sprite.image[this.faced].width * coef / sprite.max
        let sizeH = this.height

        scene.translate(display.width / 2, display.height / 2);
        scene.translate(-Camera.attached.x, -Camera.attached.y);

        let x = this.x - sizeW / 2
        let y = this.y - Camera.attached.height / 2
        
        scene.drawImage(
            sprite.image[this.faced],

            sprite.image[this.faced].width / (sprite.max) * Math.floor(sprite.cur),
            0,

            sprite.image[this.faced].width / (sprite.max),
            sprite.image[this.faced].height,

            x,
            y,

            sprite.image[this.faced].width * coef / (sprite.max),
            this.height
        );
        scene.resetTransform()
        sprite.update()
    }
}

export default DrawObject;
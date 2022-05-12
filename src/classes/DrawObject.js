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
        let coef = this.height / sprite.image.height;

        let sizeW = sprite.image.width * coef / sprite.max
        let sizeH = this.height

        scene.translate(display.width / 2, display.height / 2);
        if (this.faced == 0) {
            scene.scale(-1, 1);
        }
        let x = this.x - Camera.attached.x - sizeW / 2
        let y = this.y - Camera.attached.y
        scene.drawImage(
            sprite.image,

            sprite.image.width / (sprite.max) * Math.floor(sprite.cur),
            0,

            sprite.image.width / (sprite.max),
            sprite.image.height,

            x,
            y,

            sprite.image.width * coef / (sprite.max),
            this.height
        );
        if (this instanceof Character)
            //scene.fillRect(x,y,this.width,this.height)
            this.width = sprite.image.width * coef / (sprite.max);
        scene.resetTransform()
        sprite.update()
        //scene.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
    }
}

export default DrawObject;
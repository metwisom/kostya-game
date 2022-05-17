import getRandom from "../utils/getRandom";

class Sprite {

    cur: number = 0;
    speed: number;
    max: number;
    image: (HTMLImageElement | HTMLCanvasElement)[];

    constructor(max: number, src: string, speed: number) {
        this.speed = speed
        this.max = max;
        this.image = [];
        const tmp_img = new Image();
        tmp_img.src = 'resources/' + src;
        tmp_img.onload = () => {
            this.image[1] = tmp_img;

            const canvasTmp = document.createElement("canvas");
            canvasTmp.width = tmp_img.width
            canvasTmp.height = tmp_img.height
            const secondaryCtx = canvasTmp.getContext("2d");
            secondaryCtx.scale(-1, 1);
            secondaryCtx.translate(-tmp_img.width, 0);
            secondaryCtx.drawImage(tmp_img, 0, 0);

            this.image[0] = <HTMLImageElement><unknown>canvasTmp;
        }
    }
    update() {
        this.cur += this.speed
        if (this.cur > this.max) {
            this.cur = 0;
        }
    }
}

export default Sprite;
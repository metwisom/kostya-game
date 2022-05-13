class Sprite {
    constructor(max, src, speed) {
        this.cur = 0;
        this.speed = speed
        this.max = max;
        this.image = [];
        this.tmp_img = new Image();
        this.tmp_img.src = 'resources/' + src;
        this.tmp_img.onload = () => {
            this.image[1] = this.tmp_img;
            this.image[0] = document.createElement("canvas");
            this.image[0].width = this.tmp_img.width
            this.image[0].height = this.tmp_img.height
            const secondaryCtx = this.image[0].getContext("2d");
            secondaryCtx.scale(-1, 1);
            secondaryCtx.translate(-this.tmp_img.width, 0);
            secondaryCtx.drawImage(this.tmp_img, 0, 0)
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
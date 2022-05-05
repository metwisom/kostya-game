class Sprite {
    constructor(max, src, speed) {
        this.cur = 0;
        this.speed = speed
        this.max = max;
        this.image = new Image();
        this.image.src = 'resources/' + src;
    }
    update() {
        this.cur += this.speed
        if (this.cur > this.max) {
            this.cur = 0;
        }
    }
}

export default Sprite;
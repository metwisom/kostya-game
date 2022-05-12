class DisplayAddons {
    constructor() {
        this.postCb = []
    }

    add(postCb) {
        this.postCb.push((scene) => postCb(scene))
    }

    postWork(scene) {
        this.postCb.map(cb => cb(scene))
    }
}

export default DisplayAddons;
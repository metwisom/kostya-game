class DisplayAddons {

  private postCb: CallableFunction[] = [];

  add(postCb: CallableFunction) {
    this.postCb.push((scene: CanvasRenderingContext2D) => postCb(scene));
  }

  run(scene: CanvasRenderingContext2D) {
    this.postCb.map(cb => cb(scene));
  }
}

export {DisplayAddons};

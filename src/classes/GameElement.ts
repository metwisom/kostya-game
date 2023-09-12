export default class GameElement {

  private isDestroyed = false;


  isActual() {
    return !this.isDestroyed;
  }

  draw(scene: CanvasRenderingContext2D) {
  }

  update(delta: number) {
  }


  destroy() {
    this.isDestroyed = true;
  }
}
class Display {
  constructor(id) {
    this.display = document.getElementById(id);
  }
  createScene() {
    return this.display.getContext('2d');
  }
}

export default Display;
const CanvasStore = (function () {
  const store: HTMLCanvasElement[] = [];

  return Object.freeze({
    get(): HTMLCanvasElement {
      return store.pop() || document.createElement("canvas");
    },
    release(element: HTMLCanvasElement) {
      store.push(element);
    },
    get count() {
      return store.length;
    }
  });
})();

export {CanvasStore};
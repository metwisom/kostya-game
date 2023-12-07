const CanvasStore = (function () {
  const store: HTMLCanvasElement[] = [];

  return Object.freeze({
    get(): HTMLCanvasElement {
      const item = store.pop();
      if (item === undefined) {
        return document.createElement("canvas");
      }
      return item;
    },
    release(element: HTMLCanvasElement) {
      store.push(element);
    },
    count() {
      return store.length;
    }
  });
})();

export {CanvasStore};
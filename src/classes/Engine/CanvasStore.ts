type CanvasStore = {
  readonly count: number
  get(): HTMLCanvasElement
  release(element: HTMLCanvasElement): void
}

const CanvasStore = (function () {
  const store: HTMLCanvasElement[] = [];

  const canvasStore: CanvasStore = Object.create(null);

  Object.defineProperty(canvasStore, 'count', {
    get: function () {
      return store.length;
    },
  });

  canvasStore.get = (): HTMLCanvasElement => {
    if (store.length < 100) {
      for (let i = 0; i < 100 - store.length; i++) {
        store.push(document.createElement('canvas'));
      }
    }
    return store.shift() || document.createElement('canvas');
  };

  canvasStore.release = (element: HTMLCanvasElement) => {
    store.push(element);
  };


  return Object.freeze(canvasStore);
})();

export {CanvasStore};
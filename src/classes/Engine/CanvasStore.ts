type CanvasStore = {
  readonly count: number;
  get(): HTMLCanvasElement;
  release(element: HTMLCanvasElement): void;
}

const CanvasStore = (() => {
  const store: HTMLCanvasElement[] = [];

  const canvasStore: CanvasStore = {} as CanvasStore;

  Object.defineProperty(canvasStore, 'count', {
    get: () => store.length,
  });

  canvasStore.get = (): HTMLCanvasElement => {
    if (store.length < 100) {
      store.push(...new Array(100 - store.length).fill(null).map(() => document.createElement('canvas')));
    }
    return store.shift() ?? document.createElement('canvas');
  };

  canvasStore.release = (element: HTMLCanvasElement) => {
    store.push(element);
  };

  return canvasStore as Readonly<CanvasStore>;
})();

export {CanvasStore};

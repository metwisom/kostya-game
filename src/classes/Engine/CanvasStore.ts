const CanvasStore = (function () {
  const store: HTMLCanvasElement[] = [];

  return Object.freeze({
    get(): HTMLCanvasElement {
      if(store.length < 100){
        for(let i =0;i< 100 - store.length;i++){
          store.push(document.createElement("canvas"));
        }
      }
      return store.shift() || document.createElement("canvas");
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
const PerfTest = (function () {
  let startDraw = 0;
  let drawTime = 0;

  return Object.freeze({
    start() {
      startDraw = performance.now();
    },
    stop() {
      drawTime = performance.now() - startDraw;
    },
    get() {
      return drawTime;
    },
  });
})();

export {PerfTest};

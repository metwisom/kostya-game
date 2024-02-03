const customRequestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60);
const requestAnimationFrame = (() => window.requestAnimationFrame || customRequestAnimationFrame)();

export {requestAnimationFrame};

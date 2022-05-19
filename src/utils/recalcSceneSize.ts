import Display, { _Display } from "../classes/Engine/Display";

const recalcSceneSize = () => {
  const { width, height } = Display.canvas.getBoundingClientRect();
  Display.width = width;
  Display.height = height;
};

export default recalcSceneSize;

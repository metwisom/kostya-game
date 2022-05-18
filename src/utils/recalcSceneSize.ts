import Display, { _Display } from "../classes/Engine/Display";

const recalcSceneSize = () => {
  const displayParams = Display.display.getBoundingClientRect();
  Display.display.width = displayParams.width;
  Display.display.height = displayParams.height;
};

export default recalcSceneSize;

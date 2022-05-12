function recalcSceneSize(display) {
    let display_params = display.display.getBoundingClientRect();
    display.display.width = display_params.width;
    display.display.height = display_params.height;
}

export default recalcSceneSize;
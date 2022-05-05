function recalcSceneSize() {
    let display_params = display.getBoundingClientRect();
    display.width = display_params.width;
    display.height = display_params.height;
}

export default recalcSceneSize;
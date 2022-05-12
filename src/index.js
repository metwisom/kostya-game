import Camera from "./classes/Camera";
import Character from "./classes/Character";
import Display from "./classes/Display";
import Keyboard from "./classes/Keyboard";
import Structure from "./classes/Structure";
import draw from "./draw";
import gravity from "./gravity";
import recalcSceneSize from "./utils/recalcSceneSize";

var display;
var scene;
const objects = []


document.addEventListener('DOMContentLoaded', () => {
    display = new Display('display');
    scene = display.createScene();
    recalcSceneSize(display);
    draw(display, scene, objects);
    gravity(objects)
})

window.addEventListener('resize', () => {
    recalcSceneSize(display);
})


const keyboard_controller = new Keyboard(objects);

for (let i = 0; i < 100; i++)
    new Structure(50 + i * 250, 300, objects)

let Kostya = new Character(100, 100, objects);
Kostya.setController(keyboard_controller)
Camera.attach(Kostya);

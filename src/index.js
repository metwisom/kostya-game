import Camera from "./classes/Camera";
import Character from "./classes/Character";
import Keyboard from "./classes/Keyboard";
import Structure from "./classes/Structure";
import intersectRect from "./utils/intersectRect";
import recalcSceneSize from "./utils/recalcSceneSize";
import requestAnimationFrame from "./utils/requestAnimationFrame";

var display;
var scene;


document.addEventListener('DOMContentLoaded', () => {
    display = document.getElementById('display');
    scene = display.getContext('2d');
    recalcSceneSize();
    draw();
})

window.addEventListener('resize', () => {
    recalcSceneSize();
})

const objects = []

let fon = []

fon[1] = new Image();
fon[1].src = 'resources/plx-1.png';

fon[2] = new Image();
fon[2].src = 'resources/plx-2.png';

fon[3] = new Image();
fon[3].src = 'resources/plx-3.png';

fon[4] = new Image();
fon[4].src = 'resources/plx-4.png';

fon[5] = new Image();
fon[5].src = 'resources/plx-5.png';

function draw() {
    scene.fillStyle = '#f00'
    scene.fillRect(0, 0, display.width, display.height);

    for (let i = 1; i < 6; i++) {
        let fone = fon[i]
        let coef = display.height / fone.height
        let pass = (Camera.attached.x * (i / 10)) % (fone.width * coef)
        scene.drawImage(fone, 0, 0, fone.width, fone.height, -pass - (fone.width * coef), 0, fone.width * coef, display.height)
        scene.drawImage(fone, 0, 0, fone.width, fone.height, -pass, 0, fone.width * coef, display.height)
        scene.drawImage(fone, 0, 0, fone.width, fone.height, -pass + (fone.width * coef), 0, fone.width * coef, display.height)
        scene.drawImage(fone, 0, 0, fone.width, fone.height, -pass + (fone.width * coef) * 2, 0, fone.width * coef, display.height)
    }

    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        object.draw(scene)
    }

    requestAnimationFrame(draw)
}



function gravity() {
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (object.mass == 0) {
            continue;
        }
        if (object.e_down < 0) {
            object.y += object.e_down
            object.e_down += object.mass
        }
        let new_y = object.y + object.e_down
        let inter = objects.filter(e => {
            if (e == object) {
                return;
            }
            return intersectRect(
                { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height },
                { left: object.x, top: new_y, right: object.x + object.width, bottom: new_y + object.height },
            )

        })
        if (inter.length == 0) {
            object.y += object.e_down

            object.state = 'fall';
            object.e_down += object.mass
        } else {
            object.state = 'landing';
            object.e_down = 0
            object.may_ground = true;
        }

    }

    requestAnimationFrame(gravity)
}
requestAnimationFrame(gravity)


const keyboard_controller = new Keyboard(objects);

for (let i = 0; i < 100; i++)
    new Structure(50 + i * 250, 300, objects)

let Kostya = new Character(100, 100, objects);
Kostya.setController(keyboard_controller)
Camera.attach(Kostya);

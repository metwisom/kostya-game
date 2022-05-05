import Camera from "./classes/Camera";
import requestAnimationFrame from "./utils/requestAnimationFrame";

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

function draw(display, scene, objects) {
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

    requestAnimationFrame(() => draw(display, scene, objects))
}

export default draw;
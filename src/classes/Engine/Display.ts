import {Layer} from "./Layer";
import {requestAnimationFrame} from "../../utils/requestAnimationFrame";
import {DisplayAddons} from "./DisplayAddons";
import {Camera} from "./Camera";
import {D2Drawable} from "../D2Drawable";
import Element from "./Gui/Element";


const Display = (function () {

    const removeList: D2Drawable[] = [];
    let layers: Layer[] = [];
    let gui: D2Drawable[] = [];
    let addons: DisplayAddons = new DisplayAddons();
    let display: HTMLCanvasElement;
    let scene: CanvasRenderingContext2D;


    const recalculateSceneSize = () => {
        const {width, height} = display.getBoundingClientRect();
        display.width = width;
        display.height = height;
        scene = display.getContext("2d");
        scene.imageSmoothingEnabled = false;
        scene.fillStyle = "#000";
    }

    const cleanUp = () => {
        removeList.map(item => layers.map(layer => layer.removeObject(item)))
        removeList.length = 0;
    }
    let i = 0
    const drawCollection = (collection: D2Drawable[]) => {
        collection.map(item => {
            if (!item.isActual()) {
                return removeList.push(item);
            }
            const viewBox = item.draw();


            // console.log(Camera.x)

            scene.drawImage(viewBox.texture.get(),
                0, 0,
                viewBox.texture.get().width,
                viewBox.texture.get().height,
                viewBox.x,
                viewBox.y,
                viewBox.width,
                viewBox.height);
        });

    }

    return Object.freeze({
        get layers(){return layers},
        get addons(){return addons},
        get display(){return display},
        addObject(obj: D2Drawable, layer: number = 0) {
            if (obj instanceof Element) {
                gui.push(obj);
            } else {
                if (layers[layer] === undefined) {
                    layers[layer] = new Layer();
                }
                layers[layer].addObject(obj);
            }
        },
        attach(canvas: HTMLCanvasElement) {
            display = canvas;
            recalculateSceneSize();
            window.removeEventListener("resize", recalculateSceneSize);
            window.addEventListener("resize", recalculateSceneSize);
        },
        start() {

            const draw = () => {
                // console.log(display.width)
                scene.translate(
                    display.width / 2 - Camera.x,
                    display.height / 2 - Camera.y + Camera.target.viewBox.height / 2);

                drawCollection([].concat(...layers.map(layer => layer.items).filter(i => i)));

                scene.resetTransform();

                drawCollection(gui);

                addons.run(scene);
                requestAnimationFrame(draw);
                cleanUp();
            };

            draw();
        }
    })


})();

export {Display};

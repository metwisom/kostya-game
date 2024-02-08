import fetch from 'node-fetch';
import {BackgroundEntity, ButtonEntity, GameMap, MapEntity} from './iMap';
import {Structure} from '../../content/Structure';
import {Engine} from '../Engine';
import {Parallax} from '../../content/Parallax';
import {D2Drawable} from '../D2Drawable';
import {D2Updatable} from '../D2Updatable';
import {Character} from '../../content/Character';
import {Camera} from '../Camera';
import {InputController} from '../Input/InputController';
import {Item} from '../../content/Item';
import {FakeAnimate} from '../../content/FakeAnimate';
import {Button} from '../Gui/Button';
import {FloatX, FloatY} from '../Gui/Element';
import {Mouse} from '../Input/Mouse';
import {GameKeys} from '../Input/InputKey';
import {RainEngine} from '../RainEngine';

class _MapLoader {

  Map: Array<D2Drawable[]> = [];

  async load(resourceMap: string) {
    const readyMapList: MapEntity[] = [];
    const readyPickupList: MapEntity[] = [];
    const readyButtonList: ButtonEntity[] = [];
    const readyParallaxList: BackgroundEntity[] = [];


    await fetch(resourceMap)
    .then(res => res.json())
    .then((data: GameMap) => {
      data.map?.map((item) =>
        readyMapList.push(item),
      );
      data.pickup?.map((item) =>
        readyPickupList.push(item),
      );
      data.buttons?.map((item) =>
        readyButtonList.push(item),
      );
      data.background.items.map((item) =>
        readyParallaxList.push(item),
      );
      if(data.spawnPoint.fakeAnimate){
        const fake = new FakeAnimate(data.spawnPoint.x, data.spawnPoint.y);
        Engine.addObject(fake, 2);
        Engine.addObjectPhys(fake);
        Camera.attach(fake);
      }else {
        const Kostya = new Character(data.spawnPoint.x, data.spawnPoint.y);
        Engine.addObject(Kostya, 2);
        Engine.addObjectPhys(Kostya);
        InputController.setSlave(Kostya);
        Camera.attach(Kostya);
      }
    });


    readyPickupList.map(item => {
      let someObject: D2Updatable = undefined;
      switch (item.type) {
        case 'health':
          someObject = new Item(item.x, item.y);
          break;
      }
      Engine.addObject(someObject, 1);
      Engine.addObjectPhys(someObject);
      this.set(item.x, item.y, someObject);
    })

    readyButtonList.map(item => {
      const button = new Button(item.x, item.y, item.width, item.height, item.text);
      button.floatX = FloatX[item.floatX];
      button.floatY = FloatY[item.floatY];
      button.viewBox.texture.setFont('50px monospace')
      Engine.addObject(button);
      Mouse.addObject(button);
      if(item.action.loadMap != undefined){
        button.ownEvent = async (e) => {
          if (e.keyMap[GameKeys.LEFT_MOUSE].status(true)) {
            RainEngine.stop()
            Engine.clearLayers()
            Engine.clearGui()
            Engine.cleanUp()
            Mouse.removeObject(button)
            setTimeout(() => {
              MapLoader.load('/resources/' + item.action.loadMap);
            },1)

          }
        };
      }

    })

    readyMapList.map(item => {
      let someObject: D2Updatable = undefined;
      switch (item.type) {
        case 'ground':
          someObject = new Structure(item.x, item.y);
          break;
      }
      Engine.addObject(someObject, 1);
      Engine.addObjectPhys(someObject);
      this.set(item.x, item.y, someObject);
      return someObject;
    }).map(i => {
      if (i instanceof Structure) {
        i.refreshSprite();
      }
    });

    readyParallaxList.map((item, index) => {
      const plx0 = new Parallax(item.image, readyParallaxList.length - 1 - index);
      plx0.setOriginX(-plx0.draw().width);
      Engine.addObject(plx0, 0);

      const plx1 = new Parallax(item.image, readyParallaxList.length - 1 - index);
      Engine.addObject(plx1, 0);

      const plx2 = new Parallax(item.image, readyParallaxList.length - 1 - index);
      plx2.setOriginX(plx1.draw().width);
      Engine.addObject(plx2, 0);
    });
    // this.refreshTextures();
  }

  set(x: number, y: number, object: D2Drawable) {
    if (this.Map[x] == undefined) {
      this.Map[x] = [];
    }
    this.Map[x][y] = object;
  }

  get(x: number, y: number) {
    if (this.Map[x] == undefined) {
      return undefined;
    }
    return this.Map[x][y];
  }

}

const MapLoader = new _MapLoader();

export {MapLoader};
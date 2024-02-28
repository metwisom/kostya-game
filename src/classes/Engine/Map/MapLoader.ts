import {BackgroundEntity, ButtonEntity, GameMap, MapEntity} from './iMap';
import {Structure, StructureComponent} from '../../content/Structure';
import {Engine} from '../Engine';
import {Parallax} from '../../content/Parallax';
import {D2DrawableComponent} from '../D2Drawable';
import {D2UpdatableComponent} from '../D2Updatable';
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
import {loadFile} from '../../../utils/loadFile';

type MapLoaderComponent = {
  Map: Array<D2DrawableComponent[]>
  load(resourceMap: string): Promise<void>
  sets(x: number, y: number, object: D2DrawableComponent): void
  gets(x: number, y: number): D2DrawableComponent | undefined
}

const MapLoader = (function () {

  const obj: MapLoaderComponent = {
    Map: [],
    async load(resourceMap: string) {
      const readyMapList: MapEntity[] = [];
      const readyPickupList: MapEntity[] = [];
      const readyButtonList: ButtonEntity[] = [];
      const readyParallaxList: BackgroundEntity[] = [];


      await loadFile<GameMap>(resourceMap)
      .then(data => {
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
        if (data.spawnPoint.fakeAnimate) {
          const fake = FakeAnimate();
          Engine.addObject(fake, 2);
          Engine.addObjectPhys(fake);
          Camera.attach(fake);
        } else {
          const Kostya = Character(data.spawnPoint.x, data.spawnPoint.y);
          Engine.addObject(Kostya, 2);
          Engine.addObjectPhys(Kostya);
          InputController.setSlave(Kostya);
          Camera.attach(Kostya);
        }
      });


      readyPickupList.map(item => {
        let someObject: D2UpdatableComponent = undefined;
        switch (item.type) {
          case 'health':
            someObject = Item(item.x, item.y);
            break;
        }
        Engine.addObject(someObject, 1);
        Engine.addObjectPhys(someObject);
        this.sets(item.x, item.y, someObject);
      });

      readyButtonList.map(item => {
        const button = Button(item.x, item.y, item.width, item.height, item.text);
        button.setFloatX(FloatX[item.floatX]);
        button.setFloatY(FloatY[item.floatY]);
        // button.viewBox.texture.setFont('50px Press');
        Engine.addObject(button);
        Mouse.addObject(button);
        if (item.action.loadMap != undefined) {
          button.ownEvent(async (e) => {
            if (e.keyMap[GameKeys.LEFT_MOUSE].status(true)) {
              RainEngine.stop();
              Engine.clearLayers();
              Engine.clearGui();
              Engine.cleanUp();
              Mouse.removeObject(button);
              setTimeout(() => {
                this.load('/resources/' + item.action.loadMap);
              }, 1);

            }
          });
        }

      });

      readyMapList.map(item => {
        let someObject: D2UpdatableComponent = undefined;
        switch (item.type) {
          case 'ground':
            someObject = Structure(item.x, item.y);
            break;
        }
        Engine.addObject(someObject, 1);
        Engine.addObjectPhys(someObject);
        this.sets(item.x, item.y, someObject);
        return someObject;
      }).map(i => {
        if ((i as StructureComponent).refreshSprite != null) {
          (i as StructureComponent).refreshSprite();
        }
      });

      readyParallaxList.map((item, index) => {
        const plx0 = Parallax(item.image, readyParallaxList.length - 1 - index);
        plx0.originX = -plx0.draw().width;
        Engine.addObject(plx0, 0);

        const plx1 = Parallax(item.image, readyParallaxList.length - 1 - index);
        Engine.addObject(plx1, 0);

        const plx2 = Parallax(item.image, readyParallaxList.length - 1 - index);
        plx2.originX = plx1.draw().width;
        Engine.addObject(plx2, 0);
      });
      // this.refreshTextures();
    },
    sets(x: number, y: number, object: D2DrawableComponent) {
      if (this.Map[x] == undefined) {
        this.Map[x] = [];
      }
      this.Map[x][y] = object;
    },
    gets(x: number, y: number) {
      if (this.Map[x] == undefined) {
        return undefined;
      }
      return this.Map[x][y];
    },
  };
  return obj;

})();


export {MapLoader};
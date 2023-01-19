import fetch from "node-fetch";
import {BackgroundEntity, GameMap, MapEntity} from "./iMap";
import {Structure} from "../../content/Structure";
import {Display} from "../Display";
import {Physics} from "../Physics";
import {Entity} from "../../Entity";
import {Parallax} from "../../content/Parallax";

class _MapLoader {

  Map: Array<Entity[]> = [];

  async load(resourceMap: string) {
    const readyMapList: MapEntity[] = [];
    const readyParallaxList: BackgroundEntity[] = [];

    await fetch(resourceMap)
      .then(res => res.json())
      .then((data: GameMap) => {
        data.map.map((item) =>
          readyMapList.push(item)
        );
        data.background.items.map((item) =>
          readyParallaxList.push(item)
        );
      });

    readyMapList.map(item => {
      let someObject = undefined;
      switch (item.type) {
      case "ground":
        someObject = new Structure(item.x, item.y);
        break;
      }
      Display.addObject(someObject, 1);
      Physics.addObject(someObject);
      this.set(item.x, item.y, someObject);
    });
    readyParallaxList.map(item => {
      const plx1 = new Parallax(item.image, item.bias);
      Display.addObject(plx1,0);
    });
    this.refreshTextures();
  }

  refreshTextures() {
    this.Map.map(line => line.map(item => item.refreshSprite()));
  }

  set(x: number, y: number, object: Entity) {
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
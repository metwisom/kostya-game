import fetch from "node-fetch";
import {MapItem} from "./iMap";
import Structure from "../../content/Structure";
import Display from "../Display";
import Physics from "../Physics";
import GameObject from "../../GameObject";

class _MapLoader {

  Map: Array<GameObject[]> = [];

  async load(resourceMap: string) {
    const readyList: MapItem[] = [];

    await fetch(resourceMap)
      .then(res => res.json())
      .then((data: MapItem[]) => {
        data.map((item) =>
          readyList.push(item)
        );
      });

    readyList.map(item => {
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
    this.refreshTextures();
  }

  refreshTextures() {
    this.Map.map(line => line.map(item => item.refreshSprite()));
  }

  set(x: number, y: number, object: GameObject) {
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

export default MapLoader;
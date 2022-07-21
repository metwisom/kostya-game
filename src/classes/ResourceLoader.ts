import Sprites from "./Sprites";
import fetch from "node-fetch";

class _ResourceLoader {

  resourceList: Record<string, Sprites>;
  resourceMap: Record<string, HTMLImageElement> = {};

  async load(resourceMap: string) {
    const list = <string[]>await fetch(resourceMap)
      .then(res => res.json());

    const readyList: Promise<[string, HTMLImageElement]>[] = [];

    list.map((item) => {
      readyList.push(new Promise((res) => {
        const tmpImg = new Image();
        tmpImg.src = "resources/" + item;
        tmpImg.onload = () => {
          res([item, tmpImg]);
        };
      }));
    });

    (await Promise.all(readyList)).map(item => {
      const key = item[0];
      this.resourceMap[key] = item[1];
    });

    console.trace(this.resourceMap);
  }

  get(name: string) {
    console.trace("get", name, this.resourceMap[name]);
    return this.resourceMap[name];
  }
}

const ResourceLoader = new _ResourceLoader();

export default ResourceLoader;
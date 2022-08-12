import fetch from "node-fetch";
import {Resource} from "./iResource";

class _ResourceLoader {

  resources: Record<string, Resource> = {};

  async load(resourceMap: string) {
    const readyList: Promise<Resource>[] = [];

    await fetch(resourceMap)
      .then(res => res.json())
      .then((data: Resource[]) => {
        data.map((item) =>
          readyList.push(
            new Promise((res) => {
              item.image = new Image();
              item.image.onload = () => res(item);
              item.image.src = "resources/" + item.file;
            }))
        );
      });

    await Promise.all(readyList)
      .then(list => list.map(item => {
        const key = item.file;
        this.resources[key] = item;
      }));
  }

  get(name: string) {
    return this.resources[name];
  }
}

const ResourceLoader = new _ResourceLoader();

export default ResourceLoader;
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
              item.image.src = "resources/" + item.path + item.file;
            }))
        );
      });

    await new FontFace(
      "Press",
      "url(https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nRivN04w.woff2)"
    ).load();
    await new FontFace(
      "Press",
      "url(https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2)"
    ).load();

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

export {ResourceLoader};
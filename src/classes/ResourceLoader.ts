import Sprites from "./Sprites";

import fetch from "node-fetch";

class _ResourceLoader {

  resourceList: Record<string, Sprites>;
  resourceMap: Record<string, object>;

  async loadResource(resourceMap: string) {
    console.log("http://gg.prog3.airnet.ru/" + resourceMap);
    this.resourceMap = <Record<string, object>>(await fetch("http://gg.prog3.airnet.ru/" + resourceMap)
      .then(res => res.json()));

  }
}

const Resources = new _ResourceLoader();

export default Resources;
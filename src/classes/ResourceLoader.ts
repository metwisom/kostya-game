import * as fs from "fs";
import Sprites from "./Sprites";

class ResourceLoader {

  resourceList: Record<string, Sprites>;
  resourceMap: Record<string, object>;

  constructor(resourceMap: string) {
    const rawdata = fs.readFileSync(resourceMap, "utf8");
    this.resourceMap = JSON.parse(rawdata);
  }
}

export default ResourceLoader;
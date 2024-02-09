import {Resource} from './iResource';
import {loadFile} from '../../../utils/loadFile';


const ResourceLoader = (function () {

  const resources: Record<string, Resource> = {};

  return Object.freeze({
    load: async function (resourceMap: string) {
      const readyList: Promise<Resource>[] = [];

      await loadFile<Resource[]>(resourceMap)
      .then(data => {
        data.map((item) =>
          readyList.push(
            new Promise((res) => {
              item.image = new Image();
              item.image.onload = () => res(item);
              item.image.src = 'resources/' + item.path + item.file;
            })),
        );
      });

      await new FontFace(
        'Press',
        'url(https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nRivN04w.woff2)',
      ).load();
      await new FontFace(
        'Press',
        'url(https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2)',
      ).load();

      await Promise.all(readyList)
      .then(list => list.map(item => {
        const key = item.file;
        resources[key] = item;
      }));
    },

    get: function (name: string) {
      return resources[name];
    },
  });

})();

export {ResourceLoader};
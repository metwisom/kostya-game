import {loadFile} from '../../../utils/loadFile';

export type BasicResource = {
  file: string;
  path: string;
};

export type ImageResource = BasicResource & {
  type: 'image';
  params: {
    frames: number;
    speed: number;
  };
  content: HTMLImageElement;
};
export type SoundResource = BasicResource & {
  type: 'sound';
  file: string;
  path: string;
  content: HTMLAudioElement;
}
export type FontResource = BasicResource & {
  type: 'font';
  file: string;
  path: string;
  content: FontFace;
};
type Resource = ImageResource | SoundResource | FontResource

const ResourceLoader = (function () {

  const resources: Record<string, Resource> = {};

  return Object.freeze({
    load: async function (resourceMap: string) {
      const readyList: Promise<Resource>[] = [];

      await loadFile<Resource[]>(resourceMap)
      .then(data => {
        data.map((item) =>
          readyList.push(
            new Promise(async (res) => {
              switch (item.type) {
                case 'image':
                  item.content = new Image();
                  item.content.onload = () => res(item);
                  item.content.src = item.path + item.file;
                  break;
                case 'font':
                  item.content = await new FontFace(
                    'Press',
                    'url(' + item.path + item.file + ')',
                  ).load();
                  break;
                case 'sound':
                  item.content = new Audio(item.path + item.file);
                  item.content.onload = () => res(item);
                  item.content.src = 'resources/' + item.path + item.file;
                  break;

              }
            })),
        );
      });

      await Promise.all(readyList)
      .then(list => list.map(item => {
        const key = item.file;
        resources[key] = item;
      }));
    },

    get: function <T>(name: string): T {
      return resources[name] as T;
    },
  });

})();

export {ResourceLoader};
import {FloatX, FloatY} from '../Gui/Element';

export interface GameMap {
  mapName: string;
  spawnPoint: {
    x: number,
    y: number,
    fakeAnimate?: boolean
  };
  buttons: ButtonEntity[];
  pickup: {
    x: number,
    y: number,
    type: string
  }[];
  background: Background;
  map: (MapEntity)[];
}

export interface Background {
  type: string;
  items?: (BackgroundEntity)[] | null;
}

export interface BackgroundEntity {
  image: string;
}

export interface MapEntity {
  x: number;
  y: number;
  type: string;
}

export interface ButtonEntity {
  text: string,
  floatX: keyof typeof FloatX
  floatY: keyof typeof FloatY
  x: number
  y: number,
  width: number,
  height: number,
  action: {
    loadMap: string
  }
}

export interface GameMap {
  mapName: string;
  spawnPoint: {
    x: number,
    y: number
  };
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

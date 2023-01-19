export interface GameMap {
  mapName: string;
  spawnPoint:{
    x:number,
    y:number
  }
  background: Background;
  map: (MapEntity)[];
}
export interface Background {
  type: string;
  items?: (BackgroundEntity)[] | null;
}
export interface BackgroundEntity {
  image: string;
  bias: number;
}
export interface MapEntity {
  x: number;
  y: number;
  type: string;
}

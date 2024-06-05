import {ResourceLoader, SoundResource} from '../ResourceLoader/ResourceLoader';

type GameSoundType = {
  setResource(resource: string): GameSoundType
  play(): void
  stop(): void
  paused: boolean
  setRate(speed: number): void
  setVolume(speed: number): void
}

const GameSound = () => {
  let resource: HTMLAudioElement = null;
  const sound: GameSoundType = {

    setResource(src: string) {
      resource = ResourceLoader.get<SoundResource>(src).content;
      resource.playbackRate = 1.8;
      resource.loop = true;
      return this;
    },
    setRate(speed: number) {
      resource.playbackRate = speed;
      return this;
    },
    setVolume(volume: number) {
      resource.volume = volume;
      return this;
    },
    get paused() {
      return resource.paused;
    },
    play() {
      resource.play();
    },
    stop() {
      resource.pause();
      resource.currentTime = 0;
    },
  };

  return Object.freeze(sound);
};

export {GameSound, GameSoundType};
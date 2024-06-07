import {ResourceLoader, SoundResource} from '../ResourceLoader/ResourceLoader';

type GameSoundType = {
  setResource(resource: string): GameSoundType
  play(): GameSoundType
  stop(): GameSoundType
  paused: boolean
  setRate(speed: number): GameSoundType
  setVolume(speed: number): GameSoundType
  setLoop(loop: boolean): GameSoundType
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
    setLoop(loop: boolean) {
      resource.loop = loop;
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
      return this;
    },
    stop() {
      resource.pause();
      resource.currentTime = 0;
      return this;
    },
  };

  return Object.freeze(sound);
};

export {GameSound, GameSoundType};
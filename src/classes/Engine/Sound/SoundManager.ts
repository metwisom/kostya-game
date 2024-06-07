import {GameSound, GameSoundType} from './GameSound';

type SoundManagerType = {
  create(resource: string): GameSoundType;
}

const SoundManager = (() => {
  const manager: SoundManagerType = {
    create(resource: string) {
      return GameSound().setResource(resource);
    },
  };
  return Object.freeze(manager);
})();

export {SoundManager};
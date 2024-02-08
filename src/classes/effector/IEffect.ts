import {D2Updatable} from '../Engine/D2Updatable';

abstract class IEffect {

  protected maintainer: D2Updatable;

  protected constructor(maintainer: D2Updatable) {
    this.maintainer = maintainer;
  }

  abstract update(delta: number): void

}

export {IEffect};
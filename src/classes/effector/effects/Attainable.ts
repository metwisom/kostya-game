import {ItemWithStates} from '../../Engine/ItemWithStates';
import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';
import {Eventful} from '../../Engine/interfaces/Eventful';
import {Character} from '../../content/Character';
import {Particle} from '../../content/Particle';


class Attainable extends IEffect {

  protected readonly maintainer: ItemWithStates & Eventful;

  constructor(maintainer: typeof Attainable.prototype.maintainer) {
    super(maintainer);
  }

  update() {

    const xCollision = this.maintainer.physBox.prop();
    const inter = Engine.checkCollision<Character>(xCollision, this.maintainer.id, Character);

    if (inter.length !== 0) {
      this.maintainer.Event({taken: inter[0]});
      this.createStepParticle();
      this.maintainer.destroy();
    }
  }

  private createStepParticle() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const part = new Particle(this.maintainer.x + Math.random() * 30 - 15, this.maintainer.y - 1.5, 2, 0.05, 0.94);
        Engine.addObject(part, 2);
        Engine.addObjectPhys(part);
      }, i * 10);

    }
  }
}


export {Attainable};
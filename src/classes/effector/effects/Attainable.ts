import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';
import {Particle} from '../../content/Particle';
import {ItemWithStatesComponent} from '../../Engine/ItemWithStates';
import {Eventful} from '../../Engine/interfaces/Eventful';


class Attainable implements IEffect {
  private _maintainer;

  constructor(maintainer: ItemWithStatesComponent & Eventful) {
    this._maintainer = maintainer;
  }

  update() {
    const xCollision = this._maintainer.physBox.prop(0, 0);
    const inter = Engine.checkCollision(xCollision, this._maintainer.id);
    if (inter.length !== 0) {
      this._maintainer.Event({taken: inter[0]});
      this.createParticle();
      this._maintainer.destroy();
    }
  }

  private createParticle() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const part = Particle(this._maintainer.x + Math.random() * 30 - 15, this._maintainer.y - 1.5, 2, 0.05, 0.94);
        Engine.addObject(part, 2);
        Engine.addObjectPhys(part);
      }, i * 10);
    }
  }
}


export {Attainable};
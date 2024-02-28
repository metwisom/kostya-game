import {Engine} from '../../Engine/Engine';
import {IEffect} from '../IEffect';
import {Particle} from '../../content/Particle';
import {ItemWithStatesComponent} from '../../Engine/ItemWithStates';
import {Eventful} from '../../Engine/interfaces/Eventful';


type Attainables = IEffect & {
  createParticle(): void
}

const Attainable = function (maintainer: ItemWithStatesComponent & Eventful) {
  const _maintainer = maintainer;
  const obj: Attainables = {
    update(_delta: number = 1) {
      const xCollision = _maintainer.physBox.prop(0, 0);
      const inter = Engine.checkCollision(xCollision, _maintainer.getId());
      if (inter.length !== 0) {
        _maintainer.Event({taken: inter[0]});
        this.createParticle();
        _maintainer.destroy();
      }
    },
    createParticle() {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const part = Particle(_maintainer.x + Math.random() * 30 - 15, _maintainer.y - 1.5, 2, 0.05, 0.94);
          Engine.addObject(part, 2);
          Engine.addObjectPhys(part);
        }, i * 10);
      }
    },
  };
  return obj;
};


export {Attainable, Attainables};
import {D2Drawable} from "./D2Drawable";
import {Effector} from '../effector/Effector';
import {Box} from './Box/Box';


class D2Updatable extends D2Drawable {

  protected _physBox: Box;

  protected effector: Effector = undefined;// = new effector(this);

  public get _effector(){
    if(this.effector == undefined){
      this.effector = new Effector();
    }
    return this.effector
  }

  public set physBox(newPhysBox) {
    this._physBox = newPhysBox;
  }

  public get physBox() {
    return this._physBox;
  }

  update(delta: number) {
    this._effector.run(delta)
  }

}

export {D2Updatable};

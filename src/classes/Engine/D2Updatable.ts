import {D2Drawable} from "./D2Drawable";
import {Effector} from '../effector/Effector';
import {Box} from './Box/Box';


class D2Updatable extends D2Drawable {

  protected _physBox: Box;

  protected _effector: Effector = undefined;// = new effector(this);

  public get effector(){
    if(this._effector == undefined){
      this._effector = new Effector();
    }
    return this._effector
  }

  public set physBox(newPhysBox) {
    this._physBox = newPhysBox;
  }

  public get physBox() {
    return this._physBox;
  }

  update(delta: number) {
    this.effector.run(delta)
  }

}

export {D2Updatable};

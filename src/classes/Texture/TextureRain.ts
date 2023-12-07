import {TextureBlank} from "./TextureBlank";


class TextureRain extends TextureBlank{


  protected render(position: number){
    this.virtualScene.fillStyle = this.fillColor
    const maxWidth = this.virtualCanvas.height - this.virtualCanvas.width
    for(let i = 1;i < maxWidth;i++){
      this.virtualScene.fillRect(this.virtualCanvas.width / 2 - this.virtualCanvas.width / 2 / maxWidth * i,i,this.virtualCanvas.width / maxWidth * i,this.virtualCanvas.width / maxWidth * i)
    }

  }

}

export {TextureRain};

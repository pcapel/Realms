import Asset from '../Asset';

import * as Exceptions from '../Exceptions';

class Rect extends Asset {
  constructor({x=0,y=0,w=0,h=0,ctx=undefined}) {
    super(arguments[0]);
    this.type = "Rect";

    this.width = w;
    this.height = h;
    this.centerX = this.x + (w / 2);
    this.centerY = this.y + (h / 2);
  }
  draw(isFilled=true){
    // let the realm know that this is a drawn asset
    if(this.Realm !== undefined){
      this.drawn = true;
    }
    else {
      throw new Exceptions.NoRealm(this);
    }
    if(isFilled){
      this.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    else {
      this.ctx.rect(this.x,this.y,this.width,this.height)
    }
    this.ctx.stroke();
  }
}

export default Rect;

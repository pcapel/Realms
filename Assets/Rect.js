import Asset from '../Asset';

import * as Exceptions from '../Exceptions';

class Rect extends Asset {
  constructor({x=0,y=0,w=0,h=0,ctx=undefined}) {

    super({x:x,y:y,ctx:ctx});
    this.type = "Rect";

    this.width = w;
    this.height = h;
    //this.collisionBox set of 4 points describing an area that is the
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

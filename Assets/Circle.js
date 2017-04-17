import Asset from '../Asset';

import * as Exceptions from '../Exceptions';

class Circle extends Asset {
  constructor({x=0,y=0,r=0, ctx=undefined}) {
    super(arguments[0]);
    this.type = "Circle";

    this.radius = r;
    this.width = 2 * r;
    this.height = 2 * r;
    //this.collisionBox set of 4 points describing an area that is the circle's
  }
  draw(){
    // let the realm know that this is a drawn asset
    if(this.Realm !== undefined){
      this.drawn = true;
    }
    else {
      throw new Exceptions.NoRealm(this);
    }
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

export default Circle;

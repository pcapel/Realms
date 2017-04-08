import Asset from '../Asset';

class Rect extends Asset {
  constructor(x,y,w,h,ctx) {
    super(ctx);
    this.x = x; // upper left
    this.y = y; // upper left
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    //this.collisionBox set of 4 points describing an area that is the
  }
  draw(isFilled=true){
    if(isFilled){
      this.ctx.fillRect(this.x,this.y,this.w,this.h)
    }
    else {
      this.ctx.rect(this.x,this.y,this.w,this.h)
    }
    this.ctx.stroke();
  }
}

export default Rect;

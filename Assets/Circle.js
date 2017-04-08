import Asset from '../Asset';

class Circle extends Asset {
  constructor(x,y,r,ctx) {
    super(ctx);
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;
    //this.collisionBox set of 4 points describing an area that is the circle's
  }
  draw(){
    console.log(this.x,this.y,this.r);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    this.ctx.stroke();
  }
  _calWidth(r){
    let d = 2*r;

  }
  _calHeight(y,r){

  }
}

export default Circle;

import Asset from '../Asset';

class Line extends Asset{
  constructor(x1,y1,x2,y2,ctx){
    super(ctx);
    this.x = (x1 + x2) / 2; // x and y need to be defined for certain fucntions in the Realm
    this.y = (y1 + y2) / 2; // therefore they will be the middle point for the line
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.ctx = ctx;
  }
  draw(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1,this.y1);
    this.ctx.lineTo(this.x2,this.y2);
    this.ctx.stroke();
  }
}

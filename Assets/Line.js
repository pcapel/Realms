import Asset from '../Asset';

class Line extends Asset{
  constructor({x1=0,y1=0,x2=0,y2=0,ctx=undefined}){
    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;
    super(arguments[0]);
    this.x = this.centerX = x; // x and y need to be defined for certain fucntions in the Realm
    this.y = this.centerY = y; // therefore they will be the middle point for the line
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.ctx = ctx;
  }
  draw(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.stroke();
  }
  move(gravity, drag) {
    /*
    move takes in optional vectors for gravity and drag
    */
    if (!this.canMove){
      throw Error("You haven't configured this asset for movement")
    }
    if(gravity !== null){
      this.vector = Vector.add(this.vector, gravity);
    }
    if(drag !== null){
      drag.theta = this.vector.theta + Math.PI;
      this.vector = Vector.add(this.vector, drag);
    }
    this.x += this.vector.magnitude * Math.sin(this.vector.theta);
    this.x1 += this.vector.magnitude * Math.sin(this.vector.theta);
    this.x2 += this.vector.magnitude * Math.sin(this.vector.theta);
    this.centerX += this.vector.magnitude * Math.sin(this.vector.theta);
    this.y -= this.vector.magnitude * Math.cos(this.vector.theta);
    this.y1 -= this.vector.magnitude * Math.cos(this.vector.theta);
    this.y2 -= this.vector.magnitude * Math.cos(this.vector.theta);
    this.centerY -= this.vector.magnitude * Math.cos(this.vector.theta);
    return null;
  }
}

export default Line;

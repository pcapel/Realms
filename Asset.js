class Asset {
  constructor(ctx, isCollidable=true){
    this.canCollide = isCollidable;
    this.ctx = ctx;
  }
  gober(){
    console.log("gober mober");
  }
}

export default Asset;

import { Vector } from './Physics/Vector';

class Realm {
  constructor(elemId, percentWidth, percentHeight){
    /*
    :percentWidth: floating point percentage of window.innerWidth required
    :percentHeight: floating point percentage of window.innerHeight required
    both values floored
    */
    this.canvasElem = document.getElementById(elemId);
    this.canvasElem.addEventListener('mousemove', this.setMouseCoord);
    this.canvasElem.addEventListener('mousedown', this.printCoords);
    document.addEventListener('keydown', this.keyPress);
    this.canvasElem.width = this.width = Math.floor(window.innerWidth * percentWidth);
    this.canvasElem.height = this.height = Math.floor(window.innerHeight * percentHeight);

    this.topEdge = [[0,0], [0, this.width]];
    this.bottomEdge = [[0,this.height], [this.width, this.height]];
    this.rightEdge = [[this.width, this.height], [this.width, 0]];
    this.leftEdge = [[0,0], [0,this.height]];

    this.Context = canvas.getContext('2d');
    this.state = {};
    this.hitBoxes = [];
    this.registeredAssetsByName = {};
  }
  printCoords(){
    console.log(this.mouseX, this.mouseY);
  }
  keyPress(e) {

  }
  exert(forceFunc, asset) {
    /*
    exerts a force on the passed assets, or all
    force: a function defined to act on an asset, assets, or a subset of assets
    */

  }
  register(/*assets*/){
    /*
    accepts a single asset, or an array of assets allowing easier mass
    registration of assets that are generated programmatically
    */
    let args = arguments;
    if (arguments[0] instanceof Array){
      args = arguments[0];
    }
    let i = 0;
    while(args[i]){
      let a = args[i];
      // do some registering
      a.ctx = this.Context;
      a.Realm = this;
      this.hitBoxes.push(a.hitBox)
      this.registeredAssetsByName[a.name] = a;
      i++;
    }
  }
  setMouseCoord(e){
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
  unRegister(asset){
    /*
    removes the asset's registration details from the realm
    */
    return null;
  }
  wallCollision(asset){
    /*
    Checks moving asset for wall collisions and returns bool
    */
    return null;
  }
  assetCollision(asset1, asset2){
    /*
    checks two moving assets for collission and returns bool
    */
    return null;
  }
  addGravity() {
    /*
    add gravity to all registered assets who have a true collision setting
    */
    return null;
  }
  addBorder(width="1px", style="solid", color="black") {
    this.canvasElem.style.border = width + " " + style + " " + color;
    return null;
  }
  animationFrame() {
    window.requestAnimationFrame(this.eventLoop.bind(this))
  }
  eventLoop() {
    this.Context.clearRect(0,0, this.width,this.height)
    let ball = this.getNamedAsset("game-ball");
    ball.x += 1;
    ball.draw()
    window.requestAnimationFrame(this.eventLoop.bind(this))
  }
  getNamedAsset(assetName) {
    return this.registeredAssetsByName[assetName];
  }
}

export default Realm;

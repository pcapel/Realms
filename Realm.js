import Vector from './Physics/Vector';

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
    this.gravity = new Vector({theta:Math.PI, magnitude:0.002})
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
    Accepts a single asset, or an array of assets allowing easier mass
    registration of assets that are generated programmatically.
    Registering an asset performs a few basic things to it.
    It, without care, changes the ctx of the asset to the Context stored on the
    Realm.  It adds itself as the realm object of the asset, and it gives the
    asset a 0 vector if the asset is movable.
    */
    let args = arguments;
    if (arguments[0] instanceof Array){
      args = arguments[0];
    }
    let i = 0;
    while(args[i]){
      let a = args[i];

      // do some registering
      if (a.canMove){
        // set up asset movement properties
        // ** this may be a good thing to make more customizable **

        a.vector = new Vector({theta: (Math.random()*10), magnitude:4});
      }

      a.ctx = this.Context;
      a.Realm = this;
      a.setXLimitUpper(this.width)
      a.setYLimitUpper(this.height)
      a.setXLimitLower(0);
      a.setYLimitLower(0);
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
    for (let asset in this.registeredAssetsByName){
      this.registeredAssetsByName[asset].wallBounce();
      this.registeredAssetsByName[asset].move(this.gravity);
      this.registeredAssetsByName[asset].draw();
    }
    window.requestAnimationFrame(this.eventLoop.bind(this))
  }
  getNamedAsset(assetName) {
    return this.registeredAssetsByName[assetName];
  }
  asTable({walled = true}) {
    /*
    asTable is an init chain method that sets the perspective of the Realm
    to an overhead view.
    walled: boolean indicates that you want the edges of the Realm to act as walls
    */
    return this;
  }
  asScreen({scrollRight=false, scrollLeft=false, scrollUp=false, scrollDown=false, walled=true}) {
    /*
    asScreen is an init chain method that sets the perspective of the Realm
    to a front view screen (eg, sidescroller game screen)

    walled: boolean indicates that the limits of the Realm shoud act as walls.

    scrollUp/
    scrollLeft/
    scrollRight/
    scrollDown: boolean indicating how the scrolling of the screen should work
                during animations.
    */
    return this;
  }
}

export default Realm;

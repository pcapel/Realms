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
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('keyup', this.keyUp.bind(this));
    this.canvasElem.width = this.width = Math.floor(window.innerWidth * percentWidth);
    this.canvasElem.height = this.height = Math.floor(window.innerHeight * percentHeight);

    this.topEdge = [[0,0], [0, this.width]];
    this.bottomEdge = [[0,this.height], [this.width, this.height]];
    this.rightEdge = [[this.width, this.height], [this.width, 0]];
    this.leftEdge = [[0,0], [0,this.height]];

    this.Context = this.canvasElem.getContext('2d');
    this.state = {};
    this.hitBoxes = [];
    this.registeredAssetsByName = {};
    this.registeredKeyDownActions = {};
    this.registeredKeyUpActions = {};
    /*
    registered actions should be an object with keys and the action funciton
    of a specific instance as the value
    */

    this.controlledAssetsByName = {};

    this.collisionCheck = [];

    this.hasGravity = false;
    this.gravity = new Vector({theta: Math.PI, magnitude: 0.2})

    this.hasDrag = false;
    this.drag = new Vector({theta: 0, magnitude: 0.01})
  }
  printCoords(){
    console.log(this.mouseX, this.mouseY);
  }
  keyDown(e) {
    let actionArray = this.registeredKeyDownActions[e.key];
    if(actionArray !== undefined){
      for(let i = 0; i < actionArray.length; i++) {
        actionArray[i]();
      }
    }
  }
  keyUp(e) {
    let actionArray = this.registeredKeyUpActions[e.key];
    if(actionArray !== undefined){
      for(let i = 0; i < actionArray.length; i++) {
        actionArray[i]();
      }
    }
  }
  configureMouse(option) {
    /*
    configures the mouse hover
    */
    switch(option) {
      case "crosshair":
        this.canvasElem.style.cursor = "none"
        break;
      default:
        break;
    }
    return this;
  }
  setGravity(magnitude) {
    this.hasGravity = true;
    this.gravity.magnitude = magnitude;
    return this;
  }
  setDrag(magnitude) {
    this.hasDrag = true;
    this.drag.magnitude = magnitude;
    return this;
  }
  exert(forceFunc, asset) {
    /*
    exerts a force on the passed assets, or all
    force: a function defined to act on an asset, assets, or a subset of assets
    */

  }
  registerKeyUp(keyname, action) {
    /*
    keyname: the string value of the key, or array of strings
    action: function to be invoked on keypress
    */
    if (keyname instanceof Array) {
      for(let i = 0; i < keyname.length; i++) {
        if(this.registeredKeyUpActions[keyname[i]] === undefined) {
          this.registeredKeyUpActions[keyname[i]] = [];
        }
        this.registeredKeyUpActions[keyname[i]].push(action);
      }
    }
    else {
      if(this.registeredKeyUpActions[keyname] === undefined) {
        this.registeredKeyUpActions[keyname] = [];
      }
      this.registeredKeyUpActions[keyname].push(action);
    }
  }
  registerKeyDown(keyname, action) {
    /*
    keyname: the string value of the key, or list of strings
    action: function to be invoked on keypress
    */
    if (keyname instanceof Array) {
      for(let i = 0; i < keyname.length; i++) {
        if(this.registeredKeyDownActions[keyname[i]] === undefined) {
          this.registeredKeyDownActions[keyname[i]] = [];
        }
        this.registeredKeyDownActions[keyname[i]].push(action);
      }
    }
    else {
      if(this.registeredKeyDownActions[keyname] === undefined) {
        this.registeredKeyDownActions[keyname] = [];
      }
      this.registeredKeyDownActions[keyname].push(action);
    }
  }
  register(/*assets, defaultVector*/){
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
        if(a.vector === undefined){
          a.vector = new Vector({theta: 0, magnitude:0});
        }
        if (a.elasticity === undefined) {
          a.elasticity = 0.7;
        }
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
  registerCollision(assets) {
    if (!(assets instanceof Array)) {
      // raise error
    }

  }
  assetCollisions() {
    /*
    runs through assets that are registered for collisions
    with each other and expresses their collision.
    */

    for(let i = 0; i < this.collisionCheck.length - 1; i++) {
      this.collisionCheck[i]
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
  addBorder(width="1px", style="solid", color="black") {
    this.canvasElem.style.border = width + " " + style + " " + color;
    this.canvasElem.style.padding = "none";
    this.canvasElem.style.margin = "none";
    return this;
  }
  animationFrame() {
    window.requestAnimationFrame(this.eventLoop.bind(this))
  }
  eventLoop() {
    this.Context.clearRect(0,0, this.width,this.height)
    let gravity = this.hasGravity ? this.gravity : null;
    let drag = this.hasDrag ? this.drag : null;
    for (let asset in this.registeredAssetsByName){
      this.registeredAssetsByName[asset].wallBounce();
      this.assetCollisions()
      this.registeredAssetsByName[asset].move(gravity, drag);
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

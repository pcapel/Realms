class Realm {
  constructor(elem, percentWidth, percentHeight){
    /*
    :percentWidth: floating point percentage of window.innerWidth required
    :percentHeight: floating point percentage of window.innerHeight required
    both values floored
    */
    this.canvasElem = elem;
    this.canvasElem.width = this.width = Math.floor(window.innerWidth * percentWidth);
    this.canvasElem.height = this.height = Math.floor(window.innerHeight * percentHeight);
    this.Context = canvas.getContext('2d');
    this.state = {};
    this.hitBoxes = [];
  }
  register(/*assets*/){
    let args = arguments;
    if (arguments[0] instanceof Array){
      args = arguments[0];
    }
    let i = 0;
    while(args[i]){
      let a = args[i];
      // do some registering
      a.ctx = this.Context;
      this.hitBoxes.push(a.hitBox)
      i++;
    }
  }
  unRegister(asset){

  }
  wallCollision(asset){
    /*
    Checks moving asset for wall collisions and returns bool
    */
  }
  assetCollision(asset1, asset2){
    /*
    checks two moving assets for collission and returns bool
    */
  }
}

export default Realm;

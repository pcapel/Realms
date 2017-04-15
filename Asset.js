class Asset {
  /*
  The Asset base class is used for all things that are drawn to the canvas.
  There are a few implicit properties that will need to be mapped out.
  The basics are:
  x: x location of the asset.  This varies depending on the type of asset.
    For all rectangular assets (Rect/Square, Images, etc) it will be the top
    left corner of the asset.  I personally find this distasteful, but it is
    a convention at this point, and doing it differently would poorly influence
    usability.  For circular shapes (Circle, Ellipse, etc) it is the x coord of
    the center (h of the [h,k] ordered pair).
  y: y location of the asset.  Follows the convention set by x.
  ctx: The context of the canvas that the Realm represents.  This is set either
       explicitly by the user, or upon registration of the asset with a Realm.
  */
  constructor({ x=0, y=0, ctx=undefined, name=undefined, Realm=undefined, canCollide=true, canGravity=true, canMove=true } = {}){
    console.log(`Asset Constructor: ${x}, ${y}`)
    this.type = "Asset"
    this.canCollide = canCollide;
    this.canGravity = canGravity;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.drawn = false;
    this.name = name;
    this.Realm = Realm;
  }
  setX(newX){
    this.x = newX;
    return this;
  }
  setY(newY) {
    this.y = newY;
    return this;
  }
  setName(newName) {
    this.name = newName;
    return this;
  }
  getRealmY() {
    return this.ctx.canvas.attributes.height.value;
  }
  getRealmX() {
    return this.ctx.canvas.attributes.width.value;
  }
  respectWalls({top=true, right=true, bottom=true, left=true}) {
    /*
    used to define the behavior of the asset with respect to 'walls', or the
    edges of the Realm to which it is registered.
    the values are used to set limits to the motion.
    */
    this.collideTop =  top;
    this.collideRight = right;
    this.collideLeft = left;
    this.collideBottom = bottom;
  }
}

export default Asset;

import Vector from './Physics/Vector';

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

  The following properties are mostly implicit, save for some specific methods of interaction.

  drawn: Boolean set to true when the asset is drawn.  Used to track whether the
         user is actively looking to draw the asset.
  type: String of the class name for the asset, used to log errors relating to
        that asset if the 'name' is not set for it.
  name: String classifier defined by the user, effectively an ID and a way to grab
        the asset from the Realm specifically, and is used preferentially in error
        messages vs the class type.

        TODO
  xLimitUpper/
  xLimitLower/
  yLimitLower/
  yLimitUpper: Integer values that are used to define how the user wants the
               asset to interact with the edges of the Realm to which it is
               registered.  If the user sets the Realm as
  */
  constructor({ x=0, y=0, ctx=undefined, name=undefined, Realm=undefined, canCollide=true, canGravity=true, canMove=true } = {}){
    console.log(`Asset Constructor: ${x}, ${y}`)
    this.type = "Asset"
    this.canCollide = canCollide;
    this.canGravity = canGravity;
    this.canMove = canMove;
    this.ctx = ctx;
    this.x = this.centerX = x;
    this.y = this.centerY = y;
    this.drawn = false;
    this.name = name;
    this.Realm = Realm;
    this.xLimitLower = null;
    this.xLimitUpper = null;
    this.yLimitLower = null;
    this.yLimitUpper = null;
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
  setXLimitUpper(newLim) {
    this.xLimitUpper = newLim;
  }
  setXLimitLower(newLim) {
    this.xLimitLower = newLim;
  }
  setYLimitUpper(newLim) {
    this.yLimitUpper = newLim;
  }
  setYLimitLower(newLim) {
    this.yLimitLower = newLim;
  }
  wallBounce() {
    /*
    moving object checks for collisions with the boundaries xLimitLower xLimitUpper
    yLimitLower yLimitUpper and reflects its motion accordingly
    */
    let halfWidth = this.width / 2;
    let halfHeight = this.height / 2;
    if (this.centerX > this.xLimitUpper - halfWidth) {
      this.x -= (this.centerX - (this.xLimitUpper - halfWidth));
      this.centerX -= (this.centerX - (this.xLimitUpper - halfWidth));
      this.vector.theta = -this.vector.theta;
    } else if (this.centerX < 0 + halfWidth) {
      this.x += (halfWidth - this.centerX);
      this.centerX += (halfWidth - this.centerX);
      this.vector.theta = -this.vector.theta;
    }
    if (this.centerY > this.yLimitUpper - halfHeight) {
      this.y -= (this.centerY - (this.yLimitUpper - halfHeight));
      this.centerY -= (this.centerY - (this.yLimitUpper - halfHeight));
      this.vector.theta = Math.PI - this.vector.theta;
    } else if (this.centerY < 0 + (this.height / 2)) {
      this.y += (halfHeight - this.centerY);
      this.centerY += (halfHeight - this.centerY);
      this.vector.theta = Math.PI - this.vector.theta;
    }
  }
  move(gravity, drag) {
    /*
    move takes in optional vectors for gravity and drag
    */
    if (!this.canMove){
      throw Error("You haven't configured this asset for movement")
    }
    if(gravity){
      this.vector = Vector.add(this.vector, gravity);
    }
    this.x += this.vector.magnitude * Math.sin(this.vector.theta);
    this.centerX += this.vector.magnitude * Math.sin(this.vector.theta);
    this.y -= this.vector.magnitude * Math.cos(this.vector.theta);
    this.centerY -= this.vector.magnitude * Math.cos(this.vector.theta);
    return null;
  }
}

export default Asset;

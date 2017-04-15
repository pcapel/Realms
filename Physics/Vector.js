class Vector {
  constructor(x=0,y=0) {
    this.x = x;
    this.y = y;
  }
  add(a, b){
    /*
    perform vector addition and return a new vector
    a/b: separate vector instances
    */
    return new Vector(a.x + b.x, a.y +b.y);
  }
  subtract(){
    /*
    perform vector subtraction and return new vector
    a/b: separate vector instances
    */
    return new Vector(a.x - b.x, a.y - b.y)
  }
  scale(v, s){
    /*
    perform vector multiplication and return new vector
    v: vector instance
    s: scale factor
    */
    return new Vector(v.x * s, v.y * s)
  }
}

export default Vector;

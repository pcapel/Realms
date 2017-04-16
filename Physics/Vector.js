
class Vector {
  /*
  The Vector class is composed of two properties, angle and length, and
  various mathematical methods associated. The length of the vector is the
  magnitude of the scalar associated with speed.  Therefore, in a move function
  the dx/dy would be magnitude * sin(theta) or magnitude * cos(theta).
  */
  constructor({theta=0,magnitude=0}) {
    this.theta = theta;
    this.magnitude = magnitude;
  }
  static add(a, b){
    /*
    perform vector addition and return a new vector
    a/b: separate vector instances
    */
    let x = Math.sin(a.theta) * a.magnitude + Math.sin(b.theta) * b.magnitude;
    let y = Math.cos(a.theta) * a.magnitude + Math.cos(b.theta) * b.magnitude;
    let magnitude = Math.sqrt(x*x + y*y);
    let theta = (Math.PI/2) - Math.atan2(y,x);
    return new Vector({theta: theta, magnitude: magnitude});
  }
  static subtract(){
    /*
    perform vector subtraction and return new vector
    a/b: separate vector instances
    */
    return new Vector({x: a.x - b.x, y: a.y - b.y})
  }
  scale(v, s){
    /*
    perform vector multiplication and return new vector
    v: vector instance
    s: scale factor
    */
    return new Vector({x:v.x * s, y:v.y * s})
  }
  reciporicate(v) {
    /*
    perform a reciporication on the passed vector and return a new vector
    */
    return new Vector({x: v.y, y: v.x})
  }
}

export default Vector;

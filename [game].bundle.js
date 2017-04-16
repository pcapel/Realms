/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  /*
  The Vector class is composed of two properties, angle and length, and
  various mathematical methods associated. The length of the vector is the
  magnitude of the scalar associated with speed.  Therefore, in a move function
  the dx/dy would be magnitude * sin(theta) or magnitude * cos(theta).
  */
  function Vector(_ref) {
    var _ref$theta = _ref.theta,
        theta = _ref$theta === undefined ? 0 : _ref$theta,
        _ref$magnitude = _ref.magnitude,
        magnitude = _ref$magnitude === undefined ? 0 : _ref$magnitude;

    _classCallCheck(this, Vector);

    this.theta = theta;
    this.magnitude = magnitude;
  }

  _createClass(Vector, [{
    key: "scale",
    value: function scale(v, s) {
      /*
      perform vector multiplication and return new vector
      v: vector instance
      s: scale factor
      */
      return new Vector({ x: v.x * s, y: v.y * s });
    }
  }, {
    key: "reciporicate",
    value: function reciporicate(v) {
      /*
      perform a reciporication on the passed vector and return a new vector
      */
      return new Vector({ x: v.y, y: v.x });
    }
  }], [{
    key: "add",
    value: function add(a, b) {
      /*
      perform vector addition and return a new vector
      a/b: separate vector instances
      */
      var x = Math.sin(a.theta) * a.magnitude + Math.sin(b.theta) * b.magnitude;
      var y = Math.cos(a.theta) * a.magnitude + Math.cos(b.theta) * b.magnitude;
      var magnitude = Math.sqrt(x * x + y * y);
      var theta = Math.PI / 2 - Math.atan2(y, x);
      return new Vector({ theta: theta, magnitude: magnitude });
    }
  }, {
    key: "subtract",
    value: function subtract() {
      /*
      perform vector subtraction and return new vector
      a/b: separate vector instances
      */
      return new Vector({ x: a.x - b.x, y: a.y - b.y });
    }
  }]);

  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Asset = function () {
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
  function Asset() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === undefined ? undefined : _ref$ctx,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? undefined : _ref$name,
        _ref$Realm = _ref.Realm,
        Realm = _ref$Realm === undefined ? undefined : _ref$Realm,
        _ref$canCollide = _ref.canCollide,
        canCollide = _ref$canCollide === undefined ? true : _ref$canCollide,
        _ref$canGravity = _ref.canGravity,
        canGravity = _ref$canGravity === undefined ? true : _ref$canGravity,
        _ref$canMove = _ref.canMove,
        canMove = _ref$canMove === undefined ? true : _ref$canMove;

    _classCallCheck(this, Asset);

    console.log("Asset Constructor: " + x + ", " + y);
    this.type = "Asset";
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

  _createClass(Asset, [{
    key: "setX",
    value: function setX(newX) {
      this.x = newX;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(newY) {
      this.y = newY;
      return this;
    }
  }, {
    key: "setName",
    value: function setName(newName) {
      this.name = newName;
      return this;
    }
  }, {
    key: "getRealmY",
    value: function getRealmY() {
      return this.ctx.canvas.attributes.height.value;
    }
  }, {
    key: "getRealmX",
    value: function getRealmX() {
      return this.ctx.canvas.attributes.width.value;
    }
  }, {
    key: "setXLimitUpper",
    value: function setXLimitUpper(newLim) {
      this.xLimitUpper = newLim;
    }
  }, {
    key: "setXLimitLower",
    value: function setXLimitLower(newLim) {
      this.xLimitLower = newLim;
    }
  }, {
    key: "setYLimitUpper",
    value: function setYLimitUpper(newLim) {
      this.yLimitUpper = newLim;
    }
  }, {
    key: "setYLimitLower",
    value: function setYLimitLower(newLim) {
      this.yLimitLower = newLim;
    }
  }, {
    key: "wallBounce",
    value: function wallBounce() {
      /*
      moving object checks for collisions with the boundaries xLimitLower xLimitUpper
      yLimitLower yLimitUpper and reflects its motion accordingly
      */
      var halfWidth = this.width / 2;
      var halfHeight = this.height / 2;
      if (this.centerX > this.xLimitUpper - halfWidth) {
        this.x -= this.centerX - (this.xLimitUpper - halfWidth);
        this.centerX -= this.centerX - (this.xLimitUpper - halfWidth);
        this.vector.theta = -this.vector.theta;
      } else if (this.centerX < 0 + halfWidth) {
        this.x += halfWidth - this.centerX;
        this.centerX += halfWidth - this.centerX;
        this.vector.theta = -this.vector.theta;
      }
      if (this.centerY > this.yLimitUpper - halfHeight) {
        this.y -= this.centerY - (this.yLimitUpper - halfHeight);
        this.centerY -= this.centerY - (this.yLimitUpper - halfHeight);
        this.vector.theta = Math.PI - this.vector.theta;
      } else if (this.centerY < 0 + this.height / 2) {
        this.y += halfHeight - this.centerY;
        this.centerY += halfHeight - this.centerY;
        this.vector.theta = Math.PI - this.vector.theta;
      }
    }
  }, {
    key: "move",
    value: function move(gravity, drag) {
      /*
      move takes in optional vectors for gravity and drag
      */
      if (!this.canMove) {
        throw Error("You haven't configured this asset for movement");
      }
      if (gravity) {
        this.vector = _Vector2.default.add(this.vector, gravity);
      }
      this.x += this.vector.magnitude * Math.sin(this.vector.theta);
      this.centerX += this.vector.magnitude * Math.sin(this.vector.theta);
      this.y -= this.vector.magnitude * Math.cos(this.vector.theta);
      this.centerY -= this.vector.magnitude * Math.cos(this.vector.theta);
      return null;
    }
  }]);

  return Asset;
}();

exports.default = Asset;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoRealm = exports.NoRealm = function NoRealm(asset) {
  _classCallCheck(this, NoRealm);

  this.message = (asset.name || asset.type) + " is not registered to a Realm";
  this.name = "NoRealmError";
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Asset2 = __webpack_require__(1);

var _Asset3 = _interopRequireDefault(_Asset2);

var _Exceptions = __webpack_require__(2);

var Exceptions = _interopRequireWildcard(_Exceptions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_Asset) {
  _inherits(Circle, _Asset);

  function Circle(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$r = _ref.r,
        r = _ref$r === undefined ? 0 : _ref$r,
        _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === undefined ? undefined : _ref$ctx;

    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, { x: x, y: y, ctx: ctx }));

    _this.type = "Circle";

    _this.radius = r;
    _this.width = r;
    _this.height = r;
    //this.collisionBox set of 4 points describing an area that is the circle's
    return _this;
  }

  _createClass(Circle, [{
    key: 'draw',
    value: function draw() {
      // let the realm know that this is a drawn asset
      if (this.Realm !== undefined) {
        this.drawn = true;
      } else {
        throw new Exceptions.NoRealm(this);
      }
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  }, {
    key: '_calWidth',
    value: function _calWidth(r) {
      var d = 2 * r;
    }
  }, {
    key: '_calHeight',
    value: function _calHeight(y, r) {}
  }]);

  return Circle;
}(_Asset3.default);

exports.default = Circle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Asset2 = __webpack_require__(1);

var _Asset3 = _interopRequireDefault(_Asset2);

var _Exceptions = __webpack_require__(2);

var Exceptions = _interopRequireWildcard(_Exceptions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rect = function (_Asset) {
  _inherits(Rect, _Asset);

  function Rect(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        _ref$w = _ref.w,
        w = _ref$w === undefined ? 0 : _ref$w,
        _ref$h = _ref.h,
        h = _ref$h === undefined ? 0 : _ref$h,
        _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === undefined ? undefined : _ref$ctx;

    _classCallCheck(this, Rect);

    var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, { x: x, y: y, ctx: ctx }));

    _this.type = "Rect";

    _this.width = w;
    _this.height = h;
    _this.centerX = _this.x + w / 2;
    _this.centerY = _this.y + h / 2;
    return _this;
  }

  _createClass(Rect, [{
    key: 'draw',
    value: function draw() {
      var isFilled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      // let the realm know that this is a drawn asset
      if (this.Realm !== undefined) {
        this.drawn = true;
      } else {
        throw new Exceptions.NoRealm(this);
      }
      if (isFilled) {
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
      } else {
        this.ctx.rect(this.x, this.y, this.width, this.height);
      }
      this.ctx.stroke();
    }
  }]);

  return Rect;
}(_Asset3.default);

exports.default = Rect;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Realm = function () {
  function Realm(elemId, percentWidth, percentHeight) {
    _classCallCheck(this, Realm);

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

    this.topEdge = [[0, 0], [0, this.width]];
    this.bottomEdge = [[0, this.height], [this.width, this.height]];
    this.rightEdge = [[this.width, this.height], [this.width, 0]];
    this.leftEdge = [[0, 0], [0, this.height]];

    this.Context = canvas.getContext('2d');
    this.state = {};
    this.hitBoxes = [];
    this.registeredAssetsByName = {};
    this.gravity = new _Vector2.default({ theta: Math.PI, magnitude: 0.002 });
  }

  _createClass(Realm, [{
    key: 'printCoords',
    value: function printCoords() {
      console.log(this.mouseX, this.mouseY);
    }
  }, {
    key: 'keyPress',
    value: function keyPress(e) {}
  }, {
    key: 'exert',
    value: function exert(forceFunc, asset) {
      /*
      exerts a force on the passed assets, or all
      force: a function defined to act on an asset, assets, or a subset of assets
      */

    }
  }, {
    key: 'register',
    value: function register() /*assets*/{
      /*
      Accepts a single asset, or an array of assets allowing easier mass
      registration of assets that are generated programmatically.
      Registering an asset performs a few basic things to it.
      It, without care, changes the ctx of the asset to the Context stored on the
      Realm.  It adds itself as the realm object of the asset, and it gives the
      asset a 0 vector if the asset is movable.
      */
      var args = arguments;
      if (arguments[0] instanceof Array) {
        args = arguments[0];
      }
      var i = 0;
      while (args[i]) {
        var a = args[i];

        // do some registering
        if (a.canMove) {
          // set up asset movement properties
          // ** this may be a good thing to make more customizable **

          a.vector = new _Vector2.default({ theta: Math.random() * 10, magnitude: 4 });
        }

        a.ctx = this.Context;
        a.Realm = this;
        a.setXLimitUpper(this.width);
        a.setYLimitUpper(this.height);
        a.setXLimitLower(0);
        a.setYLimitLower(0);
        this.hitBoxes.push(a.hitBox);
        this.registeredAssetsByName[a.name] = a;
        i++;
      }
    }
  }, {
    key: 'setMouseCoord',
    value: function setMouseCoord(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }
  }, {
    key: 'unRegister',
    value: function unRegister(asset) {
      /*
      removes the asset's registration details from the realm
      */
      return null;
    }
  }, {
    key: 'wallCollision',
    value: function wallCollision(asset) {
      /*
      Checks moving asset for wall collisions and returns bool
      */
      return null;
    }
  }, {
    key: 'assetCollision',
    value: function assetCollision(asset1, asset2) {
      /*
      checks two moving assets for collission and returns bool
      */
      return null;
    }
  }, {
    key: 'addGravity',
    value: function addGravity() {
      /*
      add gravity to all registered assets who have a true collision setting
      */
      return null;
    }
  }, {
    key: 'addBorder',
    value: function addBorder() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "1px";
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "solid";
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "black";

      this.canvasElem.style.border = width + " " + style + " " + color;
      return null;
    }
  }, {
    key: 'animationFrame',
    value: function animationFrame() {
      window.requestAnimationFrame(this.eventLoop.bind(this));
    }
  }, {
    key: 'eventLoop',
    value: function eventLoop() {
      this.Context.clearRect(0, 0, this.width, this.height);
      for (var asset in this.registeredAssetsByName) {
        this.registeredAssetsByName[asset].wallBounce();
        this.registeredAssetsByName[asset].move(this.gravity);
        this.registeredAssetsByName[asset].draw();
      }
      window.requestAnimationFrame(this.eventLoop.bind(this));
    }
  }, {
    key: 'getNamedAsset',
    value: function getNamedAsset(assetName) {
      return this.registeredAssetsByName[assetName];
    }
  }, {
    key: 'asTable',
    value: function asTable(_ref) {
      var _ref$walled = _ref.walled,
          walled = _ref$walled === undefined ? true : _ref$walled;

      /*
      asTable is an init chain method that sets the perspective of the Realm
      to an overhead view.
      walled: boolean indicates that you want the edges of the Realm to act as walls
      */
      return this;
    }
  }, {
    key: 'asScreen',
    value: function asScreen(_ref2) {
      var _ref2$scrollRight = _ref2.scrollRight,
          scrollRight = _ref2$scrollRight === undefined ? false : _ref2$scrollRight,
          _ref2$scrollLeft = _ref2.scrollLeft,
          scrollLeft = _ref2$scrollLeft === undefined ? false : _ref2$scrollLeft,
          _ref2$scrollUp = _ref2.scrollUp,
          scrollUp = _ref2$scrollUp === undefined ? false : _ref2$scrollUp,
          _ref2$scrollDown = _ref2.scrollDown,
          scrollDown = _ref2$scrollDown === undefined ? false : _ref2$scrollDown,
          _ref2$walled = _ref2.walled,
          walled = _ref2$walled === undefined ? true : _ref2$walled;

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
  }]);

  return Realm;
}();

exports.default = Realm;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Realm = __webpack_require__(5);

var _Realm2 = _interopRequireDefault(_Realm);

var _Circle = __webpack_require__(3);

var _Circle2 = _interopRequireDefault(_Circle);

var _Rect = __webpack_require__(4);

var _Rect2 = _interopRequireDefault(_Rect);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Board = new _Realm2.default('canvas', 0.8, 0.8);
//var Ball = new Circle({x:50,y:50,r:5})
//              .setName('game-ball');
//window.b = Ball;
var Paddle = new _Rect2.default({ x: 150, y: 150, w: 50, h: 15 }).setName('player-paddle');

for (var i = 0; i < 10; i++) {
  Board.register(new _Circle2.default({ x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 100), r: 5 }).setName("c" + i));
}

//Board.register([Paddle]);
Board.addBorder();

window.Board = Board;

Board.animationFrame();

/***/ })
/******/ ]);
import Realm from './Realm';

import Circle from './Assets/Circle';
import Rect from './Assets/Rect';
import Vector from './Physics/Vector';

var Board = new Realm('canvas', 0.8, 0.8)
//var Ball = new Circle({x:50,y:50,r:5})
//              .setName('game-ball');
//window.b = Ball;
var Paddle = new Rect({x:150,y:150,w:50,h:15})
              .setName('player-paddle');

for(let i = 0; i < 10; i++) {
  Board.register(new Circle({x: (Math.floor(Math.random() * 1000)), y: (Math.floor(Math.random() * 100)), r:5}).setName("c" + i))
}

//Board.register([Paddle]);
Board.addBorder();

window.Board=Board;

Board.animationFrame()

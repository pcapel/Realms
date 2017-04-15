import Realm from './Realm';

import Circle from './Assets/Circle';
import Rect from './Assets/Rect';

var Board = new Realm('canvas', 0.8, 0.8)
var Ball = new Circle({x:50,y:50,r:5})
              .setName('game-ball');
var Paddle = new Rect({x:150,y:150,w:50,h:15})
              //.setName('player-paddle');

Board.register([Ball, Paddle]);
Board.addBorder();

Paddle.setY(Paddle.getRealmY() - Paddle.height)

Paddle.draw();
Ball.draw();

Board.animationFrame()

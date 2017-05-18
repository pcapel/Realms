import Realm from './Realm';

import Circle from './Assets/Circle';
import Rect from './Assets/Rect';
import Line from './Assets/Line';
import Vector from './Physics/Vector';

var Board = new Realm('main', 0.8, 0.8)
var Ball = new Circle({x:50,y:50,r:5})
             .setName('game-ball')
             .setElasticity(1);
var Paddle = new Rect({x:Board.width/2,y:Board.height - 15,w:100,h:15})
             .setName('player-paddle')
             .setElasticity(0)
             .addMethod('moveLeft', () => {
               Paddle.vector.theta = -(Math.PI / 2);
               Paddle.vector.magnitude = 5;
              })
             .addMethod('moveRight', () => {
              Paddle.vector.theta = (Math.PI / 2);
              Paddle.vector.magnitude = 5;
              })
             .addMethod('stop', () => {
               Paddle.vector.magnitude = 0;
              });


Board.register([Paddle, Ball])

Board.registerKeyDown("ArrowLeft", Paddle.moveLeft)
Board.registerKeyDown("ArrowRight", Paddle.moveRight)
Board.registerKeyUp(["ArrowRight", "ArrowLeft"], Paddle.stop)



Ball.vector = new Vector({theta: Math.PI, magnitude: 4});

//Board.register([Paddle]);
Board.addBorder();

window.Board=Board;

Board.animationFrame()

"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const FastCar = require('./fastCar.js');
const MiniCoop = require('./miniCoop.js');
const Lilypad = require('./lilypad.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player({x: 0, y: 240})
var background = new Image();
background.src = "assets/Background.png"; 
var carDown = new FastCar({x: (64 * 5) + 40, y: canvas.height}, true);
var miniUp = new MiniCoop({x: (64 * 9)+4, y: canvas.height}, false);
var carUp = new FastCar({x: (64 * 10) + 40, y: canvas.height}, false);
var miniDown = new MiniCoop({x: (64 * 4)+4, y: canvas.height}, true);
var miniMoveSpeed = 2;
var carMoveSpeed = 3;
var lilypads = []; 
var lilyMS = 1;
var lives = 3;
var level = 1;
var score = 0;
var onLily = false;

//var lilypadT = new Lilypad({x: 800, y: 100}, false);
for (var i = 0; i < 5; i++)
{
  lilypads.push(new Lilypad({x: 64*13, y: (i*150) + 50}, false));
  lilypads.push(new Lilypad({x: 64*14, y: (i*150) - 50}, true));
  lilypads.push(new Lilypad({x: 64*15, y: (i*150) + 50}, false));
}
/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
  if(player.x>1200){
    score += (level * 10);
		level+=1;
		player.x=0;
    lilyMS++;
    carMoveSpeed++;
    miniMoveSpeed++;   
	} 
  player.update(elapsedTime, onLily);
  carDown.update(carMoveSpeed);
  miniDown.update(miniMoveSpeed);
  carUp.update(carMoveSpeed);
  miniUp.update(miniMoveSpeed);
  lilypads.forEach(function(lily){
    lily.update(lilyMS);
  });
  if (checkCollision(player, miniUp) || checkCollision(player, miniDown) || checkCollision(player, carUp) || checkCollision(player, carDown))
  {
    player.state = "idle";
    player.hopping = false;
    lives -= 1;
    player.x = 0;
    player.y = 240;
    
  }
	lilypads.forEach(function(lily){
    if (checkCollision(player, lily))
    {
      player.lily = true
      if(player.state == "idle")
      {
        player.x = lily.x;
        player.y = lily.y;
      }
    }
  });
  if (player.x > (64 * 13 + 3) && player.x < (64*16 - 3) && player.lily == false && player.state == "idle")
  {
    player.state = "idle";
    player.hopping = false;
    lives -= 1;
    player.x = 0;
    player.y = 240;

  }
  if (lives <= 0)
  {
    player.state = "dead";
  }
  // TODO: Update the game objects
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if(player.state == "dead")
  {
    ctx.font = "100px Arial";
    ctx.fillText("GAME OVER", canvas.width/2 - 300, canvas.height/2);
    ctx.font = "25px Arial";
    ctx.fillText("Final Score: " +score, canvas.width / 2 - 50, canvas.height/2 + 35);
  }
  else
  {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("SCORE: " +score, 7, canvas.height - 20);
    ctx.fillText("LEVEL: " +level, 7, canvas.height - 40);
	  ctx.fillText("LIVES: " +lives, 7, canvas.height -60);
    /*for (var i = 0; i < canvas.width; i+=16)
    {
      ctx.fillRect(i, 0, 2, canvas.height);
    } */
    carUp.render(ctx);
    miniUp.render(ctx);
    miniDown.render(ctx);
    carDown.render(ctx);
    var temp
    var tempLilys = [];
    lilypads.forEach(function(lily) {
    lily.render(ctx);
  }); 
  player.render(elapsedTime, ctx);
  }
  
}

function checkCollision(thing1, thing2)
{
  if(thing1.x + thing1.width - 1 < thing2.x || thing1.x + 1 > thing2.x + thing2.width || thing1.y + thing1.height - 1 < thing2.y || thing1.y + 1 > thing2.y + thing2.height)
  {
    return false;
  }
  return true;
}


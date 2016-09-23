(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict;"

/* Classes */
const Game = require('./game.js');
const Player = require('./player.js');
const FastCar = require('./fastCar.js');
const MiniCoop = require('./miniCoop.js');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player({x: 0, y: 240})
var background = new Image();
background.src = "assets/Background.png"; 
var carDown = new FastCar({x: (64 * 5) + 40, y: canvas.height}, true);
var miniUp = new MiniCoop({x: (64 * 9)-4, y: canvas.height}, false);
var carUp = new FastCar({x: (64 * 10) + 40, y: canvas.height}, false);
var  miniDown = new MiniCoop({x: (64 * 4)+4, y: canvas.height}, true);
var miniMoveSpeed = 2;
var carMoveSpeed = 3;
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
  player.update(elapsedTime);
  carDown.update(carMoveSpeed);
  miniDown.update(miniMoveSpeed);
  carUp.update(carMoveSpeed);
  miniUp.update(miniMoveSpeed);
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
  ctx.fillStyle = "black";
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  for (var i = 0; i < canvas.width; i+=16)
  {
    ctx.fillRect(i, 0, 2, canvas.height);
  }
  
  player.render(elapsedTime, ctx);
  carUp.render(ctx);
  miniUp.render(ctx);
  miniDown.render(ctx);
  carDown.render(ctx);
}

},{"./fastCar.js":2,"./game.js":3,"./miniCoop.js":4,"./player.js":5}],2:[function(require,module,exports){
"use strict";9

module.exports = exports = FastCar;

function FastCar(position, flipped) {
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 128;
  this.spritesheet  = new Image();
  if (flipped)
  {
    this.spritesheet.src = encodeURI('assets/cars_racer_flipped.png');
  }
  else
  {
    this.spritesheet.src = encodeURI('assets/cars_racer.svg');
  }
  this.flipped = flipped;
  this.spriteColor = getRandomInt(0 , 3);
}

FastCar.prototype.update = function(moveSpeed) {
  if (this.flipped)
  {
    this.y += moveSpeed;
    if (this.y > 600)
    {
    	this.y = -150;
      this.spriteColor = getRandomInt(0 , 3);
    }
  }
  else{
    this.y -= moveSpeed;
    if (this.y < -150)
    {
      this.y = 600;
      this.spriteColor = getRandomInt(0 , 3);
    }
  }
}

FastCar.prototype.render = function(ctx) {
    ctx.drawImage(
		this.spritesheet,
		(this.spriteColor)*390 , 0, 220, 450,
		this.x, this.y, this.width, this.height
	);
  ctx.strokeRect(this.x, this.y, this.width, this.height);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

},{}],3:[function(require,module,exports){
"use strict";

/**
 * @module exports the Game class
 */
module.exports = exports = Game;

/**
 * @constructor Game
 * Creates a new game object
 * @param {canvasDOMElement} screen canvas object to draw into
 * @param {function} updateFunction function to update the game
 * @param {function} renderFunction function to render the game
 */
function Game(screen, updateFunction, renderFunction) {
  this.update = updateFunction;
  this.render = renderFunction;

  // Set up buffers
  this.frontBuffer = screen;
  this.frontCtx = screen.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = screen.width;
  this.backBuffer.height = screen.height;
  this.backCtx = this.backBuffer.getContext('2d');

  // Start the game loop
  this.oldTime = performance.now();
  this.paused = false;
}

/**
 * @function pause
 * Pause or unpause the game
 * @param {bool} pause true to pause, false to start
 */
Game.prototype.pause = function(flag) {
  this.paused = (flag == true);
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
Game.prototype.loop = function(newTime) {
  var game = this;
  var elapsedTime = newTime - this.oldTime;
  this.oldTime = newTime;

  if(!this.paused) this.update(elapsedTime);
  this.render(elapsedTime, this.frontCtx);

  // Flip the back buffer
  this.frontCtx.drawImage(this.backBuffer, 0, 0);
}

},{}],4:[function(require,module,exports){
"use strict";9

module.exports = exports = MiniCoop;

function MiniCoop(position, flipped) {
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 96;
  this.spritesheet  = new Image();
  if (flipped)
  {
    this.spritesheet.src = encodeURI('assets/cars_mini_flipped.png');
  }
  else
  {
    this.spritesheet.src = encodeURI('assets/cars_mini.svg');
  }
  this.flipped = flipped;
  this.spriteColor = getRandomInt(0 , 4);
}

MiniCoop.prototype.update = function(moveSpeed) {
  if (this.flipped)
  {
    this.y += moveSpeed;
    if (this.y > 600)
    {
    	this.y = -150;
      this.spriteColor = getRandomInt(0 , 4);
    }
  }
  else{
    this.y -= moveSpeed;
    if (this.y < -150)
    {
      this.y = 600;
      this.spriteColor = getRandomInt(0 , 4);
    }
  }
}

MiniCoop.prototype.render = function(ctx) {
    ctx.drawImage(
		this.spritesheet, (this.spriteColor)*247, 0, 199, 339, this.x, this.y, this.width, this.height
	);
  ctx.strokeRect(this.x, this.y, this.width, this.height);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
},{}],5:[function(require,module,exports){
"use strict";

const MS_PER_FRAME = 1000/8;
/**
 * @module exports the Player class
 */
module.exports = exports = Player;
/**
 * @constructor Player
 * Creates a new player object
 * @param {Postition} position object specifying an x and y
 */
function Player(position) {
  this.state = "idle";
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/PlayerSprite3.png');
  this.timer = 0;
  this.frame = 0;
  this.hopping = false;
}

/**
 * @function updates the player object
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 */
Player.prototype.update = function(time) {
  switch(this.state) {
    case "idle":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        if(this.frame > 3) this.frame = 0;
      }
      break;
    case "hopRight":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.x += 12;
        if(this.frame > 3) {
          this.frame = 0;
          this.state = "idle";
          this.hopping = false;
        }
      }
      break;
    case "hopUp":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.y -= 12;
        if(this.frame > 3) {
          this.frame = 0;
          this.state = "idle";
          this.hopping = false;
        }
      }
      break;
    case "hopDown":
      this.timer += time;
      if(this.timer > MS_PER_FRAME) {
        this.timer = 0;
        this.frame += 1;
        this.y += 12;
        if(this.frame > 3) {
          this.frame = 0;
          this.state = "idle";
          this.hopping = false;
        }
      }
      break;
    
  }
}

/**
 * @function renders the player into the provided context
 * {DOMHighResTimeStamp} time the elapsed time since the last frame
 * {CanvasRenderingContext2D} ctx the context to render into
 */
Player.prototype.render = function(time, ctx) {
  if (this.hopping)
  {
    ctx.drawImage(
          this.spritesheet,
          this.frame * 64, 0, this.width, this.height,
          this.x, this.y, this.width, this.height
      );
  }
  else
  {
    ctx.drawImage(
        // image
        this.spritesheet,
        // source rectangle
        this.frame * 64, 64, this.width, this.height,
        // destination rectangle
        this.x, this.y, this.width, this.height
      );
  }
}

Player.prototype.moveRight = function() {
  this.state = "hopRight";
  this.hopping = true;
}

window.onkeydown = function(event)
{
	event.preventDefault();
	if(this.state="idle"){
		switch(event.keyCode)
		{
			 case 39:
       case 68:
				this.state = "hopRight"
        this.hopping = true;
				break;			
			 case 38:
			 case 87:
				this.state = "hopUp";
        this.hopping = true;
				break;
			 case 40:
			 case 83:
				this.state = "hopDown";
        this.hopping = true;
				break;
		}
	}
}

window.onkeyup = function(event)
{
	event.preventDefault();
	switch(event.keyCode)
	{
		case 32:
			
			break;
		 case 38:
		 case 87:
			
			break;

		 case 40:
		 case 83:
			
			break;

	}
}

},{}]},{},[1]);

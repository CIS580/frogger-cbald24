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

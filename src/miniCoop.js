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
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
  //ctx.strokeRect(this.x, this.y, this.width, this.height);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

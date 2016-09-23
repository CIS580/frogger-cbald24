"use strict";9

module.exports = exports = Lilypad;

function Lilypad(position, flipped) {
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 64;
  this.sprite  = new Image();
  this.sprite.src = encodeURI('assets/lilypad.png')
  this.flipped = flipped;
}

Lilypad.prototype.update = function(moveSpeed) {
  if (this.flipped)
  {
    this.y += moveSpeed;
    if (this.y > 600)
    {
    	this.y = -150;
    }
  }
  else{
    this.y -= moveSpeed;
    if (this.y < -150)
    {
      this.y = 600;
    }
  }
}

Lilypad.prototype.render = function(ctx) {
    ctx.drawImage(this.sprite, 0, 0, 228, 209, this.x, this.y, this.width, this.height);
    //ctx.strokeRect(this.x, this.y, this.width, this.height);
}
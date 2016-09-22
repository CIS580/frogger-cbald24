


function fastCar(position, color) {
  this.x = position.x;
  this.y = position.y;
  this.width  = 64;
  this.height = 128;
  this.spritesheet  = new Image();
  this.spritesheet.src = encodeURI('assets/cars_racer.svg');
  this.color = color;
  this.top = false;
}

fastCar.prototype.update = function() {
	if (this.top) {this.y += 10;}
    else {this.y -= 10;}
}

fastCar.prototype.render = function(ctx) {
    
}

(function(){
  PHYSICS = {
    GRAVITY: .5,
    FLAP_VEL: -8
  }
  var Bird = window.Bird = function(x,y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vel = 0;
    this.imgup = new Image();
    this.imgup.src = "./images/bird-wing-up.png";
    this.imgdown = new Image();
    this.imgdown.src = "./images/bird-wing-down.png";
		this.currentImage = this.imgup;
		this.flapCounter = 0;
  };

  Bird.prototype = {
    move: function(){
      this.vel += PHYSICS.GRAVITY;
      this.y += this.vel;
    },
    draw: function(ctx){
			if (this.flapCounter < 20) {
	      ctx.drawImage(this.imgdown, this.x, this.y, this.width, this.height);
			} else if (this.flapCounter < 40) {
				ctx.drawImage(this.imgup, this.x, this.y, this.width, this.height);
			}
			this.flapCounter += 1;
			if (this.flapCounter >= 40) {
				this.flapCounter = 0;
			}

    },
    tick: function(ctx){
      this.move(ctx);
      this.draw(ctx);
    },
    flap: function() {
      this.vel = PHYSICS.FLAP_VEL;
    },
    getBounds: function() {
      var coordinates = {
        leftX: this.x,
        leftY: this.y,
        rightX: this.x + this.width,
        rightY: this.y + this.height
      }
      return coordinates;
    }
  }
})();

(function() {
  PIPE_CONSTANTS = {
    SPEED: -4,
    BGSPEED: -.8,
    WIDTH: 90,
    GAP: 200,
		COLOR_STOPS: {
			0: 'rgb(44, 132, 48)',
			0.3: 'rgb(103, 216, 97)',
			0.8: 'rgb(21, 75, 25)',
			1: 'rgb(15, 61, 22)'
		}
  }

  var Level = window.Level = function(canvas) {
    this.pipes = [[500, 100],[810,300],[1120, 200]];
    this.width = canvas.width;
    this.height = canvas.height;
    this.score = 0;
    this.ctx = canvas.getContext("2d");
    this.nextPipe = this.pipes[0];
    this.bgImg = new Image();
    this.bgImg.src = "./images/clouds.png";
    this.bgX = 0;
  }
  Level.prototype = {
    drawBackground: function() {

      if (this.bgX <= (0 - this.width)) {
        this.bgX = 0;
      }
      this.bgX += PIPE_CONSTANTS.BGSPEED;
      this.ctx.drawImage(this.bgImg, this.bgX, 0, 640, 480);
      this.ctx.drawImage(this.bgImg, this.bgX + this.width, 0, 640, 480);

      this.ctx.beginPath();
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
      this.ctx.rect(0,0, this.width, this.height);
      this.ctx.fill();

  },
    movePipes: function(){
      var that = this;
      this.pipes.forEach(function(pipe){
        pipe[0] += PIPE_CONSTANTS.SPEED;
      });
      if (this.pipes[0][0] < (0 - PIPE_CONSTANTS.WIDTH)) {
        var newX = this.pipes[2][0] + 310;
        this.pipes.shift();
        this.nextPipe = this.pipes[0];
        var newY = Math.random() * (this.height - PIPE_CONSTANTS.GAP);
        this.pipes.push([newX, newY]);
      }
      this.drawPipes();
    },
    drawPipes: function() {
      var that = this;
      this.pipes.forEach(function(pipe){
				var pipeGradient = that.ctx.createLinearGradient(pipe[0] - 5, 0, pipe[0] + PIPE_CONSTANTS.WIDTH + 10, 0);
				var stops = PIPE_CONSTANTS.COLOR_STOPS;
				for (var stop in stops) {
					pipeGradient.addColorStop(stop, stops[stop]);
				}
				
        that.ctx.beginPath();
				that.ctx.fillStyle = pipeGradient;
        that.ctx.rect(pipe[0], 0, PIPE_CONSTANTS.WIDTH, pipe[1] - 20);
        that.ctx.fill();

        that.ctx.beginPath();
				that.ctx.fillStyle = pipeGradient;
        that.ctx.rect(pipe[0]-5, pipe[1] - 20, PIPE_CONSTANTS.WIDTH + 10, 20);
        that.ctx.fill();


        that.ctx.beginPath();
				that.ctx.fillStyle = pipeGradient;
        that.ctx.rect(pipe[0], pipe[1] + PIPE_CONSTANTS.GAP + 20, PIPE_CONSTANTS.WIDTH, that.height) - 20;
        that.ctx.fill();

        that.ctx.beginPath();
				that.ctx.fillStyle = pipeGradient;
        that.ctx.rect(pipe[0] - 5, pipe[1] + PIPE_CONSTANTS.GAP, PIPE_CONSTANTS.WIDTH + 10, 20);
        that.ctx.fill();

      });
    },
    tick: function() {
      this.drawBackground();
      this.movePipes();
    },
    collidesWith: function(bounds) {
      var collides = false;
      if (0 > bounds.leftY || this.height < bounds.rightY) {
        collides = true;
      }
      this.pipes.forEach(function(pipe){
        if ((bounds.rightX > pipe[0] && bounds.leftX < pipe[0] + PIPE_CONSTANTS.WIDTH) &&
          (bounds.leftY < pipe[1] || bounds.rightY > pipe[1] + PIPE_CONSTANTS.GAP)) {
            collides = true;
          }
      });
      return collides;
    },
    checkScore: function(bounds) {
      if (bounds.leftX > this.nextPipe[0] + PIPE_CONSTANTS.WIDTH) {
        this.nextPipe = this.pipes[1];
        this.score += 1;
				if (this.score > highScore) {
					highScore = this.score;
				}
      }
    }
  }
})();

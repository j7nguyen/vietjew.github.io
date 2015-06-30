DIRECTION_OFFSETS = {"U": [-1, 0], "D": [1, 0], "L": [0, -1], "R": [0, 1]}
DIRECTION_KEYCODES_OPPOSITES = {
  37: ["L", "R"],
  38: ["U", "D"],
  39: ["R", "L"],
  40: ["D", "U"]
  }
var highScore = 0;
var width;

var Board = React.createClass({displayName: "Board",
  getInitialState: function() {
    var states = [];
    for (var i = 0; i <= this.props.size; i++) {
      var row = [];
      for (var j = 0; j <= this.props.size; j++) {
        row.push('empty');
      }
      states.push(row);
    }
    var center = Math.floor(this.props.size / 2)
    return ({
      states: states,
      snake: {segments: [[center, center]], direction: "U"},
      score: 0
    })
  },
  componentDidMount: function() {
    var newStates = this.drawSnake();
    this.setState({states: newStates});
    document.body.addEventListener('keydown', this.setDirection);
    this.generateApple(this.state.snake.segments);

    this.Running = setInterval(function(){
			if(this.isMounted()){
				this.tick();
			}
		}.bind(this), 150);
  },
	componentWillUnmount: function() {
		document.body.removeEventListener('keydown', this.setDirection);
	},
  drawSnake: function() {
    var newStates = this.state.states;
    this.state.snake.segments.forEach(function(segment){
      var x = segment[0],
          y = segment[1];
      newStates[x][y] = "snake";
    });
    return newStates;
  },
  checkCollision: function(segment) {
    var row = segment[0], col = segment[1];
    var width = this.props.size;
    var atEdge = (row < 0 || col < 0 || row > width || col > width);
    var selfCollide = this.state.snake.segments.indexOf(segment);
    var snakeSegs = this.state.snake.segments;
    this.state.snake.segments.forEach(function(snakeSeg){
      var collided = (snakeSeg[0] === segment[0] && snakeSeg[1] === segment[1])
      if (collided || atEdge) {
        window.clearInterval(this.Running);
        document.getElementById('score').innerHTML =
        "<h1>GAME OVER!</h1><h2>Final Score: " + this.state.score + "</h2>" +
				"<h2>High score: " + window.highScore + "</h2>" +
        "<h2>Press Space to play again!</h2>";
				window.highScore = this.state.score;
				var startGame = function(event){
					if (event.keyCode === 32) {
						window.newGame(width);
						document.body.removeEventListener('keydown', startGame);
					}
				}
				document.body.addEventListener('keydown', startGame);
			}

    }.bind(this))
  },
  generateApple: function() {
    var found = false;
    var newRow, newCol;
    while (found === false) {
      newRow = Math.floor(Math.random() * this.props.size);
      newCol = Math.floor(Math.random() * this.props.size);
      var snakeSegs = this.state.snake.segments;
      if (this.state.states[newRow][newCol] === 'empty') {
        found = true;
        this.state.states[newRow][newCol] = "apple";
      }
    }
  },
  determineDirection: function(keyCode) {
    var currentDirection = this.state.snake.direction;
		var alone = this.state.snake.segments.length === 1;
    if (alone || currentDirection !=DIRECTION_KEYCODES_OPPOSITES[keyCode][1]) {
      return DIRECTION_KEYCODES_OPPOSITES[keyCode][0];
    } else {
      return currentDirection;
    }
  },
  setDirection: function(event) {
    var newDirection;
    newDirection = this.determineDirection(event.keyCode);
		if (this.directionSet === false) {
				this.state.snake.direction = newDirection;
				this.directionSet = true;
		}
  },
  tick: function() {
		this.directionSet = false;
    var newSegs = this.state.snake.segments.slice(0);
    var currentDirection = this.state.snake.direction;
    var frontSeg = newSegs[newSegs.length - 1];
    var nextSeg = frontSeg.slice(0);
    nextSeg[0] = nextSeg[0] + DIRECTION_OFFSETS[this.state.snake.direction][0];
    nextSeg[1] = nextSeg[1] + DIRECTION_OFFSETS[this.state.snake.direction][1];
    var checked = this.checkCollision(nextSeg);
    newSegs.push(nextSeg);
    var newStates = this.state.states;
    var revert = newSegs.shift();
    if (this.state.states[nextSeg[0]][nextSeg[1]] === "apple") {
      newSegs.unshift(revert);
      var newScore = this.state.score + 1;
      this.setState({score: newScore});
      this.generateApple();
    } else {
      newStates[revert[0]][revert[1]] = 'empty';
    }
    newSegs.forEach(function(seg){
      newStates[seg[0]][seg[1]] = 'snake';
    });
    this.setState({states: newStates, snake: {segments: newSegs, direction: currentDirection}});
  },
  render: function() {
    var tiles = [];
    for(var i=0;i<=this.props.size;i++) {
      var row = [];
      for(var j=0;j<=this.props.size;j++) {
        row.push(React.createElement(Tile, {key: j, className: this.state.states[i][j], type: this.state.states[i][j]}));
      }
      tiles.push(React.createElement("ul", {key: i}, row));
    }
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "board"}, tiles), 
        React.createElement("div", {id: "score"}, React.createElement("h2", null, "Score: ", this.state.score))
      ));
  }
});

var Tile = React.createClass({displayName: "Tile",
  getInitialState: function() {
    return {type: 'empty'};
  },
  render: function() {
    return (React.createElement("li", {className: this.props.type, type: this.props.type}))
  }
});

var newGame = function(width) {
	React.unmountComponentAtNode(document.getElementById('board'));
	React.render(React.createElement(Board, {size: width}), document.getElementById('board'));
}

var SizeSelector = React.createClass({displayName: "SizeSelector",
	newGame: function() {
		var width = parseInt(this.props.width);
		window.width = width;
		React.unmountComponentAtNode(document.getElementById('board'));
		React.render(React.createElement(Board, {size: width}), document.getElementById('board'));
	},
	render: function() {
		return (
		React.createElement("div", {className: "sizeButton", onClick: this.newGame}, React.createElement("h3", null, this.props.text))
		)
	}
})

React.render(
	React.createElement("div", null, 
		React.createElement(SizeSelector, {width: 7, text: "Small (7x7)"}), 
		React.createElement(SizeSelector, {width: 10, text: "Medium (10x10)"}), 
		React.createElement(SizeSelector, {width: 15, text: "Large (15x15)"})
	), document.getElementById('board'));

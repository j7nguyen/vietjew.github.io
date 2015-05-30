DIRECTION_OFFSETS = {"U": [-1, 0], "D": [1, 0], "L": [0, -1], "R": [0, 1]}

var highScore = 0;

var Board = React.createClass({
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
				document.body.addEventListener('keydown', function(event){
					if (event.keyCode === 32) {
						window.newGame();
					}
				});
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
  setDirection: function(event) {
    var newDirection;
		var currentDirection = this.state.snake.direction;
		var alone = this.state.snake.segments.length === 1;
    switch(event.keyCode) {
      case 37:
				if (alone || currentDirection !== "R"){
	        newDirection = "L";					
				} else {
					newDirection = currentDirection;
				}
        break;
      case 38:
				if (alone || currentDirection !== "D"){
	        newDirection = "U";					
				} else {
					newDirection = currentDirection;
				}
        break;
      case 39:
				if (alone || currentDirection !== "L"){
	        newDirection = "R";					
				} else {
					newDirection = currentDirection;
				}
        break;
      case 40:
				if (alone || currentDirection !== "U"){
	        newDirection = "D";					
				} else {
					newDirection = currentDirection;
				}
        break;
    }
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
        row.push(<Tile key={j} className={this.state.states[i][j]} type={this.state.states[i][j]} />);
      }
      tiles.push(<ul key={i}>{row}</ul>);
    }
    return (
      <div>
        <div className="board">{tiles}</div>
        <div id="score"><h2>Score: {this.state.score}</h2></div>
      </div>);
  }
});

var Tile = React.createClass({
  getInitialState: function() {
    return {type: 'empty'};
  },
  render: function() {
    return (<li className={this.props.type} type={this.props.type}></li>)
  }
});

var newGame = function() {
	React.unmountComponentAtNode(document.getElementById('board'));
	React.render(<Board size={10} />, document.getElementById('board'));
}

newGame();
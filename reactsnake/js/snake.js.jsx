DIRECTION_OFFSETS = {"U": [-1, 0], "D": [1, 0], "L": [0, -1], "R": [0, 1]}

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
    this.Running = setInterval(this.tick, 150);
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
        "<h1>GAME OVER!</h1><h2>Final Score: " + this.state.score + "</h2>";
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
    switch(event.keyCode) {
      case 37:
        newDirection = "L";
        break;
      case 38:
        newDirection = "U";
        break;
      case 39:
        newDirection = "R";
        break;
      case 40:
        newDirection = "D";
        break;
    }
    this.state.snake.direction = newDirection;
  },
  tick: function() {
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
  newSegment: function(coords) {
    var newSnake = this.state.snake;
    newSnake.segments.push(coords);
    this.setState({snake: newSnake});
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

React.render(<Board size={10} />, document.body);

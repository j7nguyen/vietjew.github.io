(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
  };

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  var TowersUI = Hanoi.TowersUI = function () {
    this.game = new Game();
    this.render();
    this.currentClick = undefined;
  };

  TowersUI.prototype.buildDivs = function () {
      var divString = '<div class="game">';
      for (var i = 0; i < 3; i++) {
        divString += '<div class="tower" id="' + i + '">';
        for (var j = 2; j >= 0; j--) {
          divString += '<div class="disc" id="' + i + '-' + j + '"></div>';
        }
        divString += '</div>';
      }
      divString += '</div>';
      return divString;
    }

  TowersUI.prototype.render = function () {
    console.log(root.$('div.game'));
    root.$(".game").replaceWith(this.buildDivs());

    //here's where we toggle div classes
    this.game.towers.forEach(function (tower, t_idx) {
      if (tower.length) {
        tower.forEach(function (disc, d_idx) {
          root.$('#' + t_idx + '-' + d_idx).toggleClass('disc' + disc)
        });
      }
    });
  };

  TowersUI.prototype.installHandlers = function () {
    // root.$()
    var currentGame = this;
    $('.game').on('click','.tower',function(event) {
      if (currentGame.currentClick === undefined) {
        currentGame.currentClick = $(event.currentTarget).attr('id');
        $(event.currentTarget).toggleClass('highlighted');
      } else {
        var moved = currentGame.game.move(currentGame.currentClick,
          $(event.currentTarget).attr('id'));
        if (!moved) {alert('Invalid move!');};
        currentGame.render();
        currentGame.currentClick = undefined;
        if (currentGame.game.isWon()) {
          alert('You win!');
        } else {
          currentGame.installHandlers();
        }
      }
    });
  };

})(this);

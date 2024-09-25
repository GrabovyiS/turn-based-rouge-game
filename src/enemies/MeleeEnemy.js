function MeleeEnemy(grid, options) {
  var maxHealth = options.maxHealth;
  var damage = options.damage;

  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;

  var direction;
  var currentDirection;
  var randomizeWalking = Math.random();
  if (randomizeWalking < 0.5) {
    direction = "leftToRight";
    var randomizeCurrentDirection = Math.random();

    if (randomizeCurrentDirection < 0.5) {
      currentDirection = "left";
    } else {
      currentDirection = "right";
    }
  } else if (randomizeWalking >= 0.5) {
    direction = "topToBottom";
    var randomizeCurrentDirection = Math.random();

    if (randomizeCurrentDirection < 0.5) {
      currentDirection = "top";
    } else {
      currentDirection = "bottom";
    }
  }

  function makeTurn() {
    var ownCoords = this.getOwnCoords();
    var ownX = ownCoords.x;
    var ownY = ownCoords.y;
    var heroCoords = getHeroCoords(grid);

    if (heroInRange(heroCoords, ownCoords)) {
      var hero = grid[heroCoords.y][heroCoords.x];
      hero.currentHealth = hero.currentHealth - this.damage;
      return;
    }

    if (this.direction === "leftToRight") {
      if (this.currentDirection === "right") {
        if (canGoThere(ownX + 1, ownY)) {
          move(ownX, ownY, ownX + 1, ownY);
        } else if (canGoThere(ownX - 1, ownY)) {
          this.currentDirection = "left";
          move(ownX, ownY, ownX - 1, ownY);
        } else if (canGoThere(ownX, ownY + 1)) {
          move(ownX, ownY, ownX, ownY + 1);
        } else if (canGoThere(ownX, ownY - 1)) {
          move(ownX, ownY, ownX, ownY - 1);
        }

        return;
      }

      if (this.currentDirection === "left") {
        if (canGoThere(ownX - 1, ownY)) {
          move(ownX, ownY, ownX - 1, ownY);
        } else if (canGoThere(ownX + 1, ownY)) {
          this.currentDirection = "right";
          move(ownX, ownY, ownX + 1, ownY);
        } else if (canGoThere(ownX, ownY + 1)) {
          move(ownX, ownY, ownX, ownY + 1);
        } else if (canGoThere(ownX, ownY - 1)) {
          move(ownX, ownY, ownX, ownY - 1);
        }

        return;
      }
    }

    if (this.direction === "topToBottom") {
      if (this.currentDirection === "top") {
        if (canGoThere(ownX, ownY - 1)) {
          move(ownX, ownY, ownX, ownY - 1);
        } else if (canGoThere(ownX, ownY + 1)) {
          this.currentDirection = "bottom";
          move(ownX, ownY, ownX, ownY + 1);
        } else if (canGoThere(ownX - 1, ownY)) {
          move(ownX, ownY, ownX - 1, ownY);
        } else if (canGoThere(ownX + 1, ownY)) {
          move(ownX, ownY, ownX + 1, ownY);
        }

        return;
      }

      if (this.currentDirection === "bottom") {
        if (canGoThere(ownX, ownY + 1)) {
          move(ownX, ownY, ownX, ownY + 1);
        } else if (canGoThere(ownX, ownY - 1)) {
          this.currentDirection = "top";
          move(ownX, ownY, ownX, ownY - 1);
        } else if (canGoThere(ownX - 1, ownY)) {
          move(ownX, ownY, ownX - 1, ownY);
        } else if (canGoThere(ownX + 1, ownY)) {
          move(ownX, ownY, ownX + 1, ownY);
        }

        return;
      }
    }
  }

  function canGoThere(x, y) {
    if (x < 0 || x >= gameFieldWidth || y < 0 || y >= gameFieldHeight) {
      return false;
    }

    if (typeof grid[y][x] === "object") {
      if (grid[y][x].type === "hero") {
        return false;
      }

      if (grid[y][x].type === "enemy") {
        return false;
      }
    }

    if (isWallTile(grid[y][x])) {
      return false;
    }

    return true;
  }

  function heroInRange(heroCoords, ownCoords) {
    for (var i = heroCoords.y - 1; i < heroCoords.y + 2; i++) {
      for (var j = heroCoords.x - 1; j < heroCoords.x + 2; j++) {
        if (i === ownCoords.y && j === ownCoords.x) {
          return true;
        }
      }
    }

    return false;
  }

  function move(oldX, oldY, newX, newY) {
    var enemy = grid[oldY][oldX];

    if (grid[oldY][oldX].tileBehind) {
      grid[oldY][oldX] = grid[oldY][oldX].tileBehind;
      enemy.tileBehind = null;
    } else {
      grid[oldY][oldX] = EmptyTile();
    }

    // 'hide' pickups instead of destroying them
    // could work the same for different types of terrains
    if (typeof grid[newY][newX] === "object") {
      if (grid[newY][newX].type === "heroPickUp") {
        enemy.tileBehind = grid[newY][newX];
      }
    }

    grid[newY][newX] = enemy;
  }

  var meleeEnemy = Enemy(grid, {
    name: "meleeEnemy",
    maxHealth,
    damage,
    makeTurn,
  });

  meleeEnemy.styleClass = "tileE";
  meleeEnemy.move = move;
  meleeEnemy.direction = direction;
  meleeEnemy.currentDirection = currentDirection;

  return meleeEnemy;
}

function MeleeEnemy(grid, maxHealth, damage) {
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

  console.log("creating", direction, currentDirection);

  function makeTurn() {
    const ownCoords = this.getOwnCoords();
    const ownX = ownCoords.x;
    const ownY = ownCoords.y;
    const heroCoords = getHeroCoords(grid);

    if (heroInRange(heroCoords, ownCoords)) {
      const hero = grid[heroCoords.y][heroCoords.x];
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

    if (grid[y][x] === "Wall") {
      return false;
    }

    return true;
  }

  function heroInRange(heroCoords, ownCoords) {
    for (let i = heroCoords.y - 1; i < heroCoords.y + 2; i++) {
      for (let j = heroCoords.x - 1; j < heroCoords.x + 2; j++) {
        if (i === ownCoords.y && j === ownCoords.x) {
          return true;
        }
      }
    }

    return false;
  }

  function move(oldX, oldY, newX, newY) {
    var enemy = grid[oldY][oldX];
    grid[oldY][oldX] = "Empty";

    if (grid[oldY][oldX].hidden) {
      grid[oldY][oldX] = hidden;
      grid[oldY][oldX].hidden = null;
    }

    grid[newY][newX] = enemy;

    if (typeof grid[newY][newX] === "object") {
      if (grid[newY][newX].type === "heroPickUp") {
        // hide that
      }
    }
  }

  const meleeEnemy = Enemy(grid, "meleeEnemy", maxHealth, damage, makeTurn);
  meleeEnemy.styleClass = "tileE";
  meleeEnemy.move = move;
  meleeEnemy.direction = direction;
  meleeEnemy.currentDirection = currentDirection;

  return meleeEnemy;
}

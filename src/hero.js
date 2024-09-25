function Hero(grid, maxHealth, baseDamage, currentHeroCoords) {
  var currentHealth = maxHealth;
  var damage = baseDamage;
  var type = "hero";
  var styleClass = "tileP";

  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;

  function makeTurn(keyCode) {
    var currentHeroCoords = getHeroCoords(grid);
    var currentHeroX = currentHeroCoords.x;
    var currentHeroY = currentHeroCoords.y;

    switch (keyCode) {
      case "KeyW":
        if (canGoThere(currentHeroX, currentHeroY - 1)) {
          moveHero(currentHeroX, currentHeroY, currentHeroX, currentHeroY - 1);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "KeyS":
        if (canGoThere(currentHeroX, currentHeroY + 1)) {
          moveHero(currentHeroX, currentHeroY, currentHeroX, currentHeroY + 1);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "KeyA":
        if (canGoThere(currentHeroX - 1, currentHeroY)) {
          moveHero(currentHeroX, currentHeroY, currentHeroX - 1, currentHeroY);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "KeyD":
        if (canGoThere(currentHeroX + 1, currentHeroY)) {
          moveHero(currentHeroX, currentHeroY, currentHeroX + 1, currentHeroY);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "Space":
        for (var i = currentHeroY - 1; i < currentHeroY + 2; i++) {
          for (var j = currentHeroX - 1; j < currentHeroX + 2; j++) {
            if (i < 0 || j < 0 || i >= gameFieldHeight || j >= gameFieldWidth) {
              continue;
            }

            if (typeof grid[i][j] === "object") {
              if (grid[i][j].type === "enemy") {
                var hero = grid[currentHeroY][currentHeroX];
                grid[i][j].currentHealth =
                  grid[i][j].currentHealth - hero.damage;

                if (grid[i][j].currentHealth <= 0) {
                  // this should check if this cell object has a hidden
                  // and if it does, show hidden stuff instead (the same for moving enemy);
                  grid[i][j] = "empty";
                }
              }
            }
          }
        }
      default:
        break;
    }
  }

  function moveHero(oldX, oldY, newX, newY) {
    var currentHeroX = oldX;
    var currentHeroY = oldY;

    if (typeof grid[newY][newX] === "object") {
      if (grid[newY][newX].type === "heroPickUp") {
        grid[newY][newX].effect();
      }
    }

    var hero = grid[currentHeroY][currentHeroX];
    grid[currentHeroY][currentHeroX] = "empty";

    grid[newY][newX] = hero;
  }

  function canGoThere(x, y) {
    if (x < 0 || x >= gameFieldWidth || y < 0 || y >= gameFieldHeight) {
      return false;
    }

    if (typeof grid[y][x] === "object") {
      if (grid[y][x].type === "enemy") {
        return false;
      }
    }

    if (grid[y][x] === "wall") {
      return false;
    }

    return true;
  }

  return {
    type,
    currentHealth,
    maxHealth,
    baseDamage,
    styleClass,
    damage,
    makeTurn,
  };
}

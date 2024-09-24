function rougeGame() {
  var gameFieldWidth = 40;
  var gameFieldHeight = 24;
  var grid;

  // Instead of searching through the grid for hero coords every turn
  // we remember and update hero's position
  var currentHeroCoords;
  // The same for enemies
  var currentEnemiesCoords;
  var fieldContainer = document.querySelector(".field");

  function initGameGrid() {
    grid = Grid(gameFieldWidth, gameFieldHeight);

    createRandomlyPlacedEntities(grid, 2, HeroSword);
    createRandomlyPlacedEntities(grid, 10, HeroFlask);

    createRandomlyPlacedEntities(grid, 10, Enemy, 10, 5);
    currentEnemiesCoords = getEnemiesCoords(grid);

    createRandomlyPlacedEntities(grid, 1, Hero, 100, 5);
    currentHeroCoords = getHeroCoords(grid);

    setUpEventListeners();

    renderField();
  }

  function setUpEventListeners() {
    window.addEventListener("keydown", (e) => {
      // if (!playersTurn) {
      //   return;
      // }

      if (
        e.key !== "w" &&
        e.key !== "a" &&
        e.key !== "s" &&
        e.key !== "d" &&
        e.key !== " "
      ) {
        return;
      }

      const hero = grid[currentHeroCoords.y][currentHeroCoords.x];
      makePlayerTurn(e.key);

      // and wait for it
      // makeEnemiesTurn();
    });
  }

  function heroCanMakeMoveThere(x, y) {
    if (x >= gameFieldWidth || y >= gameFieldHeight) {
      return false;
    }

    if (typeof grid[y][x] === "object") {
      if (grid[y][x].type === "enemy") {
        return false;
      }
    }

    if (grid[y][x] === "Wall") {
      return false;
    }

    return true;
  }

  function movePlayer(x, y) {
    var currentHeroX = currentHeroCoords.x;
    var currentHeroY = currentHeroCoords.y;

    if (typeof grid[y][x] === "object") {
      if (grid[y][x].type === "heroPickUp") {
        grid[y][x].effect();
      }
    }

    var hero = grid[currentHeroY][currentHeroX];
    grid[currentHeroY][currentHeroX] = "Empty";

    grid[y][x] = hero;
    currentHeroCoords = { x, y };
  }

  function makePlayerTurn(key) {
    var currentHeroX = currentHeroCoords.x;
    var currentHeroY = currentHeroCoords.y;

    switch (key) {
      case "w":
        if (heroCanMakeMoveThere(currentHeroX, currentHeroY - 1)) {
          movePlayer(currentHeroX, currentHeroY - 1);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "s":
        if (heroCanMakeMoveThere(currentHeroX, currentHeroY + 1)) {
          movePlayer(currentHeroX, currentHeroY + 1);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "a":
        if (heroCanMakeMoveThere(currentHeroX - 1, currentHeroY)) {
          movePlayer(currentHeroX - 1, currentHeroY);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case "d":
        if (heroCanMakeMoveThere(currentHeroX + 1, currentHeroY)) {
          movePlayer(currentHeroX + 1, currentHeroY);
        } else {
          // do something so that the turn is not skipped
        }
        break;

      case " ":
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

                console.log(grid[i][j]);
                console.log("hit");

                if (grid[i][j].currentHealth <= 0) {
                  grid[i][j] = "Empty";
                }
              }
            }
          }
        }
      default:
        break;
    }

    renderField();
  }

  // function makeEnemiesTurn() {
  //   for (var i = 0; i < currentEnemiesCoords.length; i++) {}
  // }

  function renderField() {
    fieldContainer.textContent = "";

    for (var i = 0; i < gameFieldHeight; i++) {
      for (var j = 0; j < gameFieldWidth; j++) {
        var currentTile = document.createElement("div");
        if (grid[i][j] === "Empty") {
          currentTile.classList.add("tile");
        } else if (grid[i][j] === "Wall") {
          currentTile.classList.add("tile", "tileW");
        } else if (grid[i][j] === "Sword") {
          currentTile.classList.add("tile", "tileSW");
        } else if (grid[i][j] === "Flask") {
          currentTile.classList.add("tile", "tileHP");
        } else if (typeof grid[i][j] === "object") {
          if (grid[i][j].type === "enemy") {
            var enemy = grid[i][j];
            currentTile.classList.add("tile", "tileE");

            var health = document.createElement("div");
            health.classList.add("health");

            var healthPercentage = Math.floor(
              (enemy.currentHealth / enemy.maxHealth) * 100
            );
            health.style.setProperty(
              "--health",
              `${healthPercentage > 100 ? 100 : healthPercentage}%`
            );

            currentTile.appendChild(health);
          }

          if (grid[i][j].type === "hero") {
            var hero = grid[i][j];
            currentTile.classList.add("tile", "tileP");

            var health = document.createElement("div");
            health.classList.add("health");

            var healthPercentage = Math.floor(
              (hero.currentHealth / hero.maxHealth) * 100
            );
            health.style.setProperty(
              "--health",
              `${healthPercentage > 100 ? 100 : healthPercentage}%`
            );

            currentTile.appendChild(health);
          }

          if (grid[i][j].type === "heroPickUp") {
            currentTile.classList.add("tile", grid[i][j].styleClass);
          }
        }

        fieldContainer.appendChild(currentTile);
      }
    }
  }

  return { initGameGrid };
}

var game = rougeGame();
game.initGameGrid();

function rougeGame() {
  var gameFieldWidth = 40;
  var gameFieldHeight = 24;
  var grid;

  var enemies;

  var fieldContainer = document.querySelector(".field");

  function initGameGrid() {
    grid = Grid(gameFieldWidth, gameFieldHeight);

    createRandomlyPlacedEntities(grid, 2, HeroSword);
    createRandomlyPlacedEntities(grid, 10, HeroFlask);
    createRandomlyPlacedEntities(grid, 4, HeroTriggeredBomb);

    createRandomlyPlacedEntities(grid, 1, MeleeBoss, 100, 10);
    createRandomlyPlacedEntities(grid, 10, MeleeEnemy, 10, 5);
    enemies = getEnemies(grid);

    createRandomlyPlacedEntities(grid, 1, Hero, 100, 3);

    setUpEventListeners();

    console.log(grid);

    renderField();
  }

  function setUpEventListeners() {
    window.addEventListener("keydown", (e) => {
      // if (!playersTurn) {
      //   return;
      // }

      if (
        e.code !== "KeyW" &&
        e.code !== "KeyA" &&
        e.code !== "KeyS" &&
        e.code !== "KeyD" &&
        e.code !== "Space"
      ) {
        return;
      }

      const currentHeroCoords = getHeroCoords(grid);
      const hero = grid[currentHeroCoords.y][currentHeroCoords.x];
      hero.makeTurn(e.code);
      renderField();

      clearDeadEnemies();
      if (enemies.length === 0) {
        // show victory screen
      }

      // and wait for it
      setTimeout(() => {
        makeEnemiesTurn();
        renderField();
      }, 35);
    });
  }

  function clearDeadEnemies() {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].currentHealth <= 0) {
        enemies.splice(i, 1);
        i--;
      }
    }
  }

  function makeEnemiesTurn() {
    var timeOffset = 0;
    enemies.forEach((enemy) => {
      setTimeout(() => {
        enemy.makeTurn();
        renderField();
      }, timeOffset);

      timeOffset += 30;
    });
  }

  function renderField() {
    fieldContainer.textContent = "";

    for (var i = 0; i < gameFieldHeight; i++) {
      for (var j = 0; j < gameFieldWidth; j++) {
        var currentTile = document.createElement("div");
        if (grid[i][j] === "empty") {
          currentTile.classList.add("tile");
        } else if (grid[i][j] === "wall") {
          currentTile.classList.add("tile", "tileW");
        } else if (grid[i][j] === "Sword") {
          currentTile.classList.add("tile", "tileSW");
        } else if (grid[i][j] === "Flask") {
          currentTile.classList.add("tile", "tileHP");
        } else if (typeof grid[i][j] === "object") {
          if (grid[i][j].type === "enemy") {
            var enemy = grid[i][j];
            currentTile.classList.add("tile", "tileE");

            if (grid[i][j].name === "meleeBoss") {
              currentTile.classList.add("tileB");
            }

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

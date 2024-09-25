function rougeGame() {
  var gameFieldWidth = 40;
  var gameFieldHeight = 24;
  var grid;

  var enemies;

  var isPlayersTurn;

  var fieldContainer = document.querySelector(".field");

  function initGameGrid() {
    grid = Grid(gameFieldWidth, gameFieldHeight);

    createRandomlyPlacedEntities(grid, 2, HeroSword);
    createRandomlyPlacedEntities(grid, 10, HeroFlask);
    createRandomlyPlacedEntities(grid, 4, HeroTriggeredBomb);

    createRandomlyPlacedEntities(grid, 0, MeleeBoss, 100, 10);
    createRandomlyPlacedEntities(grid, 1, MeleeEnemy, 10, 5);
    enemies = getEnemies(grid);

    createRandomlyPlacedEntities(grid, 1, Hero, 100, 3);

    setUpEventListeners();

    renderField();

    isPlayersTurn = true;
  }

  function showIntroductionOverlay() {
    isPlayersTurn = false;

    var overlay = introductionOverlay(() => {
      overlay.remove();
      isPlayersTurn = true;
    });
    fieldContainer.appendChild(overlay);
  }

  function listenToPlayerInput(e) {
    if (!isPlayersTurn) {
      return;
    }

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

    if (hero.currentHealth <= 0) {
      showDefeatScreen();
      isPlayersTurn = false;
      return;
    }

    if (hero.canMakeTurn(e.code)) {
      hero.makeTurn(e.code);
    } else {
      return;
    }

    isPlayersTurn = false;

    renderField();

    clearDeadEnemies();
    if (enemies.length === 0) {
      showVictoryScreen();
      return;
    }

    // and wait for it
    setTimeout(() => {
      makeEnemiesTurn();
      renderField();
    }, 30);
  }

  function setUpEventListeners() {
    // To eliminate duplicate listeners on restarts
    window.removeEventListener("keydown", listenToPlayerInput);
    window.addEventListener("keydown", listenToPlayerInput);
  }

  function showVictoryScreen() {
    var overlay = victoryOverlay(initGameGrid);
    fieldContainer.appendChild(overlay);
  }

  function showDefeatScreen() {
    var overlay = defeatOverlay(initGameGrid);
    fieldContainer.appendChild(overlay);
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

    // Allow player to make a next turn when all the enemies' turns are done
    setTimeout(() => {
      isPlayersTurn = true;
    }, timeOffset);
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

  return { initGameGrid, showIntroductionOverlay };
}

var game = rougeGame();

game.initGameGrid();
game.showIntroductionOverlay();

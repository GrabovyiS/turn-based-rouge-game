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

    render();

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

    render();

    clearDeadEnemies();
    if (enemies.length === 0) {
      showVictoryScreen();
      return;
    }

    // and wait for it
    setTimeout(() => {
      makeEnemiesTurn();
      render();
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
        render();
      }, timeOffset);

      timeOffset += 30;
    });

    // Allow player to make a next turn when all the enemies' turns are done
    setTimeout(() => {
      isPlayersTurn = true;
    }, timeOffset);
  }

  function render() {
    fieldContainer.textContent = "";

    for (var i = 0; i < gameFieldHeight; i++) {
      for (var j = 0; j < gameFieldWidth; j++) {
        var currentTile = document.createElement("div");
        currentTile.classList.add("tile");
        currentTile.classList.add(grid[i][j].styleClass);

        currentTile.classList.add(grid[i][j].styleClass);

        if (grid[i][j].type === "enemy") {
          var enemy = grid[i][j];

          var health = createCharacterHealthElement(enemy);
          currentTile.appendChild(health);
        }

        if (grid[i][j].type === "hero") {
          var hero = grid[i][j];
          renderInventory(hero);

          var health = createCharacterHealthElement(hero);
          currentTile.appendChild(health);
        }

        fieldContainer.appendChild(currentTile);
      }
    }
  }

  return { initGameGrid, showIntroductionOverlay, render };
}

var game = rougeGame();

game.initGameGrid();
game.showIntroductionOverlay();

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

    var bossOptions = { maxHealth: 100, damage: 10 };
    createRandomlyPlacedEntities(grid, 1, MeleeBoss, bossOptions);
    var enemyOptions = { maxHealth: 10, damage: 3 };
    createRandomlyPlacedEntities(grid, 10, MeleeEnemy, enemyOptions);
    enemies = getEnemies(grid);

    var heroOptions = { maxHealth: 100, baseDamage: 3 };
    createRandomlyPlacedEntities(grid, 1, Hero, heroOptions);

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

    var currentHeroCoords = getHeroCoords(grid);
    var hero = grid[currentHeroCoords.y][currentHeroCoords.x];

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
    }, 25);
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

      timeOffset += 25;
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

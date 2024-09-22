// W means wall

function rougeGame() {
  const gameFieldWWidth = 40;
  const gameFieldHeight = 24;
  const grid = [];

  // Instead of searching through the grid for hero coords every turn
  // we remember and update hero's position
  let currentHeroCoords;
  // The same for enemies
  let currentEnemiesCoords = [];
  const fieldContainer = document.querySelector(".field");

  function initGameGrid() {
    for (let i = 0; i < gameFieldHeight; i++) {
      grid.push([]);
      for (let j = 0; j < gameFieldWWidth; j++) {
        grid[i].push("Wall");
      }
    }

    createRandomRooms();
    createRandomCorridors();

    createRandomlyPlacedEntity(2, "Sword");
    createRandomlyPlacedEntity(10, "Flask");

    createRandomlyPlacedEntity(10, {
      type: "enemy",
      currentHealth: 10,
      maxHealth: 10,
    });

    createRandomlyPlacedEntity(1, {
      type: "hero",
      currentHealth: 100,
      maxHealth: 100,
      damage: 3,
    });
    currentHeroCoords = getHeroCoords();

    setUpEventListeners();

    renderField();
  }

  function getHeroCoords() {
    for (let i = 0; i < gameFieldHeight; i++) {
      for (let j = 0; j < gameFieldWWidth; j++) {
        if (typeof grid[i][j] === "object") {
          if (grid[i][j].type === "hero") {
            return { x: j, y: i };
          }
        }
      }
    }
  }

  function getEnemiesCoords() {
    for (let i = 0; i < gameFieldHeight; i++) {
      for (let j = 0; j < gameFieldWWidth; j++) {
        if (typeof grid[i][j] === "object") {
          if (grid[i][j].type === "enemy") {
            currentEnemiesCoords.push({ x: j, y: i });
          }
        }
      }
    }
  }

  function createRandomRooms() {
    const roomsCount = getRandomNumber(5, 10);

    for (let i = 0; i < roomsCount; i++) {
      const currentRoomWidth = getRandomNumber(3, 8);
      const currentRoomHeight = getRandomNumber(3, 8);

      let topLeftRoomX = getRandomNumber(0, gameFieldWWidth - currentRoomWidth);
      let topLeftRoomY = getRandomNumber(
        0,
        gameFieldHeight - currentRoomHeight
      );

      while (grid[topLeftRoomY][topLeftRoomX] !== "Wall") {
        topLeftRoomX = getRandomNumber(0, gameFieldWWidth - currentRoomWidth);
        topLeftRoomY = getRandomNumber(0, gameFieldHeight - currentRoomHeight);
      }

      for (let i = topLeftRoomY; i < topLeftRoomY + currentRoomHeight; i++) {
        for (let j = topLeftRoomX; j < topLeftRoomX + currentRoomWidth; j++) {
          grid[i][j] = "Empty";
        }
      }
    }
  }

  function createRandomCorridors() {
    const horizontalCorridorsCount = getRandomNumber(3, 5);
    const horizontalIndexes = [];
    for (let i = 0; i < horizontalCorridorsCount; i++) {
      let horizontalCorridorIndex = getRandomNumber(0, gameFieldHeight - 1);

      while (horizontalIndexes.includes(horizontalCorridorIndex)) {
        horizontalCorridorIndex = getRandomNumber(0, gameFieldHeight - 1);
      }

      horizontalIndexes.push(horizontalCorridorIndex);

      for (let j = 0; j < gameFieldWWidth; j++) {
        grid[horizontalCorridorIndex][j] = "Empty";
      }
    }

    const verticalIndexes = [];
    const verticalCorridorsCount = getRandomNumber(3, 5);
    for (let i = 0; i < verticalCorridorsCount; i++) {
      let verticalCorridorIndex = getRandomNumber(0, gameFieldWWidth - 1);

      while (verticalIndexes.includes(verticalCorridorIndex)) {
        verticalCorridorIndex = getRandomNumber(0, gameFieldWWidth - 1);
      }

      verticalIndexes.push(verticalCorridorIndex);

      for (let j = 0; j < gameFieldHeight; j++) {
        grid[j][verticalCorridorIndex] = "Empty";
      }
    }
  }

  function getRandomEmptySpace() {
    let randomX = getRandomNumber(0, gameFieldWWidth - 1);
    let randomY = getRandomNumber(0, gameFieldHeight - 1);

    while (grid[randomY][randomX] !== "Empty") {
      randomX = getRandomNumber(0, gameFieldWWidth - 1);
      randomY = getRandomNumber(0, gameFieldHeight - 1);
    }

    return [randomX, randomY];
  }

  function createRandomlyPlacedEntity(count, entityInput) {
    for (let i = 0; i < count; i++) {
      let entityCopy = structuredClone(entityInput);

      const emptySquareCoords = getRandomEmptySpace();
      const emptySquareX = emptySquareCoords[0];
      const emptySquareY = emptySquareCoords[1];

      grid[emptySquareY][emptySquareX] = entityCopy;
    }
  }

  function setUpEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (
        e.key !== "w" &&
        e.key !== "a" &&
        e.key !== "s" &&
        e.key !== "d" &&
        e.key !== " "
      ) {
        return;
      }

      makePlayerTurn(e.key);

      // and wait for it
      makeEnemiesTurn();
    });
  }

  function heroCanMakeMoveThere(x, y) {
    if (x >= gameFieldWWidth || y >= gameFieldHeight) {
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
    let currentHeroX = currentHeroCoords.x;
    let currentHeroY = currentHeroCoords.y;

    const hero = grid[currentHeroY][currentHeroX];
    grid[currentHeroY][currentHeroX] = "Empty";

    if (grid[y][x] === "Sword") {
      hero.damage = hero.damage * 2;
    }

    if (grid[y][x] === "Flask") {
      hero.currentHealth =
        hero.currentHealth + 10 > hero.maxHealth
          ? hero.maxHealth
          : hero.currentHealth + 10;
    }

    grid[y][x] = hero;
    currentHeroCoords = { x, y };
  }

  function makePlayerTurn(key) {
    let currentHeroX = currentHeroCoords.x;
    let currentHeroY = currentHeroCoords.y;

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
        for (let i = currentHeroY - 1; i < currentHeroY + 2; i++) {
          for (let j = currentHeroX - 1; j < currentHeroX + 2; j++) {
            if (
              i < 0 ||
              j < 0 ||
              i >= gameFieldHeight ||
              j >= gameFieldWWidth
            ) {
              continue;
            }

            if (typeof grid[i][j] === "object") {
              if (grid[i][j].type === "enemy") {
                let hero = grid[currentHeroY][currentHeroX];
                grid[i][j].currentHealth =
                  grid[i][j].currentHealth - hero.damage;

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

  function makeEnemiesTurn() {
    for (let i = 0; i < currentEnemiesCoords.length; i++) {}
  }

  function renderField() {
    fieldContainer.textContent = "";

    for (let i = 0; i < gameFieldHeight; i++) {
      for (let j = 0; j < gameFieldWWidth; j++) {
        const currentTile = document.createElement("div");
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
            const enemy = grid[i][j];
            currentTile.classList.add("tile", "tileE");

            const health = document.createElement("div");
            health.classList.add("health");

            const healthPercentage = Math.floor(
              (enemy.currentHealth / enemy.maxHealth) * 100
            );
            health.style.setProperty(
              "--health",
              `${healthPercentage > 100 ? 100 : healthPercentage}%`
            );

            currentTile.appendChild(health);
          }

          if (grid[i][j].type === "hero") {
            const hero = grid[i][j];
            currentTile.classList.add("tile", "tileP");

            const health = document.createElement("div");
            health.classList.add("health");

            const healthPercentage = Math.floor(
              (hero.currentHealth / hero.maxHealth) * 100
            );
            health.style.setProperty(
              "--health",
              `${healthPercentage > 100 ? 100 : healthPercentage}%`
            );

            currentTile.appendChild(health);
          }
        }

        fieldContainer.appendChild(currentTile);
      }
    }
  }

  return { initGameGrid };
}

const game = rougeGame();
game.initGameGrid();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

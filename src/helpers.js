function getHeroCoords(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (typeof grid[i][j] === "object") {
        if (grid[i][j].type === "hero") {
          return { x: j, y: i };
        }
      }
    }
  }
}

function getEnemies(grid) {
  var enemies = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (typeof grid[i][j] === "object") {
        if (grid[i][j].type === "enemy") {
          enemies.push(grid[i][j]);
        }
      }
    }
  }

  return enemies;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomEmptySpace(grid) {
  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;

  var randomX = getRandomNumber(0, gameFieldWidth - 1);
  var randomY = getRandomNumber(0, gameFieldHeight - 1);

  while (!isEmptyTile(grid[randomY][randomX])) {
    randomX = getRandomNumber(0, gameFieldWidth - 1);
    randomY = getRandomNumber(0, gameFieldHeight - 1);
  }

  return [randomX, randomY];
}

function createRandomlyPlacedEntities(
  grid,
  count,
  factoryCallback,
  ...callbackArgs
) {
  for (var i = 0; i < count; i++) {
    var emptySquareCoords = getRandomEmptySpace(grid);
    var emptySquareX = emptySquareCoords[0];
    var emptySquareY = emptySquareCoords[1];

    grid[emptySquareY][emptySquareX] = factoryCallback(grid, ...callbackArgs);
  }
}

function isWallTile(gridTile) {
  if (gridTile.type === "tile" && gridTile.tileType === "wall") {
    return true;
  }

  return false;
}

function isEmptyTile(gridTile) {
  if (gridTile.type === "tile" && gridTile.tileType === "empty") {
    return true;
  }

  return false;
}

function renderInventory(hero) {
  var inventory = document.querySelector(".inventory");
  inventory.textContent = "";

  for (let i = 0; i < hero.inventory.length; i++) {
    var item = hero.inventory[i];

    var itemElement = document.createElement("div");
    itemElement.classList.add("tile", item.styleClass);

    inventory.appendChild(itemElement);
  }
}

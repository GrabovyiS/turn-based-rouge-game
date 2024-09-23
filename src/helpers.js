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

function getEnemiesCoords(grid) {
  var currentEnemiesCoords = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (typeof grid[i][j] === "object") {
        if (grid[i][j].type === "enemy") {
          currentEnemiesCoords.push({ x: j, y: i });
        }
      }
    }
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

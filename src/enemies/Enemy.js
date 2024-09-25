function Enemy(grid, options) {
  var maxHealth = options.maxHealth;
  var damage = options.damage;
  var name = options.name;
  var makeTurn = options.makeTurn;

  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;

  function getOwnCoords() {
    for (var i = 0; i < gameFieldHeight; i++) {
      for (var j = 0; j < gameFieldWidth; j++) {
        if (grid[i][j] === this) {
          return { x: j, y: i };
        }
      }
    }
  }

  return {
    type: "enemy",
    name: name,
    maxHealth: maxHealth,
    currentHealth: maxHealth,
    damage: damage,
    makeTurn: makeTurn,
    getOwnCoords: getOwnCoords,
  };
}

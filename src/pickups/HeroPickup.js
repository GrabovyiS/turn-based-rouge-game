function HeroPickup(grid, options) {
  var name = options.name;
  var effect = options.effect;
  var styleClass = options.styleClass;

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
    grid: grid,
    type: "heroPickUp",
    name: name,
    effect: effect,
    styleClass: styleClass,
    getOwnCoords: getOwnCoords,
  };
}

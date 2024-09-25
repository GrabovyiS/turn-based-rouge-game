function HeroPickup(grid, name, effect, styleClass) {
  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;

  function getOwnCoords() {
    for (let i = 0; i < gameFieldHeight; i++) {
      for (let j = 0; j < gameFieldWidth; j++) {
        if (grid[i][j] === this) {
          return { x: j, y: i };
        }
      }
    }
  }

  return { grid, type: "heroPickUp", name, effect, styleClass, getOwnCoords };
}

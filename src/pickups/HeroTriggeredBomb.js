function HeroTriggeredBomb(grid) {
  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;
  var DAMAGE_VALUE = 15;

  function explode() {
    var bombCoords = this.getOwnCoords();

    for (var i = bombCoords.y - 1; i < bombCoords.y + 2; i++) {
      for (var j = bombCoords.x - 1; j < bombCoords.x + 2; j++) {
        if (i < 0 || j < 0 || i >= gameFieldHeight || j >= gameFieldWidth) {
          continue;
        }

        if (typeof grid[i][j] === "object") {
          if (grid[i][j].type === "enemy" || grid[i][j].type === "hero") {
            grid[i][j].currentHealth -= DAMAGE_VALUE;

            if (grid[i][j].type === "enemy" && grid[i][j].currentHealth <= 0) {
              grid[i][j] = EmptyTile();
            }
          }
        }
      }
    }
  }

  var flask = HeroPickup(grid, {
    name: "bomb",
    effect: explode,
    styleClass: "tile-Bomb",
  });
  return flask;
}

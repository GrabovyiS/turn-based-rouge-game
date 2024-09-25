function MeleeBoss(grid, options) {
  var maxHealth = options.maxHealth;
  var damage = options.damage;

  var gameFieldHeight = grid.length;
  var gameFieldWidth = grid[0].length;

  function makeTurn() {
    var ownCoords = this.getOwnCoords();
    var ownX = ownCoords.x;
    var ownY = ownCoords.y;
    var heroCoords = getHeroCoords(grid);

    if (heroInRange(heroCoords, ownCoords)) {
      var hero = grid[heroCoords.y][heroCoords.x];
      hero.currentHealth = hero.currentHealth - this.damage;
      return;
    }

    var possibleNextMoves = [];
    if (canGoThere(ownX + 1, ownY)) {
      possibleNextMoves.push({ x: ownX + 1, y: ownY });
    }
    if (canGoThere(ownX - 1, ownY)) {
      possibleNextMoves.push({ x: ownX - 1, y: ownY });
    }
    if (canGoThere(ownX, ownY + 1)) {
      possibleNextMoves.push({ x: ownX, y: ownY + 1 });
    }
    if (canGoThere(ownX, ownY - 1)) {
      possibleNextMoves.push({ x: ownX, y: ownY - 1 });
    }

    if (possibleNextMoves.length === 0) {
      return;
    }

    var randomIndex = Math.floor(Math.random() * possibleNextMoves.length);

    var newX = possibleNextMoves[randomIndex].x;
    var newY = possibleNextMoves[randomIndex].y;

    move(ownX, ownY, newX, newY);
  }

  function canGoThere(x, y) {
    if (x < 0 || x >= gameFieldWidth || y < 0 || y >= gameFieldHeight) {
      return false;
    }

    if (typeof grid[y][x] === "object") {
      if (grid[y][x].type === "hero") {
        return false;
      }

      if (grid[y][x].type === "enemy") {
        return false;
      }
    }

    if (isWallTile(grid[y][x])) {
      return false;
    }

    return true;
  }

  function heroInRange(heroCoords, ownCoords) {
    for (var i = heroCoords.y - 1; i < heroCoords.y + 2; i++) {
      for (var j = heroCoords.x - 1; j < heroCoords.x + 2; j++) {
        if (i === ownCoords.y && j === ownCoords.x) {
          return true;
        }
      }
    }

    return false;
  }

  function move(oldX, oldY, newX, newY) {
    var enemy = grid[oldY][oldX];

    if (grid[oldY][oldX].tileBehind) {
      grid[oldY][oldX] = grid[oldY][oldX].tileBehind;
      enemy.tileBehind = null;
    } else {
      grid[oldY][oldX] = EmptyTile();
    }

    // 'hide' pickups instead of destroying them
    // could work the same for different types of terrains
    if (typeof grid[newY][newX] === "object") {
      if (grid[newY][newX].type === "heroPickUp") {
        enemy.tileBehind = grid[newY][newX];
      }
    }

    grid[newY][newX] = enemy;
  }

  var meleeBoss = Enemy(grid, {
    name: "meleeBoss",
    maxHealth: maxHealth,
    damage: damage,
    makeTurn: makeTurn,
  });
  meleeBoss.styleClass = "tileB";
  meleeBoss.move = move;

  return meleeBoss;
}

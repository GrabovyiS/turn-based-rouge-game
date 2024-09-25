function HeroSword(grid) {
  var DAMAGE_BONUS = 4;

  function addSword() {
    var swordCoords = this.getOwnCoords();

    var heroCoords = getHeroCoords(grid);
    var hero = grid[heroCoords.y][heroCoords.x];

    hero.damage += DAMAGE_BONUS;
    hero.inventory.push(grid[swordCoords.y][swordCoords.x]);
  }

  var flask = HeroPickup(grid, "sword", addSword, "tileSW");
  return flask;
}

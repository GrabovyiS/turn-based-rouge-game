function HeroFlask(grid) {
  var HEAL_VALUE = 10;

  function healHero() {
    var heroCoords = getHeroCoords(grid);
    var hero = grid[heroCoords.y][heroCoords.x];

    if (hero.currentHealth + HEAL_VALUE > hero.maxHealth) {
      hero.currentHealth = hero.maxHealth;
    } else {
      hero.currentHealth += HEAL_VALUE;
    }
  }

  var flask = HeroPickup(grid, "flask", healHero, "tileHP");
  return flask;
}

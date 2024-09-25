function HeroFlask(grid) {
  var HEAL_VALUE = 10;

  function explode() {
    var heroCoords = getHeroCoords(grid);
    var hero = grid[heroCoords.y][heroCoords.x];

    if (hero.currentHealth + HEAL_VALUE > hero.maxHealth) {
      hero.currentHealth = hero.maxHealth;
    } else {
      hero.currentHealth += HEAL_VALUE;
    }
  }

  function getOwnCoords() {}

  var flask = HeroPickup("flask", healHero, "tileHP");
  return flask;
}

function Enemy(grid, maxHealth, damage) {
  var currentHealth = maxHealth;
  var type = "enemy";
  var styleClass = "tileE";

  var randomizeWalking = Math.random();
  if (randomizeWalking < 0.33) {
  }

  function makeMove() {
    if (heroInRange(grid, range)) {
      // find the hero and - it's health by this damage
    }
  }

  function heroInRange(grid, range) {}

  return { maxHealth, currentHealth, damage, type, styleClass };
}

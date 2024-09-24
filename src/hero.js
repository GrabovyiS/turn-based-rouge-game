function Hero(grid, maxHealth, baseDamage) {
  var currentHealth = maxHealth;
  var damage = baseDamage;
  var type = "hero";
  var styleClass = "tileP";

  function makeMove() {}

  return { type, currentHealth, maxHealth, baseDamage, styleClass, damage };
}

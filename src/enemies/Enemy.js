function Enemy(name, maxHealth, damage, makeTurn) {
  return {
    type: "enemy",
    name,
    maxHealth,
    currentHealth: maxHealth,
    damage,
    makeTurn,
  };
}

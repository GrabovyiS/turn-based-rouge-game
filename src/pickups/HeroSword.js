function HeroSword(grid) {
  var DAMAGE_BONUS = 4;

  function addSword() {
    var heroCoords = getHeroCoords(grid);
    var hero = grid[heroCoords.y][heroCoords.x];

    hero.damage += DAMAGE_BONUS;

    var inventory = document.querySelector(".inventory");

    var newSword = document.createElement("div");
    newSword.classList.add("tile", "tileSW");
    inventory.appendChild(newSword);
  }

  var flask = HeroPickup("sword", addSword, "tileSW");
  return flask;
}

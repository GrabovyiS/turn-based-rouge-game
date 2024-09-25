function Overlay(headingText, buttonText, buttonCallback, subtext) {
  var overlay = document.createElement("div");
  overlay.classList.add("overlay");

  var overlayHeading = document.createElement("h2");
  overlayHeading.textContent = headingText;
  overlay.appendChild(overlayHeading);

  if (subtext) {
    var overlaySubtext = document.createElement("p");
    overlaySubtext.textContent = subtext;
    overlay.appendChild(overlaySubtext);
  }

  var overlayButton = document.createElement("button");
  overlayButton.textContent = buttonText;
  overlayButton.addEventListener("click", () => {
    buttonCallback();
  });
  overlay.appendChild(overlayButton);

  return overlay;
}

function victoryOverlay(buttonCallback) {
  return Overlay("Victory!", "Play again", buttonCallback);
}

function defeatOverlay(buttonCallback) {
  return Overlay("Defeat", "Try again", buttonCallback);
}

function introductionOverlay(buttonCallback) {
  return Overlay(
    "Rouge",
    "Play",
    buttonCallback,
    "WASD to walk, Space to attack. The game is turn-based, you go first."
  );
}

function Grid(gameFieldWWidth, gameFieldHeight) {
  const grid = [];

  for (var i = 0; i < gameFieldHeight; i++) {
    grid.push([]);
    for (var j = 0; j < gameFieldWWidth; j++) {
      grid[i].push("Wall");
    }
  }

  createRandomRooms();
  createRandomCorridors();

  function createRandomRooms() {
    var roomsCount = getRandomNumber(5, 10);

    console.log(roomsCount);

    for (var i = 0; i < roomsCount; i++) {
      var currentRoomWidth = getRandomNumber(3, 8);
      var currentRoomHeight = getRandomNumber(3, 8);

      var topLeftRoomX = getRandomNumber(0, gameFieldWWidth - currentRoomWidth);
      var topLeftRoomY = getRandomNumber(
        0,
        gameFieldHeight - currentRoomHeight
      );

      console.log(topLeftRoomX, topLeftRoomY);

      while (
        grid[topLeftRoomY][topLeftRoomX] !== "Wall" ||
        isUnreachable(
          topLeftRoomX,
          topLeftRoomY,
          currentRoomWidth,
          currentRoomHeight
        )
      ) {
        topLeftRoomX = getRandomNumber(0, gameFieldWWidth - currentRoomWidth);
        topLeftRoomY = getRandomNumber(0, gameFieldHeight - currentRoomHeight);
      }

      for (var k = topLeftRoomY; k < topLeftRoomY + currentRoomHeight; k++) {
        for (var j = topLeftRoomX; j < topLeftRoomX + currentRoomWidth; j++) {
          grid[k][j] = "Empty";
        }
      }
    }
  }

  function createRandomCorridors() {
    var horizontalCorridorsCount = getRandomNumber(3, 5);
    var horizontalIndexes = [];
    for (var i = 0; i < horizontalCorridorsCount; i++) {
      var horizontalCorridorIndex = getRandomNumber(0, gameFieldHeight - 1);

      while (horizontalIndexes.includes(horizontalCorridorIndex)) {
        horizontalCorridorIndex = getRandomNumber(0, gameFieldHeight - 1);
      }

      horizontalIndexes.push(horizontalCorridorIndex);

      for (var j = 0; j < gameFieldWWidth; j++) {
        grid[horizontalCorridorIndex][j] = "Empty";
      }
    }

    var verticalIndexes = [];
    var verticalCorridorsCount = getRandomNumber(3, 5);
    for (var i = 0; i < verticalCorridorsCount; i++) {
      var verticalCorridorIndex = getRandomNumber(0, gameFieldWWidth - 1);

      while (verticalIndexes.includes(verticalCorridorIndex)) {
        verticalCorridorIndex = getRandomNumber(0, gameFieldWWidth - 1);
      }

      verticalIndexes.push(verticalCorridorIndex);

      for (var j = 0; j < gameFieldHeight; j++) {
        grid[j][verticalCorridorIndex] = "Empty";
      }
    }
  }

  return grid;
}

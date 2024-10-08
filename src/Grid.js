function Grid(gameFieldWidth, gameFieldHeight) {
  var grid = [];

  for (var i = 0; i < gameFieldHeight; i++) {
    grid.push([]);
    for (var j = 0; j < gameFieldWidth; j++) {
      grid[i].push(WallTile());
    }
  }

  // All corridors are reachable by default
  createRandomCorridors();

  // A room must be connected to a corridor or a different room,
  // that is connected to a corridor to be reachable.
  createRandomRooms();

  function createRandomCorridors() {
    var horizontalCorridorsCount = getRandomNumber(3, 5);
    var horizontalIndexes = [];
    for (var i = 0; i < horizontalCorridorsCount; i++) {
      var horizontalCorridorIndex = getRandomNumber(0, gameFieldHeight - 1);

      while (horizontalIndexes.includes(horizontalCorridorIndex)) {
        horizontalCorridorIndex = getRandomNumber(0, gameFieldHeight - 1);
      }

      horizontalIndexes.push(horizontalCorridorIndex);

      for (var j = 0; j < gameFieldWidth; j++) {
        grid[horizontalCorridorIndex][j] = EmptyTile();
      }
    }

    var verticalIndexes = [];
    var verticalCorridorsCount = getRandomNumber(3, 5);
    for (var i = 0; i < verticalCorridorsCount; i++) {
      var verticalCorridorIndex = getRandomNumber(0, gameFieldWidth - 1);

      while (verticalIndexes.includes(verticalCorridorIndex)) {
        verticalCorridorIndex = getRandomNumber(0, gameFieldWidth - 1);
      }

      verticalIndexes.push(verticalCorridorIndex);

      for (var j = 0; j < gameFieldHeight; j++) {
        grid[j][verticalCorridorIndex] = EmptyTile();
      }
    }
  }

  function createRandomRooms() {
    var roomsCount = getRandomNumber(5, 10);

    for (var i = 0; i < roomsCount; i++) {
      var currentRoomWidth = getRandomNumber(3, 8);
      var currentRoomHeight = getRandomNumber(3, 8);

      var topLeftRoomX = getRandomNumber(0, gameFieldWidth - currentRoomWidth);
      var topLeftRoomY = getRandomNumber(
        0,
        gameFieldHeight - currentRoomHeight
      );

      while (
        !isWallTile(grid[topLeftRoomY][topLeftRoomX]) ||
        !isReachable(
          topLeftRoomX,
          topLeftRoomY,
          currentRoomWidth,
          currentRoomHeight
        )
      ) {
        topLeftRoomX = getRandomNumber(0, gameFieldWidth - currentRoomWidth);
        topLeftRoomY = getRandomNumber(0, gameFieldHeight - currentRoomHeight);
      }

      for (var k = topLeftRoomY; k < topLeftRoomY + currentRoomHeight; k++) {
        for (var j = topLeftRoomX; j < topLeftRoomX + currentRoomWidth; j++) {
          grid[k][j] = EmptyTile();
        }
      }
    }
  }

  function isReachable(topLeftRoomX, topLeftRoomY, roomWidth, roomHeight) {
    // Avoid out of bounds
    var startX;
    var endX;

    if (topLeftRoomX - 1 < 0) {
      startX = topLeftRoomX;
    } else {
      startX = topLeftRoomX - 1;
    }

    if (topLeftRoomX + roomWidth > gameFieldWidth - 1) {
      endX = topLeftRoomX + roomWidth - 1;
    } else {
      endX = topLeftRoomX + roomWidth;
    }

    var startY;
    var endY;

    if (topLeftRoomY - 1 < 0) {
      startY = topLeftRoomY;
    } else {
      startY = topLeftRoomY - 1;
    }

    if (topLeftRoomY + roomHeight > gameFieldHeight - 1) {
      endY = topLeftRoomY + roomHeight - 1;
    } else {
      endY = topLeftRoomY + roomHeight;
    }

    // Check if connects to an empty square
    for (var i = startY; i <= endY; i++) {
      for (var j = startX; j <= endX; j++) {
        if (isEmptyTile(grid[i][j])) {
          return true;
        }
      }
    }

    return false;
  }

  return grid;
}

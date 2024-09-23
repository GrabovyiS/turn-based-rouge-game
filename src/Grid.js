function Grid(gameFieldWidth, gameFieldHeight) {
  const grid = [];

  for (var i = 0; i < gameFieldHeight; i++) {
    grid.push([]);
    for (var j = 0; j < gameFieldWidth; j++) {
      grid[i].push("Wall");
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
        grid[horizontalCorridorIndex][j] = "Empty";
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
        grid[j][verticalCorridorIndex] = "Empty";
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
        grid[topLeftRoomY][topLeftRoomX] !== "Wall" ||
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
          grid[k][j] = "Empty";
        }
      }
    }
  }

  function isReachable(topLeftRoomX, topLeftRoomY, roomWidth, roomHeight) {
    console.log("this room:");
    console.log({ topLeftRoomX, topLeftRoomY, roomWidth, roomHeight });
    // Avoid out of bounds
    let startX;
    let endX;

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

    let startY;
    let endY;

    if (topLeftRoomY - 1 < 0) {
      startY = topLeftRoomY;
    } else {
      startY = topLeftRoomY - 1;
    }

    if (topLeftRoomY + roomHeight > gameFieldHeight - 1) {
      console.log("too big, gotta make it smaller", topLeftRoomY, roomHeight);
      endY = topLeftRoomY + roomHeight - 1;
    } else {
      endY = topLeftRoomY + roomHeight;
    }

    // Check if connects to an empty square
    for (var i = startY; i <= endY; i++) {
      console.log({ startY, endY });
      for (var j = startX; j <= endX; j++) {
        console.log(i, j);
        if (grid[i][j] === "Empty") {
          return true;
        }
      }
    }

    return false;
  }

  return grid;
}

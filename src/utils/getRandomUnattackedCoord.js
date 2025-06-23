export default function getRandomUnattackedCoord(player) {
  const allCoords = [];

  // Generate all 100 coords
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      allCoords.push([i, j]);
    }
  }

  // Collect all attacked coordinates (hits + misses)
  const attackedCoords = [];

  player.gameBoard.ships.forEach(({ attackedOn }) => {
    attackedOn.forEach((coord) => attackedCoords.push(coord));
  });

  player.gameBoard.missedShots.forEach((coord) => attackedCoords.push(coord));

  //Find hit positions of unsunk ships
  const hitCoords = [];
  player.gameBoard.ships.forEach((shipData) => {
    if (!shipData.ship.isSunk()) {
      shipData.attackedOn.forEach((coord) => hitCoords.push(coord));
    }
  });

  //Find adjacent coords to above(hit) coords
  const adjacentCoords = [];
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (const [x, y] of hitCoords) {
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        ny < 10 &&
        ny >= 0 &&
        ny < 10 &&
        !attackedCoords.some(([ax, ay]) => ax === nx && ay === ny)
      ) {
        adjacentCoords.push([nx, ny]);
      }
    }
  }

  if (adjacentCoords.length > 0) {
    const randomIndex = Math.floor(Math.random() * adjacentCoords.length);
    return adjacentCoords[randomIndex];
  }

  // If no coords in proximity - Filter out attacked coords
  const unattackedCoords = allCoords.filter(
    ([x, y]) => !attackedCoords.some(([ax, ay]) => ax === x && ay === y),
  );

  // Pick one randomly
  const randomIndex = Math.floor(Math.random() * unattackedCoords.length);
  return unattackedCoords[randomIndex];
}

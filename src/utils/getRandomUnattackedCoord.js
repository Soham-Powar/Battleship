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

  // Filter out attacked coords
  const unattackedCoords = allCoords.filter(
    ([x, y]) => !attackedCoords.some(([ax, ay]) => ax === x && ay === y)
  );

  // Pick one randomly
  const randomIndex = Math.floor(Math.random() * unattackedCoords.length);
  return unattackedCoords[randomIndex];
}

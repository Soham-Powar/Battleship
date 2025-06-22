import Ship from "../components/Ship";

function getRandomCoord(shipLength, orientation) {
  if (orientation === "horizontal") {
    const x = Math.floor(Math.random() * 10);
    const maxStartCol = 10 - shipLength;
    const y = Math.floor(Math.random() * (maxStartCol + 1));
    return [x, y];
  } else {
    const maxStartRow = 10 - shipLength;
    const x = Math.floor(Math.random() * (maxStartRow + 1));
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}

export default function addEnemyData(player) {
  const ships = [
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
  ];

  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      const coord = getRandomCoord(ship.getLength(), orientation);
      placed = player.gameBoard.placeShip(ship, coord, orientation);
    }
  });
}

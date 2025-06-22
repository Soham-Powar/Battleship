import Ship from "../components/Ship";

function getRandomCoord(shipLength) {
  const x = Math.floor(Math.random() * 10);
  const maxStartCol = 10 - shipLength;
  const y = Math.floor(Math.random() * (maxStartCol + 1));
  return [x, y];
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
      const coord = getRandomCoord(ship.getLength());
      placed = player.gameBoard.placeShip(ship, coord);
    }
  });
}

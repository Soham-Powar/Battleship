import Ship from "../components/Ship";
export default function addTempData(players) {
  const player1ShipsWithCoords = [
    { ship: new Ship("Carrier", 5), coords: [0, 0] },
    { ship: new Ship("Battleship", 4), coords: [2, 5] },
    { ship: new Ship("Cruiser", 3), coords: [4, 3] },
    { ship: new Ship("Submarine", 3), coords: [6, 0] },
    { ship: new Ship("Destroyer", 2), coords: [8, 5] },
  ];

  player1ShipsWithCoords.forEach((data) => {
    players[0].gameBoard.placeShip(data.ship, data.coords);
  });

  const player2ShipsWithCoords = [
    { ship: new Ship("Carrier", 5), coords: [2, 2] },
    { ship: new Ship("Battleship", 4), coords: [4, 5] },
    { ship: new Ship("Cruiser", 3), coords: [6, 1] },
    { ship: new Ship("Submarine", 3), coords: [8, 4] },
    { ship: new Ship("Destroyer", 2), coords: [0, 8] },
  ];

  player2ShipsWithCoords.forEach((data) => {
    players[1].gameBoard.placeShip(data.ship, data.coords);
  });
}

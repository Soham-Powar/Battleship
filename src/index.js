import "./styles.css";
import Player from "./components/Player";
import Ship from "./components/Ship";

import renderGameBoards from "./dom/renderGameBoards";
import renderShipCoords from "./dom/renderShipCoords";
import renderMissedShots from "./dom/renderMissedShots";
import renderAttackedShips from "./dom/renderAttackedShips";
import renderDestroyedShips from "./dom/renderDestroyedShips";

const player1 = new Player("player1");
const player2 = new Player("player2");

renderGameBoards();
const player1ShipsWithCoords = [
  { ship: new Ship("Carrier", 5), coords: [0, 0] },
  { ship: new Ship("Battleship", 4), coords: [2, 5] },
  { ship: new Ship("Cruiser", 3), coords: [4, 3] },
  { ship: new Ship("Submarine", 3), coords: [6, 0] },
  { ship: new Ship("Destroyer", 2), coords: [8, 5] },
];

player1ShipsWithCoords.forEach((data) => {
  player1.gameBoard.placeShip(data.ship, data.coords);
});

const player2ShipsWithCoords = [
  { ship: new Ship("Carrier", 5), coords: [2, 2] },
  { ship: new Ship("Battleship", 4), coords: [4, 5] },
  { ship: new Ship("Cruiser", 3), coords: [6, 1] },
  { ship: new Ship("Submarine", 3), coords: [8, 4] },
  { ship: new Ship("Destroyer", 2), coords: [0, 8] },
];

player2ShipsWithCoords.forEach((data) => {
  player2.gameBoard.placeShip(data.ship, data.coords);
});

renderShipCoords(player1);
renderShipCoords(player2);

export function handleGameBoardClick(playerName, coords) {
  let player;
  if (playerName === player1.name) {
    player = player1;
  } else {
    player = player2;
  }
  player.gameBoard.receiveAttack(coords);
  renderMissedShots(player);
  renderAttackedShips(player);
  renderDestroyedShips(player);
}

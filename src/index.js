import "./styles.css";
import Player from "./components/Player";
import Ship from "./components/Ship";

import renderGameBoards from "../renderGameBoards";

const player1 = new Player("player1");
const player2 = new Player("player2");

renderGameBoards();
const player1ShipsWithCoords = [
  { ship: new Ship("Carrier", 5), coords: [0, 0] },
  { ship: new Ship("Battleship", 4), coords: [2, 1] },
  { ship: new Ship("Cruiser", 3), coords: [4, 3] },
  { ship: new Ship("Submarine", 3), coords: [6, 0] },
  { ship: new Ship("Destroyer", 2), coords: [8, 5] },
];

player1ShipsWithCoords.forEach((data) => {
  player1.gameBoard.placeShip(data.ship, data.coords);
});

const player2ShipsWithCoords = [
  { ship: new Ship("Carrier", 5), coords: [1, 2] },
  { ship: new Ship("Battleship", 4), coords: [3, 4] },
  { ship: new Ship("Cruiser", 3), coords: [5, 0] },
  { ship: new Ship("Submarine", 3), coords: [7, 3] },
  { ship: new Ship("Destroyer", 2), coords: [9, 6] },
];

player2ShipsWithCoords.forEach((data) => {
  player2.gameBoard.placeShip(data.ship, data.coords);
});

console.log(player1);

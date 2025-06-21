import Player from "../components/Player";
import Ship from "../components/Ship";
import renderAttackedShips from "./renderAttackedShips";
import renderDestroyedShips from "./renderDestroyedShips";
import renderDialog from "./renderDialog";
import renderGameBoards from "./renderGameBoards";
import renderMissedShots from "./renderMissedShots";
import renderShipCoords from "./renderShipCoords";

let players = [];

function addTempData(players) {
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

export default async function gameStart() {
  //show dialog to get the player Name
  const { player1Name, player2Name } = await renderDialog();

  const player1 = new Player(player1Name);
  const player2 = new Player(player2Name);
  players = [player1, player2];

  renderGameBoards(players);
  addTempData(players);
  renderShipCoords(players[0]);
  renderShipCoords(players[1]);
}

export function handleGameBoardClick(playerName, coords) {
  const player = players.find((p) => p.name === playerName);
  player.gameBoard.receiveAttack(coords);
  renderMissedShots(player);
  renderAttackedShips(player);
  renderDestroyedShips(player);
}

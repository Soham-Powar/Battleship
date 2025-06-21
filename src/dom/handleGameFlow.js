import Player from "../components/Player";
import Ship from "../components/Ship";
import renderAttackedShips from "./renderAttackedShips";
import renderDestroyedShips from "./renderDestroyedShips";
import renderDialog from "./renderDialog";
import renderGameBoards from "./renderGameBoards";
import renderMissedShots from "./renderMissedShots";
import renderShipCoords from "./renderShipCoords";

let players = [];
let currentTurnIndex = 0; // 0 for players turn | 1 for cpus turn

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
  //   renderShipCoords(players[1]);
}

function getRandomUnattackedCoord(player) {
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

export function handleGameBoardClick(clickedPlayerName, coords) {
  const currentPlayer = players[currentTurnIndex];
  const opponent = players[(currentTurnIndex + 1) % 2];

  // Prevent clicking own board
  if (clickedPlayerName === currentPlayer.name) return;

  opponent.gameBoard.receiveAttack(coords);

  renderMissedShots(opponent);
  renderAttackedShips(opponent);
  renderDestroyedShips(opponent);

  if (opponent.gameBoard.allShipsSunk()) {
    alert(`${currentPlayer.name} wins!`);
    return;
  }

  // Now below index points to computer
  currentTurnIndex = (currentTurnIndex + 1) % 2;

  // If next turn is computers, get random move.
  const nextPlayer = players[currentTurnIndex];
  if (nextPlayer.name === "Enemy") {
    setTimeout(() => {
      const randomCoord = getRandomUnattackedCoord(currentPlayer);
      handleGameBoardClick(currentPlayer.name, randomCoord);
    }, 500);
  }
}

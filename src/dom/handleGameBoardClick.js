import renderAttackedShips from "./renderAttackedShips";
import renderDestroyedShips from "./renderDestroyedShips";
import renderMissedShots from "./renderMissedShots";

import getRandomUnattackedCoord from "../utils/getRandomUnattackedCoord";

let currentTurnIndex = 0; // 0 for players turn | 1 for cpus turn

import { players } from "./handleGameFlow";

export default function handleGameBoardClick(clickedPlayerName, coords) {
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

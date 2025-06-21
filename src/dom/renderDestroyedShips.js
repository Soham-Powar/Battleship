import toCamelCase from "../utils/toCamelCase";

export default function renderDestroyedShips(player) {
  const shipsData = player.gameBoard.ships;
  const currentPlayer = player.name;

  document
    .querySelectorAll(`.board-${toCamelCase(currentPlayer)} .game-cell`)
    .forEach((cell) => cell.classList.remove("highlight-ship-sunk"));

  shipsData.forEach((shipDataObj) => {
    if (shipDataObj.ship.sunk) {
      const sunkShipCoords = shipDataObj.shipsCoords;

      sunkShipCoords.forEach(([row, column]) => {
        const cell = document.querySelector(
          `.board-${toCamelCase(
            currentPlayer
          )} .game-cell[data-row="${row}"][data-column="${column}"]`
        );
        if (cell) {
          cell.classList.add("highlight-ship-sunk");
        }
      });
    }
  });
}

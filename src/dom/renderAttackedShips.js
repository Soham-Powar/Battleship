import toCamelCase from "../utils/toCamelCase";

export default function renderAttackedShips(player) {
  const ships = player.gameBoard.ships;
  const currentPlayer = player.name;

  document
    .querySelectorAll(`.board-${toCamelCase(currentPlayer)} .game-cell`)
    .forEach((cell) => cell.classList.remove("highlight-ship-attacked"));

  ships.forEach((shipData) => {
    shipData.attackedOn.forEach(([row, column]) => {
      const cell = document.querySelector(
        `.board-${toCamelCase(
          currentPlayer,
        )} .game-cell[data-row="${row}"][data-column="${column}"]`,
      );
      if (cell) {
        cell.classList.add("highlight-ship-attacked");
      }
    });
  });
}

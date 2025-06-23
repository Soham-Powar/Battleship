import toCamelCase from "../utils/toCamelCase";

export default function renderMissedShots(player) {
  const missedShots = player.gameBoard.missedShots;
  const currentPlayer = player.name;

  document
    .querySelectorAll(`.board-${toCamelCase(currentPlayer)} .game-cell`)
    .forEach((cell) => cell.classList.remove("highlight-missed-shot"));

  missedShots.forEach(([row, column]) => {
    const cell = document.querySelector(
      `.board-${toCamelCase(
        currentPlayer,
      )} .game-cell[data-row="${row}"][data-column="${column}"]`,
    );
    if (cell) {
      cell.classList.add("highlight-missed-shot");
    }
  });
}

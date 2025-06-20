export default function renderMissedShots(player) {
  const missedShots = player.gameBoard.missedShots;
  const currentPlayer = player.name;

  document
    .querySelectorAll(`.board-${currentPlayer} .game-cell`)
    .forEach((cell) => {
      const row = parseInt(cell.dataset.row);
      const column = parseInt(cell.dataset.column);

      const isMissedShot = missedShots.some((coord) => {
        return coord[0] === row && coord[1] === column;
      });

      if (isMissedShot) {
        cell.classList.add("highlight-missed-shot");
      } else {
        cell.classList.remove("highlight-missed-shot");
      }
    });
}

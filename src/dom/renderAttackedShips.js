export default function renderAttackedShips(player) {
  const attackedCoords = [];
  console.log(player);

  player.gameBoard.ships.forEach((shipData) => {
    shipData.attackedOn.forEach((coord) => {
      attackedCoords.push(coord);
    });
  });

  const currentPlayer = player.name;

  document
    .querySelectorAll(`.board-${currentPlayer} .game-cell`)
    .forEach((cell) => {
      const row = parseInt(cell.dataset.row);
      const column = parseInt(cell.dataset.column);

      const isAttackedCoord = attackedCoords.some((coord) => {
        return coord[0] === row && coord[1] === column;
      });

      if (isAttackedCoord) {
        cell.classList.add("highlight-ship-attacked");
      } else {
        cell.classList.remove("highlight-ship-attacked");
      }
    });
}

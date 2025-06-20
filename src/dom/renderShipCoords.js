export default function renderShipCoords(player) {
  const ships = player.gameBoard.ships;
  const coords = [];

  ships.forEach((shipData) => {
    shipData.shipsCoords.forEach((cd) => {
      coords.push(cd);
    });
  });

  const currentPlayer = player.name;
  console.log(currentPlayer);

  document
    .querySelectorAll(`.board-${currentPlayer} .game-cell`)
    .forEach((cell) => {
      const row = parseInt(cell.dataset.row);
      const column = parseInt(cell.dataset.column);

      const isMatch = coords.some((coord) => {
        return coord[0] === row && coord[1] === column;
      });

      if (isMatch) {
        cell.classList.add("highlight");
      } else {
        cell.classList.remove("highlight");
      }
    });
}

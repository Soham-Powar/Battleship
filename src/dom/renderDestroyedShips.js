export default function renderDestroyedShips(player) {
  const shipsData = player.gameBoard.ships;

  const currentPlayer = player.name;

  function showSunkShip(sunkShipCoords) {
    document
      .querySelectorAll(`.board-${currentPlayer} .game-cell`)
      .forEach((cell) => {
        const row = parseInt(cell.dataset.row);
        const column = parseInt(cell.dataset.column);

        const isSunkShipCoord = sunkShipCoords.some((coord) => {
          return coord[0] === row && coord[1] === column;
        });

        if (isSunkShipCoord) {
          cell.classList.add("highlight-ship-sunk");
        } else {
          cell.classList.remove("highlight-ship-sunk");
        }
      });
  }

  shipsData.forEach((shipDataObj) => {
    if (shipDataObj.ship.sunk) {
      const sunkShipCoords = shipDataObj.shipsCoords;
      showSunkShip(sunkShipCoords);
    }
  });
}

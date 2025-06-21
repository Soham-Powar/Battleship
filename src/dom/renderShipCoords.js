import toCamelCase from "./toCamelCase";

export default function renderShipCoords(player) {
  const ships = player.gameBoard.ships;
  const coords = [];

  ships.forEach((shipData) => {
    shipData.shipsCoords.forEach((cd) => {
      coords.push(cd);
    });
  });

  const currentPlayer = player.name;

  document
    .querySelectorAll(`.board-${toCamelCase(currentPlayer)} .game-cell`)
    .forEach((cell) => {
      const row = parseInt(cell.dataset.row);
      const column = parseInt(cell.dataset.column);

      const isMatch = coords.some((coord) => {
        return coord[0] === row && coord[1] === column;
      });

      if (isMatch) {
        // ship is on that coord
        cell.classList.add("highlight-ship");
      } else {
        cell.classList.remove("highlight-ship");
      }
    });
}

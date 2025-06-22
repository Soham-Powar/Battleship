import Ship from "../components/Ship";
import renderShipCoords from "../dom/renderShipCoords";

export default function handleShipDrop(e, player, orientation = "horizontal") {
  e.preventDefault();
  const length = parseInt(e.dataTransfer.getData("length"));
  const name = e.dataTransfer.getData("name");
  const row = parseInt(e.target.dataset.row);
  const column = parseInt(e.target.dataset.column);

  const gameBoard = player.gameBoard;
  const ship = new Ship(name, length);

  if (gameBoard.placeShip(ship, [row, column], orientation)) {
    renderShipCoords(player);
    const shipItems = document.querySelectorAll(".ship-item");
    shipItems.forEach((item) => {
      if (
        item.innerText.includes(name) &&
        parseInt(item.dataset.length) === length
      ) {
        item.remove();
      }
    });
  } else {
    console.log(" not donezo");
  }
}

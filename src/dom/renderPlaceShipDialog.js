import Ship from "../components/Ship";
import handleShipDrag from "../utils/handleShipDrag";
import handleShipDrop from "../utils/handleShipDrop";
import handleShipDragOver from "../utils/handleShipDragOver";

export default function renderPlaceShipDialog(player) {
  return new Promise((resolve) => {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = "";

    const shipDialog = document.createElement("div");
    shipDialog.classList.add("ship-dialog");

    const heading = document.createElement("h2");
    heading.innerText = "Place your ships";

    const container = document.createElement("div");
    container.classList.add("ship-placement-container");

    const grid = document.createElement("div");
    grid.classList.add("game-board");

    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.classList.add("game-row");

      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("game-cell");
        cell.dataset.row = i;
        cell.dataset.column = j;

        cell.addEventListener("dragover", handleShipDragOver);
        cell.addEventListener("drop", (e) => {
          handleShipDrop(e, player);
        });

        row.appendChild(cell);
      }

      grid.appendChild(row);
    }

    // Right ship list
    const shipList = document.createElement("div");
    shipList.classList.add("ship-list");

    const ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 3),
      new Ship("Destroyer", 2),
    ];

    ships.forEach((ship) => {
      const shipItem = document.createElement("div");
      shipItem.classList.add("ship-item");
      shipItem.dataset.length = `${ship.length}`;
      shipItem.dataset.name = `${ship.name}`;
      shipItem.draggable = true;

      shipItem.addEventListener("dragstart", handleShipDrag);

      shipItem.innerText = `${ship.name} (${ship.length})`;
      shipList.appendChild(shipItem);
    });

    // Start Button
    const startButton = document.createElement("button");
    startButton.innerText = "Start Game";
    startButton.classList.add("start-btn");

    startButton.addEventListener("click", () => {
      resolve(); // you can enhance this to return placement data later
    });

    container.appendChild(grid);
    container.appendChild(shipList);
    shipDialog.appendChild(heading);
    shipDialog.appendChild(container);
    shipDialog.appendChild(startButton);
    mainContainer.appendChild(shipDialog);
  });
}

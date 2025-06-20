import { handleGameBoardClick } from "..";

export default function renderGameBoard() {
  const mainContainer = document.querySelector(".main-container");

  function createBoard(playerName) {
    const section = document.createElement("div");
    section.classList.add("player-section");

    const heading = document.createElement("h2");
    heading.innerText = playerName;
    section.appendChild(heading);

    const gameBoard = document.createElement("div");
    gameBoard.classList.add("game-board", `board-${playerName}`);
    section.appendChild(gameBoard);

    for (let i = 0; i < 10; i++) {
      const row = document.createElement("div");
      row.classList.add("game-row");
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("game-cell");
        cell.dataset.row = i;
        cell.dataset.column = j;
        cell.addEventListener("click", () => {
          handleGameBoardClick(playerName, [i, j]);
        });
        row.appendChild(cell);
      }
      gameBoard.appendChild(row);
    }

    mainContainer.appendChild(section);
  }

  createBoard("player1");
  createBoard("player2");
}

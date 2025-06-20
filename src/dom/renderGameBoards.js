export default function renderGameBoard() {
  const mainContainer = document.querySelector(".main-container");

  const gameBoard = document.createElement("div");
  const heading = document.createElement("h2");
  heading.innerText = "Player";
  mainContainer.appendChild(heading);
  gameBoard.classList.add("game-board");
  gameBoard.classList.add("board-player1");
  mainContainer.appendChild(gameBoard);
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("game-row");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.dataset.row = i;
      cell.dataset.column = j;
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }

  const gameBoard2 = document.createElement("div");
  const heading2 = document.createElement("h2");
  heading2.innerText = "CPU";
  mainContainer.appendChild(heading2);
  gameBoard2.classList.add("game-board");
  gameBoard2.classList.add("board-player2");
  mainContainer.appendChild(gameBoard2);
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("game-row");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.dataset.row = i;
      cell.dataset.column = j;
      row.appendChild(cell);
    }
    gameBoard2.appendChild(row);
  }
}

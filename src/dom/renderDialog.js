export default function renderDialog() {
  return new Promise((resolve) => {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.innerHTML = "";

    const dialog = document.createElement("div");
    dialog.classList.add("dialog");

    const heading = document.createElement("h2");
    heading.innerText = "Enter Player Names";

    const player1Input = document.createElement("input");
    player1Input.placeholder = "Player 1 Name";

    const player2Input = document.createElement("input");
    player2Input.placeholder = "Player 2 Name";

    const startButton = document.createElement("button");
    startButton.innerText = "Start Game";

    startButton.addEventListener("click", () => {
      const player1Name = player1Input.value.trim() || "Player 1";
      const player2Name = player2Input.value.trim() || "Player 2";
      resolve({ player1Name, player2Name });
    });

    dialog.appendChild(heading);
    dialog.appendChild(player1Input);
    dialog.appendChild(player2Input);
    dialog.appendChild(startButton);
    mainContainer.appendChild(dialog);
  });
}

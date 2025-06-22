export default function endGame(message) {
  const overlay = document.createElement("div");
  overlay.id = "game-over-overlay";
  overlay.classList.add("game-over-overlay");

  const messageEl = document.createElement("div");
  messageEl.textContent = message;
  messageEl.classList.add("game-over-message");

  const button = document.createElement("button");
  button.textContent = "Play Again";
  button.classList.add("game-over-button");

  button.addEventListener("click", () => {
    location.reload(); // or call resetGame() if you implement one
  });

  overlay.appendChild(messageEl);
  overlay.appendChild(button);
  document.body.appendChild(overlay);
}

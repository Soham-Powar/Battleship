import Player from "../components/Player";

import renderNameDialog from "./renderNameDialog";
import renderPlaceShipDialog from "./renderPlaceShipDialog";
import renderGameBoards from "./renderGameBoards";
import renderShipCoords from "./renderShipCoords";

import addTempData from "../utils/addTempData";

export let players = [];

export default async function gameStart() {
  //show dialog to get the player Name
  // const { player1Name, player2Name } = await renderNameDialog();
  const player1Name = "s";
  const player2Name = "A";

  const player1 = new Player(player1Name);
  const player2 = new Player(player2Name);
  players = [player1, player2];
  console.log(players);
  await renderPlaceShipDialog(players[0]);
  renderGameBoards(players);
  addTempData(players);
  renderShipCoords(players[0]);
  //   renderShipCoords(players[1]);
}

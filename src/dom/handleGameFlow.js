import Player from "../components/Player";

import renderDialog from "./renderDialog";
import renderGameBoards from "./renderGameBoards";
import renderShipCoords from "./renderShipCoords";

import addTempData from "../utils/addTempData";

export let players = [];

export default async function gameStart() {
  //show dialog to get the player Name
  const { player1Name, player2Name } = await renderDialog();

  const player1 = new Player(player1Name);
  const player2 = new Player(player2Name);
  players = [player1, player2];
  console.log(players);
  renderGameBoards(players);
  addTempData(players);
  renderShipCoords(players[0]);
  //   renderShipCoords(players[1]);
}

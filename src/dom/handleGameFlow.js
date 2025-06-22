import Player from "../components/Player";

import renderNameDialog from "./renderNameDialog";
import renderPlaceShipDialog from "./renderPlaceShipDialog";
import renderGameBoards from "./renderGameBoards";
import renderShipCoords from "./renderShipCoords";

import addEnemyData from "../utils/addEnemyData";

export let players = [];

export default async function gameStart() {
  //show dialog to get the player Name
  const { player1Name, player2Name } = await renderNameDialog();
  // const player1Name = "s";
  // const player2Name = "Enemy";

  const player1 = new Player(player1Name);
  const player2 = new Player(player2Name);
  players = [player1, player2];

  await renderPlaceShipDialog(players[0]);
  renderGameBoards(players);
  addEnemyData(players[1]);
  renderShipCoords(players[0]);
}

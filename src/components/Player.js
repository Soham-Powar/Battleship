import GameBoard from "../components/GameBoard";

export default class Player {
  constructor(name) {
    this.gameBoard = new GameBoard();
    this.name = name;
  }
}

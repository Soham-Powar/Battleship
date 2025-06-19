export default class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(null)
    );
    this.ships = [];
  }
}

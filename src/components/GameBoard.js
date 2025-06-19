export default class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(null)
    );
    this.ships = [];
  }

  placeShip(ship, [x, y]) {
    const shipLength = ship.getLength();
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    } else {
      return true;
    }
  }
}

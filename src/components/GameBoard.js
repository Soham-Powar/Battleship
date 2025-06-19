export default class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(null)
    );
    this.ships = [];
    this.hasShip = [];
  }

  #markAllCoords(x, y, shipLength) {
    let i = 0;
    while (i < shipLength) {
      this.hasShip.push([x, y++]);
      i++;
    }
  }

  #coordHasShip([x, y]) {
    return this.hasShip.some((coord) => coord[0] === x && coord[1] === y);
  }

  placeShip(ship, [x, y]) {
    const shipLength = ship.getLength();
    if (
      x < 0 ||
      x > 9 ||
      y < 0 ||
      y > 9 ||
      y + shipLength - 1 > 9 ||
      this.#coordHasShip([x, y])
    ) {
      return false;
    } else {
      this.board[x][y] = ship;
      this.ships.push(ship);
      this.#markAllCoords(x, y, shipLength);
      return true;
    }
  }

  receiveAttack([x, y]) {
    if (this.#coordHasShip([x, y])) {
      this.board[x][y].hit();
      return true;
    }
    return false;
  }
}

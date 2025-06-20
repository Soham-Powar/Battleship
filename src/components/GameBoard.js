export default class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(null)
    );
    this.ships = [];
    this.missedShots = [];
  }

  #markAllCoords(x, y, shipLength) {
    let i = 0;
    let shipsCoords = [];
    while (i < shipLength) {
      shipsCoords.push([x, y++]);
      i++;
    }
    return shipsCoords;
  }

  #coordHasShip([x, y]) {
    return this.ships.some((ship) => {
      return ship.shipsCoords.some(([cx, cy]) => cx === x && cy === y);
    });
  }

  placeShip(ship, [x, y]) {
    const shipLength = ship.getLength();
    const attackedOn = [];
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
      const shipsCoords = this.#markAllCoords(x, y, shipLength);
      this.ships.push({ ship, shipsCoords, attackedOn });
      return true;
    }
  }

  getAttackedShip([x, y]) {
    return this.ships.find((obj) =>
      obj.shipsCoords.some(([cx, cy]) => cx === x && cy === y)
    );
  }

  receiveAttack([x, y]) {
    if (this.#coordHasShip([x, y])) {
      const attacked = this.getAttackedShip([x, y]);
      attacked.ship.hit();
      attacked.attackedOn.push([x, y]);
      return true;
    }

    this.missedShots.push([x, y]);
    return false;
  }

  allShipsSunk() {
    return this.ships.every((entry) => entry.ship.isSunk());
  }
}

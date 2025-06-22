export default class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;

    // not necessary ?
    this.board = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(null)
    );
    this.ships = [];
    this.missedShots = [];
  }

  #markAllCoords(x, y, shipLength, orientation) {
    const shipsCoords = [];
    for (let i = 0; i < shipLength; i++) {
      if (orientation === "vertical") {
        shipsCoords.push([x + i, y]);
      } else {
        shipsCoords.push([x, y + i]);
      }
    }
    return shipsCoords;
  }

  #coordHasShip([x, y]) {
    return this.ships.some((ship) => {
      return ship.shipsCoords.some(([cx, cy]) => cx === x && cy === y);
    });
  }

  placeShip(ship, [x, y], orientation = "horizontal") {
    const shipLength = ship.getLength();
    const attackedOn = [];

    if (x < 0 || y < 0 || x >= this.rows || y >= this.columns) return false;

    const outOfBounds =
      orientation === "horizontal"
        ? y + shipLength > this.columns
        : x + shipLength > this.rows;

    if (outOfBounds) return false;

    const shipsCoords = this.#markAllCoords(x, y, shipLength, orientation);

    const overlap = shipsCoords.some((coord) => this.#coordHasShip(coord));
    if (overlap) return false;

    this.ships.push({ ship, shipsCoords, attackedOn });
    return true;
  }

  getAttackedShip([x, y]) {
    return this.ships.find((obj) =>
      obj.shipsCoords.some(([cx, cy]) => cx === x && cy === y)
    );
  }

  receiveAttack([x, y]) {
    if (this.#coordHasShip([x, y])) {
      const attacked = this.getAttackedShip([x, y]);

      const alreadyHit = attacked.attackedOn.some(
        ([ax, ay]) => ax === x && ay === y
      );

      if (!alreadyHit) {
        attacked.ship.hit();
        attacked.attackedOn.push([x, y]);
      }

      return true;
    }

    const alreadyMissed = this.missedShots.some(
      ([mx, my]) => mx === x && my === y
    );

    if (!alreadyMissed) {
      this.missedShots.push([x, y]);
    }

    return false;
  }

  allShipsSunk() {
    return this.ships.every((entry) => entry.ship.isSunk());
  }
}

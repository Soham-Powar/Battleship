export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits += 1;
    this.sunk = this.hits >= this.length;
  }

  isSunk() {
    return this.sunk;
  }

  getLength() {
    return this.length;
  }

  getHits() {
    return this.hits;
  }
}

import Ship from "../components/Ship";

descibe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship("Destroyer", 3);
  });

  it("should create a ship with a name and length", () => {
    expect(ship.name).toBe("Destroyer");
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  it("should register a hit", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it("should register multiple hits", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it("should determine if the ship is sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

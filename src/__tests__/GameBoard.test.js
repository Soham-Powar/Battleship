import GameBoard from "../components/GameBoard";

describe("GameBoard", () => {
  //scope issues
  let gameBoard;
  let mockShip;
  let mockShip2;
  function createMockShip(name, length) {
    let hits = 0;

    return {
      name,
      getLength: jest.fn(() => length),
      getHits: jest.fn(() => hits),
      hit: jest.fn(() => {
        hits++;
      }),
      isSunk: jest.fn(() => hits >= length),
    };
  }

  // Reset the game board and mock ship before each test
  beforeEach(() => {
    gameBoard = new GameBoard();
    mockShip = createMockShip("Destroyer", 3);
    mockShip2 = createMockShip("Cruiser", 4);
  });

  // Test cases for GameBoard class
  it("should initialize with the correct dimensions", () => {
    expect(gameBoard.rows).toBe(10);
    expect(gameBoard.columns).toBe(10);
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
  });

  it("should initialize the board with null values", () => {
    for (let row of gameBoard.board) {
      for (let cell of row) {
        expect(cell).toBeNull();
      }
    }
  });

  it("should initialize with an empty ships array", () => {
    expect(gameBoard.ships).toEqual([]);
  });

  // Test cases for placing ships
  it("should check if given coordinate for placing ship is valid", () => {
    expect(gameBoard.placeShip(mockShip, [1, 3])).toBeTruthy();
    expect(gameBoard.placeShip(mockShip, [-1, 0])).toBeFalsy();
  });

  it("should check if ship fits for given coords", () => {
    expect(gameBoard.placeShip(mockShip, [0, 7])).toBeTruthy();
    expect(gameBoard.placeShip(mockShip, [0, 8])).toBeFalsy();
  });

  it("should not place a ship on same coords", () => {
    expect(gameBoard.placeShip(mockShip, [1, 3])).toBeTruthy();
    expect(gameBoard.placeShip(mockShip2, [1, 3])).toBeFalsy();
    expect(gameBoard.placeShip(mockShip2, [1, 5])).toBeFalsy();
    expect(gameBoard.placeShip(mockShip2, [2, 5])).toBeTruthy();
    expect(gameBoard.ships.length).toBe(2);
  });

  // Test cases for receiving hits
  it("should receive a hit if ship present on that coords", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    expect(gameBoard.receiveAttack([1, 3])).toBeTruthy();
    expect(gameBoard.receiveAttack([0, 0])).toBeFalsy();
  });

  it("should call hit function on ship (exact hit)", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    gameBoard.receiveAttack([1, 3]);
    expect(mockShip.hit.mock.calls).toHaveLength(1);
  });

  it("should call hit function on ship (other coords - length of ship)", () => {
    gameBoard.placeShip(mockShip2, [3, 5]);
    gameBoard.receiveAttack([3, 8]);
    expect(mockShip2.hit.mock.calls).toHaveLength(1);
  });

  it("should add a missed shot if ship not at coord", () => {
    gameBoard.receiveAttack([1, 3]);
    expect(
      gameBoard.missedShots.some((coord) => coord[0] === 1 && coord[1] === 3),
    ).toBeTruthy();
  });

  it("should not add a missed shot if ship present at coord", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    gameBoard.receiveAttack([1, 3]);
    expect(
      gameBoard.missedShots.some((coord) => coord[0] === 1 && coord[1] === 3),
    ).toBeFalsy();
  });

  // all ships sunk or not

  it("should return true if all ships are sunk when only one ship", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    gameBoard.receiveAttack([1, 3]);
    gameBoard.receiveAttack([1, 4]);
    gameBoard.receiveAttack([1, 5]);
    expect(gameBoard.allShipsSunk()).toBeTruthy();
  });

  it("should return false if not all ships are sunk", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    gameBoard.placeShip(mockShip2, [3, 5]);
    gameBoard.receiveAttack([1, 3]);
    gameBoard.receiveAttack([1, 4]);
    expect(gameBoard.allShipsSunk()).toBeFalsy();
  });

  it("should return true if all ships are sunk when multiple ships", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    gameBoard.placeShip(mockShip2, [3, 5]);
    gameBoard.receiveAttack([1, 3]);
    gameBoard.receiveAttack([1, 4]);
    gameBoard.receiveAttack([1, 5]);
    gameBoard.receiveAttack([3, 5]);
    gameBoard.receiveAttack([3, 6]);
    gameBoard.receiveAttack([3, 7]);
    gameBoard.receiveAttack([3, 8]);
    expect(gameBoard.allShipsSunk()).toBeTruthy();
  });

  // handle horizontal and vertical orientation
  it("should place ship vertically", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.placeShip(mockShip, [1, 3], "vertical")).toBeTruthy();
    expect(gameBoard.ships[0].shipsCoords).toEqual([
      [1, 3],
      [2, 3],
      [3, 3],
    ]);
  });

  it("should place ship horizontally", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.placeShip(mockShip, [1, 3], "horizontal")).toBeTruthy();
    expect(gameBoard.ships[0].shipsCoords).toEqual([
      [1, 3],
      [1, 4],
      [1, 5],
    ]);
  });

  it("should not place ship vertically if out of bounds", () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.placeShip(mockShip, [8, 3], "vertical")).toBeFalsy();
  });
});

// handle vertical orientation

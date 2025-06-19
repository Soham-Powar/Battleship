import GameBoard from "../components/GameBoard";

describe("GameBoard", () => {
  //scope issues
  let gameBoard;
  let mockShip;

  beforeEach(() => {
    // Reset the game board and mock ship before each test
    gameBoard = new GameBoard();
    mockShip = {
      name: "Destroyer",
      length: 3,
      hits: 0,
      sunk: false,
      hit: jest.fn(),
      isSunk: jest.fn().mockReturnValue(false),
      getLength: jest.fn().mockReturnValue(3),
      getHits: jest.fn().mockReturnValue(0),
    };
    mockShip2 = {
      name: "Destroyer",
      length: 4,
      hits: 0,
      sunk: false,
      hit: jest.fn(),
      isSunk: jest.fn().mockReturnValue(false),
      getLength: jest.fn().mockReturnValue(4),
      getHits: jest.fn().mockReturnValue(0),
    };
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

  //Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

  // Test cases for receiving hits
  it("should receive a hit if ship present on that coords", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    expect(gameBoard.receiveAttack([1, 3])).toBeTruthy();
    expect(gameBoard.receiveAttack([0, 0])).toBeFalsy();
  });

  it("should send hit function on ship hit", () => {
    gameBoard.placeShip(mockShip, [1, 3]);
    gameBoard.receiveAttack([1, 3]);
    expect(mockShip.hit.mock.calls).toHaveLength(1);
  });
});

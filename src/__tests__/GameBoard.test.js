import GameBoard from "../components/GameBoard";

describe("GameBoard", () => {
  //scope issues
  let gameBoard;
  let mockShip;

  beforeEach(() => {
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
  });
});

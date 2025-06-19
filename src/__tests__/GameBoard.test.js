import GameBoard from "../components/GameBoard";

describe("GameBoard", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
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

  it("should place a ship at given coordinate", () => {
    const mockShip = {
      name: "Destroyer",
      length: 3,
      hits: 0,
      sunk: false,
      hit: jest.fn(),
      isSunk: jest.fn().mockReturnValue(false),
    };
    expect(gameBoard.placeShip(mockShip, [1, 3])).toBeTruthy();
  });
});

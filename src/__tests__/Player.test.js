import Player from "../components/Player";

describe("player tests", () => {
  let player;

  beforeEach(() => {
    player = new Player("Test Player");
  });

  it("should create a player with a name", () => {
    expect(player.name).toBe("Test Player");
  });

  it("should initialize with a game board", () => {
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard.rows).toBe(10);
    expect(player.gameBoard.columns).toBe(10);
  });
});

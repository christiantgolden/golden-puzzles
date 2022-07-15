/**
 * @description Game factory method
 * @returns new Game of specified type
 */
const CreateGame = () => {
  for (const g in GAMES) {
    if (GAMES[g].active) {
      switch (g) {
        case "SUDOKU":
          return new Sudoku();
        case "MINES":
          return new Mines();
        case "BINARY":
          return new Binary();
        default:
          return new Sudoku();
      }
    }
  }
};

class Game {
  size;
  board;
  difficulty;
  constructor(size) {
    this.difficulty =
      DIFFICULTY_MAP[document.getElementById("diff").value.toUpperCase()];
    this.board = [""];
    this.size = size;
    this.generateBoard();
  }
}

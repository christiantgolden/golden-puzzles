/**
 * @description Game factory method
 * @returns new Game of specified type
 */
const Game = () => {
  for (const g in GAMES) {
    if (GAMES[g].active) {
      switch (g) {
        case "SUDOKU":
          console.log("Creating new Sudoku game.");
          return new Sudoku();
        case "MINES":
          return new MINES();
        case "BINARY":
          return new Binary();
        case "CROSSBYTE":
          return new Crossbyte();
        default:
          console.log("defaulting to new sudoku");
          return new Sudoku();
      }
    }
  }
};

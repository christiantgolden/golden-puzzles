const GAMES = {
  BINARY: { active: false, visible: false },
  MINES: { active: false, visible: false },
  SUDOKU: { active: true, visible: true },
  CROSSBYTE: { active: false, visible: false },
};
const AVAILABLE_GAMES = ["BINARY", "SUDOKU", "MINES"];
const DIFFICULTY_MAP = {
  EASY: 3,
  NORMAL: 5,
  HARD: 8,
  INSANE: 10,
};
const GAME_INSTRUCTIONS = {
  BINARY: [
    "Each row/column must have five 0's and five 1's.",
    "There can be no more than two 0's or 1's adjacent to one another.",
    "No two rows or columns may be identical.",
  ],
  MINES: [
    "This is a semi-clone of Minesweeper.",
    "All 0's and Bombs have been hidden.",
    "Discern which blanks are 0's and which are Bombs.",
  ],
  SUDOKU: [
    "Each row/column/box must have each of the numbers 1-9.",
    "None of the numbers 1-9 may be repeated in any row, column, or box.",
  ],
};

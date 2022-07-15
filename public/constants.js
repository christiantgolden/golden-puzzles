const GAMES = {
  BINARY: { active: false, visible: false },
  MINES: { active: false, visible: false },
  SUDOKU: { active: true, visible: true },
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
    "Each row/column has five 0's and five 1's.",
    "No more than two 0's or 1's adjacent to one another.",
    "No two rows or columns may be identical.",
  ],
  MINES: [
    "This is a semi-clone of Minesweeper.",
    "All 0's and Bombs have been hidden.",
    "Discern which blanks are 0's and which are Bombs.",
  ],
  SUDOKU: ["Each row/column/box has each of the numbers 1-9."],
};

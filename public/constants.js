const GAMES = {
  BINARY: { active: false, visible: false },
  MINES: { active: false, visible: false },
  TENTS: { active: false, visible: false },
  SUDOKU: { active: true, visible: true },
};
const AVAILABLE_GAMES = ["BINARY", "TENTS", "MINES"];
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
    "All 0's and mines have been hidden.",
    "Discern which blanks are 0's and which are mines.",
  ],
  SUDOKU: ["Each row/column/box has each of the numbers 1-9."],
  TENTS: [
    "Place tents in the grid.",
    "Each tree has one tent next to it (horizontally or vertically)",
    "Tents do not touch each other, not even diagonally.",
    "The numbers outside the grid show how many tents in that row or column.",
  ],
};
const SUDOKU_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const TREE = "🌳";
const TENT = "⛺";
const TOP_LEFT = (board, i, j) => {
  return board[i - 1] && board[i - 1][j - 1];
};
const TOP = (board, i, j) => {
  return board[i - 1] && board[i - 1][j];
};
const TOP_RIGHT = (board, i, j) => {
  return board[i - 1] && board[i - 1][j + 1];
};
const RIGHT = (board, i, j) => {
  return board[i] && board[i][j + 1];
};
const BOTTOM_RIGHT = (board, i, j) => {
  return board[i + 1] && board[i + 1][j + 1];
};
const BOTTOM = (board, i, j) => {
  return board[i + 1] && board[i + 1][j];
};
const BOTTOM_LEFT = (board, i, j) => {
  return board[i + 1] && board[i + 1][j + 1];
};
const LEFT = (board, i, j) => {
  return board[i] && board[i][j - 1];
};

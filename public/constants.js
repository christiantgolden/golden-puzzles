const GAMES = {
  BINARY: { active: false, visible: false },
  MINES: { active: false, visible: false },
  TENTS: { active: false, visible: false },
  SUDOKU: { active: true, visible: true },
};
const BLANK_CELL_COLOR = "#ddd";
const FILLED_CELL_COLOR = "#aaa";
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
    "<a href='https://en.wikipedia.org/wiki/Takuzu' target='_blank' rel='noopener noreferrer'>Binary Wikipedia Page</a>",
  ],
  MINES: [
    "This is a semi-clone of Minesweeper.",
    "All 0's 😊 and mines 🤯 have been hidden.",
    "Discern which blanks are 0's and which are mines.",
    "<a href='https://en.wikipedia.org/wiki/Minesweeper_(video_game)' target='_blank' rel='noopener noreferrer'>Minesweeper Wikipedia Page</a>",
  ],
  SUDOKU: [
    "Each row/column/box has each of the numbers 1-9.",
    "<a href='https://en.wikipedia.org/wiki/Sudoku' target='_blank' rel='noopener noreferrer'>Sudoku Wikipedia Page</a>",
  ],
  TENTS: [
    "Place tents⛺/grass🟩 in the grid.",
    "Each tree🌳 has at least one adjacent tent.",
    "Tents do not touch each other, even diagonally.",
    "Numbers indicate how many tents per row/column.",
  ],
};
const SUDOKU_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const TREE = "🌳";
const TENT = "⛺";
const GRASS = "🟩";
const PERSON_SAFE = "😊";
const PERSON_MINE = "🤯";
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

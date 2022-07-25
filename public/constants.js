const GAMES = {
  BINARY: { active: false, visible: false },
  MINES: { active: false, visible: false },
  TENTS: { active: false, visible: false },
  BOXES: { active: false, visible: false },
  SUDOKU: { active: false, visible: false },
  BOX16: { active: false, visible: false },
  HEXOKU: { active: true, visible: true },
};
const BOARD_OPERATIONS = ["transpose", "reverse", "transpose-reverse", "none"];
const BLANK_CELL_COLOR = "#ddd";
const FILLED_CELL_COLOR = "#aaa";
const AVAILABLE_GAMES = [
  "BINARY",
  "TENTS",
  "MINES",
  "HEXOKU",
  "BOXES",
  "BOX16",
  "SUDOKU",
];
const DIFFICULTY_MAP = {
  EASY: 3,
  NORMAL: 5,
  HARD: 8,
  INSANE: 10,
};
const GAME_INSTRUCTIONS = {
  BINARY: [
    "Each row/column has five 0's and five 1's. No more than two 0's or 1's adjacent to one another. No two rows or columns may be identical.",
  ],
  MINES: [
    "A semi-clone of Minesweeper. All 0's 😊 and mines 🤯 are hidden.Discern which blanks are 😊 and which are 🤯.",
  ],
  SUDOKU: ["Each row/column/box has each of the numbers 1-9."],
  TENTS: [
    "Place⛺/🟩 in the grid. Each 🌳 has at least one adjacent ⛺. ⛺ do not touch each other, even diagonally. Numbers indicate how many ⛺ per row/column.",
  ],
  BOXES: [
    "Sudoku, but the center cell of each box is the sum of its surrounding cells.",
  ],
  BOX16: [
    "Sudoku, but each white cell contains the sum of its surrounding cells",
  ],
  HEXOKU: ["Sudoku, but hexadecimal"],
};
const SUDOKU_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const HEXOKU_NUMBERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
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

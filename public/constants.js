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
/* TODO: consider swapping out emojis for icons:
<i class="fa-solid fa-tree"></i> for tree
<i class="fa-solid fa-tent"></i> for tent
and then just green background for grass*/
//const TREE = "🌳";
const TREE = `<svg class="svg-inline--fa fa-tree tree" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tree" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"></path></svg><!-- <i class="fa-solid fa-tree tree"></i> Font Awesome fontawesome.com -->`;
const TENT = `<svg class="svg-inline--fa fa-tent tent" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tent" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M269.4 5.961C280.5-1.987 295.5-1.987 306.6 5.961L530.6 165.1C538 171.2 542.8 179.4 543.8 188.5L575.8 476.5C576.8 485.5 573.9 494.6 567.8 501.3C561.8 508.1 553.1 512 544 512H416L288 288V512H32C22.9 512 14.23 508.1 8.156 501.3C2.086 494.6-.8093 485.5 .1958 476.5L32.2 188.5C33.2 179.4 38 171.2 45.4 165.1L269.4 5.961z"></path></svg><!-- <i class="fa-solid fa-tent tent"></i> Font Awesome fontawesome.com -->`;
const GRASS = `<svg class="svg-inline--fa fa-wheat-awn grass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wheat-awn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416.1 128.1C407.6 138.3 392.4 138.3 383 128.1C373.7 119.6 373.7 104.4 383 95.03L471 7.029C480.4-2.343 495.6-2.343 504.1 7.029C514.3 16.4 514.3 31.6 504.1 40.97L416.1 128.1zM327.2 230.1L295.3 261.1C323.8 264.7 351.5 277 373.4 298.8L395.1 321.5L373.4 344.1C335.9 381.6 275.1 381.6 237.6 344.1L225.4 331.9L193.5 363.8C221.1 366.5 249.7 378.8 271.5 400.7L294.2 423.3L271.5 445.9C234 483.4 173.3 483.4 135.8 445.9L123.5 433.7L54.63 502.6C42.13 515.1 21.87 515.1 9.372 502.6C-3.124 490.1-3.124 469.9 9.372 457.4L78.29 388.5L67.88 378C30.39 340.6 30.39 279.8 67.88 242.3L90.51 219.6L113.1 242.3C134.1 263.3 146.3 289.7 149.7 317.1L180.1 286.6L169.7 276.2C132.2 238.7 132.2 177.9 169.7 140.5L192.3 117.8L214.1 140.5C235.1 161.4 248.1 187.9 251.5 215.3L281.9 184.8L271.5 174.4C234 136.9 234 76.12 271.5 38.63L294.2 16L316.8 38.63C321.3 43.15 325.4 47.94 329.1 52.93L375 7.03C384.4-2.343 399.6-2.343 408.1 7.03C418.3 16.4 418.3 31.6 408.1 40.97L350.7 99.2C355.9 120.7 355.4 143.2 349.3 164.5C369.6 158.7 391.1 157.1 411.7 162.4L471 103C480.4 93.66 495.6 93.66 504.1 103C514.3 112.4 514.3 127.6 504.1 136.1L458.8 183.2C464.5 187.2 470 191.9 475.2 197L497.8 219.6L475.2 242.3C437.7 279.8 376.9 279.8 339.4 242.3L327.2 230.1z"></path></svg><!-- <i class="fa-solid fa-wheat-awn grass"></i> Font Awesome fontawesome.com -->`;
const PERSON_SAFE = "😊";
const PERSON_MINE = "🤯";
const GAME_INSTRUCTIONS = {
  BINARY: [
    "Each row/column has five 0's and five 1's. No more than two 0's or 1's adjacent to one another. No two rows or columns may be identical.",
  ],
  MINES: [
    "A semi-clone of Minesweeper. All 0's 😊 and mines 🤯 are hidden.Discern which blanks are 😊 and which are 🤯.",
  ],
  SUDOKU: ["Each row/column/box has each of the numbers 1-9."],
  TENTS: [
    `Place tents/wheat in the grid. Each tree has at least one adjacent tent. Tents do not touch each other, even diagonally. Numbers indicate how many tents per row/column.`,
  ],
  BOXES: [
    "Sudoku, but the center cell of each box is the sum of its surrounding cells.",
  ],
  BOX16: [
    "Sudoku, but each white cell contains the sum of its surrounding cells",
  ],
  HEXOKU: ["Sudoku, but hexadecimal"],
};
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

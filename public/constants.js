const INITIAL_SEED = Math.floor(Math.random() * 11235813 + 1);
const PUZZLES = {
  BINARY: { active: false, visible: false },
  MINES: { active: false, visible: false },
  TENTS: { active: false, visible: false },
  BOXES: { active: false, visible: false },
  SUDOKU: { active: false, visible: false },
  BOX16: { active: false, visible: false },
  HEXOKU: { active: true, visible: true },
};
const BOARD_OPERATIONS = ["transpose", "reverse", "transpose-reverse", "none"];
const BLANK_CELL_COLOR = "#c9c9c9";
const FILLED_CELL_COLOR = "#efefef";
const SOLVED_COLOR = "#25dd99";

const AVAILABLE_PUZZLES = [
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
const TREE = `<svg class="svg-inline--fa fa-tree tree" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tree" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"></path></svg><!-- <i class="fa-solid fa-tree tree"></i> Font Awesome fontawesome.com -->`;
const TENT = `<svg class="svg-inline--fa fa-tent tent" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tent" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M269.4 5.961C280.5-1.987 295.5-1.987 306.6 5.961L530.6 165.1C538 171.2 542.8 179.4 543.8 188.5L575.8 476.5C576.8 485.5 573.9 494.6 567.8 501.3C561.8 508.1 553.1 512 544 512H416L288 288V512H32C22.9 512 14.23 508.1 8.156 501.3C2.086 494.6-.8093 485.5 .1958 476.5L32.2 188.5C33.2 179.4 38 171.2 45.4 165.1L269.4 5.961z"></path></svg><!-- <i class="fa-solid fa-tent tent"></i> Font Awesome fontawesome.com -->`;
const GRASS = `<svg class="svg-inline--fa fa-wheat-awn grass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wheat-awn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416.1 128.1C407.6 138.3 392.4 138.3 383 128.1C373.7 119.6 373.7 104.4 383 95.03L471 7.029C480.4-2.343 495.6-2.343 504.1 7.029C514.3 16.4 514.3 31.6 504.1 40.97L416.1 128.1zM327.2 230.1L295.3 261.1C323.8 264.7 351.5 277 373.4 298.8L395.1 321.5L373.4 344.1C335.9 381.6 275.1 381.6 237.6 344.1L225.4 331.9L193.5 363.8C221.1 366.5 249.7 378.8 271.5 400.7L294.2 423.3L271.5 445.9C234 483.4 173.3 483.4 135.8 445.9L123.5 433.7L54.63 502.6C42.13 515.1 21.87 515.1 9.372 502.6C-3.124 490.1-3.124 469.9 9.372 457.4L78.29 388.5L67.88 378C30.39 340.6 30.39 279.8 67.88 242.3L90.51 219.6L113.1 242.3C134.1 263.3 146.3 289.7 149.7 317.1L180.1 286.6L169.7 276.2C132.2 238.7 132.2 177.9 169.7 140.5L192.3 117.8L214.1 140.5C235.1 161.4 248.1 187.9 251.5 215.3L281.9 184.8L271.5 174.4C234 136.9 234 76.12 271.5 38.63L294.2 16L316.8 38.63C321.3 43.15 325.4 47.94 329.1 52.93L375 7.03C384.4-2.343 399.6-2.343 408.1 7.03C418.3 16.4 418.3 31.6 408.1 40.97L350.7 99.2C355.9 120.7 355.4 143.2 349.3 164.5C369.6 158.7 391.1 157.1 411.7 162.4L471 103C480.4 93.66 495.6 93.66 504.1 103C514.3 112.4 514.3 127.6 504.1 136.1L458.8 183.2C464.5 187.2 470 191.9 475.2 197L497.8 219.6L475.2 242.3C437.7 279.8 376.9 279.8 339.4 242.3L327.2 230.1z"></path></svg><!-- <i class="fa-solid fa-wheat-awn grass"></i> Font Awesome fontawesome.com -->`;
const PERSON_SAFE =
  '<svg class="svg-inline--fa fa-heart safe" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"></path></svg><!-- <i class="fa-regular fa-heart safe"></i> Font Awesome fontawesome.com -->';
const PERSON_MINE = `<svg class="svg-inline--fa fa-explosion mine" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="explosion" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M499.6 11.32C506.3 .5948 520.1-3.127 531.3 2.814C542.4 8.754 547.1 22.32 541.9 33.84L404.8 338.6C406.9 340.9 409 343.3 411.1 345.7L508.2 291.1C518.7 285.2 531.9 287.9 539.1 297.5C546.4 307 545.4 320.5 536.1 328.1L449.9 415.1H378.5C365.4 378.7 329.8 351.1 288 351.1C246.2 351.1 210.6 378.7 197.5 415.1H117.8L42.34 363.7C32.59 356.1 29.23 344.1 34.43 333.5C39.64 322.8 51.84 317.6 63.16 321.1L160.4 351.5C163.3 347.6 166.5 343.8 169.7 340.2L107.4 236.3C101.4 226.3 103.5 213.3 112.5 205.7C121.5 198.1 134.7 198.1 143.6 205.8L246 293.6C247.5 293.2 249 292.8 250.5 292.4L264.1 149.7C265.3 137.4 275.6 127.1 288 127.1C300.4 127.1 310.7 137.4 311.9 149.7L325.4 291.6L499.6 11.32zM544 447.1C561.7 447.1 576 462.3 576 479.1C576 497.7 561.7 511.1 544 511.1H32C14.33 511.1 0 497.7 0 479.1C0 462.3 14.33 447.1 32 447.1H544zM288-.0046C301.3-.0046 312 10.74 312 23.1V71.1C312 85.25 301.3 95.1 288 95.1C274.7 95.1 264 85.25 264 71.1V23.1C264 10.74 274.7-.0046 288-.0046V-.0046z"></path></svg><!-- <i class="fa-solid fa-explosion mine"></i> Font Awesome fontawesome.com -->`;
const PUZZLE_INSTRUCTIONS = {
  BINARY: [
    "Each row/column has five 0's and five 1's. No more than two 0's or 1's adjacent to one another. No two rows or columns may be identical.",
  ],
  MINES: [
    "A semi-clone of Minesweeper. All 0's (hearts) and mines are hidden. Discern which blanks are hearts and which are mines.",
  ],
  SUDOKU: ["Each row/column/box has each of the numbers 1-9."],
  TENTS: [
    `Place tents/wheat in the grid. Each tree has at least one adjacent tent. Tents do not touch each other, even diagonally. Numbers indicate how many tents per row/column.`,
  ],
  BOXES: [
    "Sudoku, but the center cell of each box is the sum of its surrounding cells.",
  ],
  BOX16: [
    "Sudoku, but each white cell contains the sum of its surrounding cells.",
  ],
  HEXOKU: ["Sudoku, but hexadecimal."],
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
  return board[i + 1] && board[i + 1][j - 1];
};
const LEFT = (board, i, j) => {
  return board[i] && board[i][j - 1];
};

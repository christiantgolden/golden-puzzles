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
        case "TENTS":
          return new Tents();
        case "BOXES":
          return new Boxes();
        case "BOX16":
          return new Box16();
        case "HEXOKU":
          return new Hexoku();
        default:
          return new Tents();
      }
    }
  }
};

class Game {
  size;
  board;
  difficulty;
  table_width;
  cell_width;
  cell_height;
  font_size;
  input_font_size;
  solved_board;
  unsolved_board;
  current_board;
  is_solved;
  remaining_blanks;
  has_invalid_cell;
  constructor(size) {
    this.has_invalid_cell = false;
    this.remaining_blanks = 0;
    this.difficulty =
      DIFFICULTY_MAP[document.getElementById("activediff").innerText];
    this.board = [""];
    this.solved_board = [];
    this.unsolved_board = [];
    this.current_board = [];
    this.size = size;
    this.game_table = document.getElementById("game_table");
    this.table_width = Math.min(
      window.innerWidth,
      window.innerHeight * 0.6,
      500
    );
    this.game_table.style.width = this.table_width * 0.95;
    this.cell_width = this.table_width / this.size;
    this.cell_height = this.cell_width;
    this.font_size = this.cell_height / 2;
    this.is_solved = false;
    this.generateBoard();
  }
  /*
    REFACTOR #27
      * check if each move valid regardless of initial solved board
      * https://github.com/christiantgolden/golden-puzzles/issues/27
  */
  displayInstructions() {
    const current_game = document.getElementById("active").innerText;
    let instructions_html = "";
    for (let i = 0; i < GAME_INSTRUCTIONS[current_game].length; i++) {
      instructions_html += GAME_INSTRUCTIONS[current_game][i] + "<br/>";
    }
    document.getElementById("instructions").innerHTML = instructions_html;
  }
  transpose() {
    this.board = this.board[0]
      .split("")
      .map((_, colIndex) => this.board.map((row) => row[colIndex]));
  }
  itemAdjacent(i, j, item) {
    if (
      (TOP(this.board, i, j) && TOP(this.board, i, j) == item) ||
      (RIGHT(this.board, i, j) && RIGHT(this.board, i, j) == item) ||
      (BOTTOM(this.board, i, j) && BOTTOM(this.board, i, j) == item) ||
      (LEFT(this.board, i, j) && LEFT(this.board, i, j) == item)
    ) {
      return true;
    }
    return false;
  }
  itemDiagonal(i, j, item) {
    if (
      (TOP_LEFT(this.board, i, j) && TOP_LEFT(this.board, i, j) === item) ||
      (TOP_RIGHT(this.board, i, j) && TOP_RIGHT(this.board, i, j) === item) ||
      (BOTTOM_RIGHT(this.board, i, j) &&
        BOTTOM_RIGHT(this.board, i, j) === item) ||
      (BOTTOM_LEFT(this.board, i, j) && BOTTOM_LEFT(this.board, i, j) === item)
    ) {
      return true;
    }
    return false;
  }
  itemSurrounding(i, j, item) {
    return this.itemAdjacent(i, j, item) && this.itemDiagonal(i, j, item);
  }
  randomize() {
    let random_operation =
      BOARD_OPERATIONS[Math.floor(Math.random() * BOARD_OPERATIONS.length)];
    switch (random_operation) {
      case "transpose":
        this.transpose();
        break;
      case "reverse":
        this.board = this.board.reverse();
        break;
      case "transpose-reverse":
        this.transpose();
        this.board = this.board.reverse();
        break;
      case "none":
        break;
    }
  }
}

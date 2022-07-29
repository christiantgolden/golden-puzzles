/**
 * @description Puzzle factory method
 * @returns new Puzzle of specified type
 */
const CreatePuzzle = (puzzle = "", board = "", difficulty = "") => {
  for (const g in PUZZLES) {
    if (PUZZLES[g].active) {
      switch (g) {
        case "SUDOKU":
          return new Sudoku(puzzle, board, difficulty);
        case "MINES":
          return new Mines(puzzle, board, difficulty);
        case "BINARY":
          return new Binary(puzzle, board, difficulty);
        case "TENTS":
          return new Tents(puzzle, board, difficulty);
        case "BOXES":
          return new Boxes(puzzle, board, difficulty);
        case "BOX16":
          return new Box16(puzzle, board, difficulty);
        case "HEXOKU":
          return new Hexoku(puzzle, board, difficulty);
        default:
          return new Tents(puzzle, board, difficulty);
      }
    }
  }
};

class Puzzle {
  size;
  board;
  difficulty;
  table_width;
  cell_width;
  cell_height;
  font_size;
  input_font_size;
  solved_board;
  remaining_blanks;
  flagged_cells;
  constructor(size, puzzle = "HEXOKU", board = "", difficulty = "NORMAL") {
    this.flagged_cells = [];
    this.remaining_blanks = 0;
    this.difficulty =
      DIFFICULTY_MAP[document.getElementById("activediff").innerText];
    this.board = [""];
    this.solved_board = [];
    this.size = size;
    this.puzzle_table = document.getElementById("puzzle_table");
    this.table_width = Math.min(
      window.innerWidth,
      window.innerHeight * 0.6,
      500
    );
    this.puzzle_table.style.width = this.table_width * 0.95;
    this.cell_width = this.table_width / this.size;
    this.cell_height = this.cell_width;
    this.font_size = this.cell_height / 2;
    this.generateBoard();
  }
  displayInstructions() {
    const current_puzzle = document.getElementById("active").innerText;
    let instructions_html = "";
    for (let i = 0; i < PUZZLE_INSTRUCTIONS[current_puzzle].length; i++) {
      instructions_html += PUZZLE_INSTRUCTIONS[current_puzzle][i] + "<br/>";
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
  isUpperLeftBox(i, j) {
    return i < 3 && j < 3;
  }
  isUpperMiddleBox(i, j) {
    return i < 3 && j > 2 && j < 6;
  }
  isUpperRightBox(i, j) {
    return i < 3 && j > 5;
  }
  isMiddleLeftBox(i, j) {
    return i > 2 && i < 6 && j < 3;
  }
  isMiddleMiddleBox(i, j) {
    return i > 2 && i < 6 && j > 2 && j < 6;
  }
  isMiddleRightBox(i, j) {
    return i > 2 && i < 6 && j > 5;
  }
  isBottomLeftBox(i, j) {
    return i > 5 && j < 3;
  }
  isBottomMiddleBox(i, j) {
    return i > 5 && j > 2 && j < 6;
  }
  isBottomRightBox(i, j) {
    return i > 5 && j > 5;
  }
  numAlreadyInBox(i, j, num) {
    let box = [];
    if (this.isUpperLeftBox(i, j)) {
      box = [
        this.board[0][0],
        this.board[0][1],
        this.board[0][2],
        this.board[1][0],
        this.board[1][1],
        this.board[1][2],
        this.board[2][0],
        this.board[2][1],
        this.board[2][2],
      ];
    } else if (this.isUpperMiddleBox(i, j)) {
      box = [
        this.board[0][3],
        this.board[0][4],
        this.board[0][5],
        this.board[1][3],
        this.board[1][4],
        this.board[1][5],
        this.board[2][3],
        this.board[2][4],
        this.board[2][5],
      ];
    } else if (this.isUpperRightBox(i, j)) {
      box = [
        this.board[0][6],
        this.board[0][7],
        this.board[0][8],
        this.board[1][6],
        this.board[1][7],
        this.board[1][8],
        this.board[2][6],
        this.board[2][7],
        this.board[2][8],
      ];
    } else if (this.isMiddleLeftBox(i, j)) {
      box = [
        this.board[3][0],
        this.board[3][1],
        this.board[3][2],
        this.board[4][0],
        this.board[4][1],
        this.board[4][2],
        this.board[5][0],
        this.board[5][1],
        this.board[5][2],
      ];
    } else if (this.isMiddleMiddleBox(i, j)) {
      box = [
        this.board[3][3],
        this.board[3][4],
        this.board[3][5],
        this.board[4][3],
        this.board[4][4],
        this.board[4][5],
        this.board[5][3],
        this.board[5][4],
        this.board[5][5],
      ];
    } else if (this.isMiddleRightBox(i, j)) {
      box = [
        this.board[3][6],
        this.board[3][7],
        this.board[3][8],
        this.board[4][6],
        this.board[4][7],
        this.board[4][8],
        this.board[5][6],
        this.board[5][7],
        this.board[5][8],
      ];
    } else if (this.isBottomLeftBox(i, j)) {
      box = [
        this.board[6][0],
        this.board[6][1],
        this.board[6][2],
        this.board[7][0],
        this.board[7][1],
        this.board[7][2],
        this.board[8][0],
        this.board[8][1],
        this.board[8][2],
      ];
    } else if (this.isBottomMiddleBox(i, j)) {
      box = [
        this.board[6][3],
        this.board[6][4],
        this.board[6][5],
        this.board[7][3],
        this.board[7][4],
        this.board[7][5],
        this.board[8][3],
        this.board[8][4],
        this.board[8][5],
      ];
    } else if (this.isBottomRightBox(i, j)) {
      box = [
        this.board[6][6],
        this.board[6][7],
        this.board[6][8],
        this.board[7][6],
        this.board[7][7],
        this.board[7][8],
        this.board[8][6],
        this.board[8][7],
        this.board[8][8],
      ];
    }
    let countNum = 0;
    for (let i = 0; i < box.length; i++) {
      if (box[i] === num) {
        countNum++;
        if (countNum > 1) {
          console.log("duplicate number in box");
          return true;
        }
      }
    }
    console.log("first time that number was entered in box");
    return false;
  }
  numAlreadyInRow(i, j, num) {
    let countNum = 0;
    for (let x = 0; x < this.board[i].length; x++) {
      if (this.board[i][x] === num) {
        countNum++;
        if (countNum > 1) {
          console.log("duplicate number in row");
          return true;
        }
      }
    }
    console.log("first time that number was entered in row");
    return false;
  }
  numAlreadyInColumn(i, j, num) {
    let countNum = 0;
    for (let x = 0; x < this.board.length; x++) {
      if (this.board[x][j] === num) {
        countNum++;
        if (countNum > 1) {
          console.log("duplicate number in column");
          return true;
        }
      }
    }
    console.log("first time number entered in column");
    return false;
  }
}

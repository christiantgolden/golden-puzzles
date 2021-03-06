class Tents extends Puzzle {
  constructor() {
    super(10);
  }
  generateBoard() {
    this.board = [];
    this.final_row = [];
    this.final_column = [];
    this.attempt_final_row = [];
    this.attempt_final_column = [];
    for (let i = 0; i < this.size - 1; i++) {
      this.board[i] = [];
      this.solved_board[i] = [];
      for (let j = 0; j < this.size - 1; j++) {
        let random_obj = mulberry32(seed++)();
        if (this.itemAdjacent(i, j, TENT)) {
          this.board[i][j] = TREE;
          this.solved_board[i][j] = TREE;
        } else if (this.itemDiagonal(i, j, TENT)) {
          this.board[i][j] = "";
          this.remaining_blanks++;
          this.solved_board[i][j] = GRASS;
        } else {
          this.board[i][j] = random_obj > 0.5 ? TENT : "";
          this.solved_board[i][j] = random_obj > 0.5 ? TENT : GRASS;
          this.remaining_blanks++;
        }
      }
    }
  }
  isValidMove(i, j, item) {
    let response = true;
    switch (item) {
      case TENT:
        if (this.itemAdjacent(i, j, TENT) || this.itemDiagonal(i, j, TENT)) {
          response = false;
        }
        return response;
      default:
        break;
    }
  }
  checkCorrect() {
    if (
      !(
        JSON.stringify(this.attempt_final_column) ==
          JSON.stringify(this.final_column) &&
        JSON.stringify(this.attempt_final_row) == JSON.stringify(this.final_row)
      )
    ) {
      return false;
    }
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === TENT) {
          if (!this.isValidMove(i, j, TENT)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  draw() {
    let puzzle_table_html = `<div style='width:${this.table_width}'>`;
    this.final_row = new Array(this.size - 1).fill(0);
    this.attempt_final_row = new Array(this.size - 1).fill(0);
    this.attempt_final_column = new Array(this.size - 1).fill(0);
    for (let r = 0; r < this.size - 1; r++) {
      puzzle_table_html += "<tr>";
      this.final_column[r] = 0;
      for (let c = 0; c < this.size - 1; c++) {
        this.board[r][c] == TENT && this.final_row[c]++;
        this.board[r][c] == TENT && this.final_column[r]++;
        puzzle_table_html +=
          `<td class='board' style='background-color:${BLANK_CELL_COLOR};width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>` +
          ((this.board[r][c] == TENT && (this.board[r][c] = "")) ||
            this.board[r][c]) +
          "</td>";
      }
      puzzle_table_html +=
        `<td class='board' style='background-color:${FILLED_CELL_COLOR};width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>` +
        this.final_column[r] +
        "</td>" +
        "</tr>";
    }
    let final_row_html = "<tr>";
    for (let i = 0; i < this.size - 1; i++) {
      final_row_html +=
        `<td class='board' style='background-color:${FILLED_CELL_COLOR};width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>` +
        this.final_row[i] +
        "</td>";
    }
    final_row_html += "</tr>";
    puzzle_table_html += final_row_html;
    puzzle_table_html += "</div>";
    document.getElementById("puzzle_table").innerHTML = puzzle_table_html;
    this.displayInstructions();
    document
      .querySelectorAll("#puzzle_table td")
      .forEach((e) => e.addEventListener("click", TENTSClickHandler));
  }
}

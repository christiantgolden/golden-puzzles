class Tents extends Game {
  final_row;
  final_column;
  constructor() {
    super(10);
    this.final_row = [];
    this.final_column = [];
    this.attempt_final_row = [];
    this.attempt_final_column = [];
  }
  generateBoard() {
    for (let i = 0; i < this.size - 1; i++) {
      this.board[i] = [];
      this.solved_board[i] = [];
      for (let j = 0; j < this.size - 1; j++) {
        let random_obj = Math.random();
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
          console.log("area already has tent nearby");
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
        (this.attempt_final_column.every((item) =>
          this.final_column.includes(item)
        ) &&
          this.final_column.every((item) =>
            this.attempt_final_column.includes(item)
          )) ||
        (this.attempt_final_row.every((item) =>
          this.final_row.includes(item)
        ) &&
          this.final_row.every((item) => this.attempt_final_row.includes(item)))
      )
    ) {
      return false;
    }
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === TENT) {
          console.log(`checking if tent at ${i},${j} is valid`);
          if (!this.isValidMove(i, j, TENT)) {
            console.log(`found invalid`);
            return false;
          }
        }
      }
    }
    return true;
  }
  draw() {
    let game_table_html = `<div style='width:${this.table_width}'>`;
    this.final_row = new Array(this.size - 1).fill(0);
    this.attempt_final_row = new Array(this.size - 1).fill(0);
    this.attempt_final_column = new Array(this.size - 1).fill(0);
    for (let r = 0; r < this.size - 1; r++) {
      game_table_html += "<tr>";
      this.final_column[r] = 0;
      for (let c = 0; c < this.size - 1; c++) {
        this.board[r][c] == TENT && this.final_row[c]++;
        this.board[r][c] == TENT && this.final_column[r]++;
        game_table_html +=
          `<td class='board' style='background-color:${BLANK_CELL_COLOR};width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>` +
          ((this.board[r][c] == TENT && (this.board[r][c] = "")) ||
            this.board[r][c]) +
          "</td>";
      }
      game_table_html +=
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
    game_table_html += final_row_html;
    game_table_html += "</div>";
    document.getElementById("game_table").innerHTML = game_table_html;
    this.displayInstructions();
    document
      .querySelectorAll("#game_table td")
      .forEach((e) => e.addEventListener("click", TENTSClickHandler));
  }
}

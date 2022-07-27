class Tents extends Game {
  constructor() {
    super(10);
  }
  generateBoard() {
    for (let i = 0; i < this.size - 1; i++) {
      this.board[i] = [];
      this.solved_board[i] = [];
      for (let j = 0; j < this.size - 1; j++) {
        let random_obj = Math.random();
        if (
          (TOP(this.board, i, j) && TOP(this.board, i, j) == TENT) ||
          (RIGHT(this.board, i, j) && RIGHT(this.board, i, j) == TENT) ||
          (BOTTOM(this.board, i, j) && BOTTOM(this.board, i, j) == TENT) ||
          (LEFT(this.board, i, j) && LEFT(this.board, i, j) == TENT)
        ) {
          this.board[i][j] = TREE;
          this.solved_board[i][j] = TREE;
        } else if (
          (TOP_LEFT(this.board, i, j) && TOP_LEFT(this.board, i, j) == TENT) ||
          (TOP_RIGHT(this.board, i, j) &&
            TOP_RIGHT(this.board, i, j) == TENT) ||
          (BOTTOM_RIGHT(this.board, i, j) &&
            BOTTOM_RIGHT(this.board, i, j) == TENT) ||
          (BOTTOM_LEFT(this.board, i, j) &&
            BOTTOM_LEFT(this.board, i, j) == TENT)
        ) {
          this.board[i][j] = "";
          this.solved_board[i][j] = GRASS;
        } else {
          this.board[i][j] = random_obj > 0.5 ? TENT : "";
          this.solved_board[i][j] = random_obj > 0.5 ? TENT : GRASS;
        }
      }
    }
  }
  draw() {
    let game_table_html = `<div style='width:${this.table_width}'>`;
    let final_row = new Array(this.size - 1).fill(0);
    for (let r = 0; r < this.size - 1; r++) {
      game_table_html += "<tr>";
      let rowTotal = 0;
      for (let c = 0; c < this.size - 1; c++) {
        this.board[r][c] == TENT && final_row[c]++;
        this.board[r][c] == TENT && rowTotal++;
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
        rowTotal +
        "</td>" +
        "</tr>";
    }
    let final_row_html = "<tr>";
    for (let i = 0; i < this.size - 1; i++) {
      final_row_html +=
        `<td class='board' style='background-color:${FILLED_CELL_COLOR};width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>` +
        final_row[i] +
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

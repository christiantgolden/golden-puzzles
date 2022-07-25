class Boxes extends Game {
  constructor() {
    super(9);
  }
  generateBoard() {
    this.generateRandomStart();
    this.fillBoard();
  }
  fillBoard() {
    for (let i = 0; i < this.size; i += 3) {
      i > 0 && (this.board[i] = this.board[i - 1]);
      let shift_one_array = this.board[i].split("");
      let shift_one_first_char = shift_one_array.shift();
      this.board[i] = shift_one_array.join("") + shift_one_first_char;
      this.board[i + 1] = this.board[i].slice(3) + this.board[i].slice(0, 3);
      this.board[i + 2] =
        this.board[i + 1].slice(3) + this.board[i + 1].slice(0, 3);
    }
  }
  generateRandomStart() {
    let temp_num_array = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let n = 0; n < this.size; n++) {
      this.board[0] += temp_num_array.splice(
        Math.floor(Math.random() * (this.size - n)),
        1
      );
    }
  }
  sumOfSurrounding(r, c) {
    let result = 0;
    result +=
      parseInt(this.board[r - 1][c - 1]) +
      parseInt(this.board[r - 1][c]) +
      parseInt(this.board[r - 1][c + 1]) +
      parseInt(this.board[r][c - 1]) +
      parseInt(this.board[r][c + 1]) +
      parseInt(this.board[r + 1][c - 1]) +
      parseInt(this.board[r + 1][c]) +
      parseInt(this.board[r + 1][c + 1]);
    return result;
  }
  draw() {
    this.randomize();
    let game_table_html = `<div style='width:${this.table_width}'>`;
    for (let r = 0; r < this.size; r++) {
      game_table_html += `<tr>`;
      let row_string_array = !Array.isArray(this.board[r])
        ? this.board[r].split("")
        : this.board[r];
      for (let i = 0; i < this.size; i++) {
        let cell_background = "";
        let temp_num = 0;
        let is_center = false;
        if ([1, 4, 7].indexOf(i) != -1 && [1, 4, 7].indexOf(r) != -1) {
          temp_num = this.sumOfSurrounding(r, i);
          is_center = true;
        } else {
          temp_num =
            Math.random() > 2 / this.difficulty
              ? `<input class='cell' maxlength=1 type='tel' style='font-size:${this.font_size}'></input>`
              : row_string_array[i];
        }
        if (
          ((r < 3 || r > 5) && (i < 3 || i > 5)) ||
          (r > 2 && r < 6 && i > 2 && i < 6)
        ) {
          cell_background = is_center ? "white" : FILLED_CELL_COLOR;
        } else {
          cell_background = is_center ? "white" : BLANK_CELL_COLOR;
        }
        game_table_html += `<td class='board' style='background:${cell_background};
                            width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>${temp_num}</td>`;
      }
      game_table_html += "</tr>";
    }
    game_table_html += "</div>";
    document.getElementById("game_table").innerHTML = game_table_html;
    this.displayInstructions();
  }
}
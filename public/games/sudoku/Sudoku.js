class Sudoku extends Game {
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
  unsolveRow(index, difficulty) {
    let temp_board_row = Array.isArray(this.board[index])
      ? this.board[index].join("")
      : this.board[index];
    for (let d = 0; d < difficulty; d++) {
      temp_board_row = temp_board_row.replace(
        SUDOKU_NUMBERS[Math.floor(Math.random() * this.size)],
        " "
      );
    }
    return temp_board_row;
  }
  draw() {
    this.randomize();
    let game_table_html = `<div style='width:${this.table_width}'>`;
    for (let r = 0; r < this.size; r++) {
      game_table_html += `<tr>`;
      let row_string_array = this.unsolveRow(r, this.difficulty).split("");
      for (let i = 0; i < this.size; i++) {
        let cell_background = "";
        let temp_num = "";
        row_string_array[i] == " "
          ? (temp_num = `<input class='cell' maxlength=1 type='tel' style='font-size:${this.font_size}'></input>`)
          : (temp_num = row_string_array[i]);
        if (
          ((r < 3 || r > 5) && (i < 3 || i > 5)) ||
          (r > 2 && r < 6 && i > 2 && i < 6)
        ) {
          cell_background = FILLED_CELL_COLOR;
        } else {
          cell_background = BLANK_CELL_COLOR;
        }
        game_table_html += `<td class='board' 
                            style='background:${cell_background};
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
class Hexoku extends Game {
  constructor() {
    super(16);
  }
  generateBoard() {
    this.generateRandomStart();
    this.fillBoard();
  }
  fillBoard() {
    for (let i = 0; i < this.size; i += Math.sqrt(this.size)) {
      console.log(
        "Math.sqrt(this.size) = " +
          Math.sqrt(this.size) +
          " , this.size = " +
          this.size
      );
      i > 0 && (this.board[i] = this.board[i - 1]);
      console.log("this.board[" + i + "] = " + this.board[i]);
      let shift_one_array = this.board[i].split("");
      let shift_one_first_char = shift_one_array.shift();
      this.board[i] = shift_one_array.join("") + shift_one_first_char;
      this.board[i + 1] =
        this.board[i].slice(Math.sqrt(this.size)) +
        this.board[i].slice(0, Math.sqrt(this.size));
      this.board[i + 2] =
        this.board[i + 1].slice(Math.sqrt(this.size)) +
        this.board[i + 1].slice(0, Math.sqrt(this.size));
      this.board[i + 3] =
        this.board[i + 2].slice(Math.sqrt(this.size)) +
        this.board[i + 2].slice(0, Math.sqrt(this.size));
    }
  }
  generateRandomStart() {
    let temp_num_array = [
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
    for (let d = 0; d < difficulty * 2; d++) {
      console.log(temp_board_row);
      temp_board_row = temp_board_row.replace(
        HEXOKU_NUMBERS[Math.floor(Math.random() * this.size)],
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
        let bgColor = "";
        if (
          ((r < Math.sqrt(this.size) || (r > 7 && r < 12)) &&
            (i < Math.sqrt(this.size) || (i > 7 && i < 12))) ||
          (r >= Math.sqrt(this.size) &&
            r <= 7 &&
            ((i >= Math.sqrt(this.size) && i <= 7) ||
              i >= Math.sqrt(this.size) * 3)) ||
          (r >= Math.sqrt(this.size) * 3 &&
            i >= Math.sqrt(this.size) &&
            i <= 7) ||
          (r >= Math.sqrt(this.size) * 3 && i >= Math.sqrt(this.size) * 3)
        ) {
          bgColor = FILLED_CELL_COLOR;
        } else {
          bgColor = BLANK_CELL_COLOR;
        }
        game_table_html += `<td class='board' style='background:${bgColor};
                            width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>`;
        row_string_array[i] == " "
          ? (game_table_html += `<input class='cell' style='font-size:${this.font_size}' maxlength=1'></input>`)
          : (game_table_html += row_string_array[i]);
        game_table_html += `</td>`;
      }
      game_table_html += `</tr></div>`;
    }
    document.getElementById("game_table").innerHTML = game_table_html;
    this.displayInstructions();
  }
}

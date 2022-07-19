class Box16 extends Game {
  constructor() {
    super(9);
  }
  generateBoard() {
    this.generateRandomStart();
    this.fillBoard();
  }
  fillBoard() {
    for (let i = 0; i < 9; i += 3) {
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
    for (let n = 0; n < 9; n++) {
      this.board[0] += temp_num_array.splice(
        Math.floor(Math.random() * (9 - n)),
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
    let table = document.getElementById("game_table");
    table.innerHTML = "";
    for (let r = 0; r < 9; r++) {
      let new_row = table.insertRow(r);
      for (let i = 0; i < 9; i++) {
        let new_cell = new_row.insertCell(i);
        let temp_num = 0;
        if ([1, 3, 5, 7].indexOf(i) != -1 && [1, 3, 5, 7].indexOf(r) != -1) {
          temp_num = this.sumOfSurrounding(r, i);
          new_cell.style.border = "5px solid";
          new_cell.style.borderColor = "#777";
          new_cell.innerHTML = temp_num;
        } else {
          new_cell.innerHTML =
            "<input id='cell' maxlength=1 type='tel'>" + "" + "</textarea>";
        }
        if (
          ((r < 3 || r > 5) && (i < 3 || i > 5)) ||
          (r > 2 && r < 6 && i > 2 && i < 6)
        ) {
          new_cell.style.background = FILLED_CELL_COLOR;
        } else {
          new_cell.style.background = BLANK_CELL_COLOR;
        }
      }
    }
    this.displayInstructions();
  }
}

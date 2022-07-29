class Hexoku extends Puzzle {
  constructor() {
    super(16);
  }
  generateBoard() {
    this.generateRandomStart();
    this.fillBoard();
  }
  fillBoard() {
    for (let i = 0; i < this.size; i += Math.sqrt(this.size)) {
      i > 0 && (this.board[i] = this.board[i - 1]);
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
      temp_board_row = temp_board_row.replace(
        HEXOKU_NUMBERS[Math.floor(Math.random() * this.size)],
        " "
      );
    }
    return temp_board_row;
  }
  draw() {
    this.randomize();
    let puzzle_table_html = `<div style='width:${this.table_width}'>`;
    for (let r = 0; r < this.size; r++) {
      puzzle_table_html += `<tr>`;
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
        puzzle_table_html += `<td class='board' style='background:${bgColor};
                            width:${this.cell_width};
                            height:${this.cell_height};
                            font-size:${this.font_size}'>`;
        row_string_array[i] == " "
          ? (puzzle_table_html += `<input class='cell' style='font-size:${this.font_size}' maxlength=1'></input>`) &&
            this.remaining_blanks++
          : (puzzle_table_html += row_string_array[i]);
        puzzle_table_html += `</td>`;
      }
      puzzle_table_html += `</tr></div>`;
    }
    document.getElementById("puzzle_table").innerHTML = puzzle_table_html;
    this.displayInstructions();
    document
      .querySelectorAll("input")
      .forEach((e) => e.addEventListener("input", handleChangeInput));
  }
  checkCorrect(i, j, num) {
    return !(
      this.numAlreadyInBoxHex(i, j, num) ||
      this.numAlreadyInRow(i, j, num) ||
      this.numAlreadyInColumn(i, j, num)
    );
  }
  isBox1(i, j) {
    return i < 4 && j < 4;
  }
  isBox2(i, j) {
    return i < 4 && j < 8 && j > 3;
  }
  isBox3(i, j) {
    return i < 4 && j < 12 && j > 7;
  }
  isBox4(i, j) {
    return i < 4 && j > 11;
  }
  isBox5(i, j) {
    return i < 8 && i > 3 && j < 4;
  }
  isBox6(i, j) {
    return i < 8 && i > 3 && j < 8 && j > 3;
  }
  isBox7(i, j) {
    return i < 8 && i > 3 && j < 12 && j > 7;
  }
  isBox8(i, j) {
    return i < 8 && i > 3 && j > 11;
  }
  isBox9(i, j) {
    return i < 12 && i > 7 && j < 4;
  }
  isBox10(i, j) {
    return i < 12 && i > 7 && j < 8 && j > 3;
  }
  isBox11(i, j) {
    return i < 12 && i > 7 && j < 12 && j > 7;
  }
  isBox12(i, j) {
    return i < 12 && i > 7 && j > 11;
  }
  isBox13(i, j) {
    return i > 11 && j < 4;
  }
  isBox14(i, j) {
    return i > 11 && j < 8 && j > 3;
  }
  isBox15(i, j) {
    return i > 11 && j < 12 && j > 7;
  }
  isBox16(i, j) {
    return i > 11 && j > 11;
  }
  numAlreadyInBoxHex(i, j, num) {
    let box = [];
    if (this.isBox1(i, j)) {
      box = [
        this.board[0][0],
        this.board[0][1],
        this.board[0][2],
        this.board[0][3],
        this.board[1][0],
        this.board[1][1],
        this.board[1][2],
        this.board[1][3],
        this.board[2][0],
        this.board[2][1],
        this.board[2][2],
        this.board[2][3],
        this.board[3][0],
        this.board[3][1],
        this.board[3][2],
        this.board[3][3],
      ];
    } else if (this.isBox2(i, j)) {
      box = [
        this.board[0][4],
        this.board[0][5],
        this.board[0][6],
        this.board[0][7],
        this.board[1][4],
        this.board[1][5],
        this.board[1][6],
        this.board[1][7],
        this.board[2][4],
        this.board[2][5],
        this.board[2][6],
        this.board[2][7],
        this.board[3][4],
        this.board[3][5],
        this.board[3][6],
        this.board[3][7],
      ];
    } else if (this.isBox3(i, j)) {
      box = [
        this.board[0][8],
        this.board[0][9],
        this.board[0][10],
        this.board[0][11],
        this.board[1][8],
        this.board[1][9],
        this.board[1][10],
        this.board[1][11],
        this.board[2][8],
        this.board[2][9],
        this.board[2][10],
        this.board[2][11],
        this.board[3][8],
        this.board[3][9],
        this.board[3][10],
        this.board[3][11],
      ];
    } else if (this.isBox4(i, j)) {
      box = [
        this.board[0][12],
        this.board[0][13],
        this.board[0][14],
        this.board[0][15],
        this.board[1][12],
        this.board[1][13],
        this.board[1][14],
        this.board[1][15],
        this.board[2][12],
        this.board[2][13],
        this.board[2][14],
        this.board[2][15],
        this.board[3][12],
        this.board[3][13],
        this.board[3][14],
        this.board[3][15],
      ];
    } else if (this.isBox5(i, j)) {
      box = [
        this.board[4][0],
        this.board[4][1],
        this.board[4][2],
        this.board[4][3],
        this.board[5][0],
        this.board[5][1],
        this.board[5][2],
        this.board[5][3],
        this.board[6][0],
        this.board[6][1],
        this.board[6][2],
        this.board[6][3],
        this.board[7][0],
        this.board[7][1],
        this.board[7][2],
        this.board[7][3],
      ];
    } else if (this.isBox6(i, j)) {
      box = [
        this.board[4][4],
        this.board[4][5],
        this.board[4][6],
        this.board[4][7],
        this.board[5][4],
        this.board[5][5],
        this.board[5][6],
        this.board[5][7],
        this.board[6][4],
        this.board[6][5],
        this.board[6][6],
        this.board[6][7],
        this.board[7][4],
        this.board[7][5],
        this.board[7][6],
        this.board[7][7],
      ];
    } else if (this.isBox7(i, j)) {
      box = [
        this.board[4][8],
        this.board[4][9],
        this.board[4][10],
        this.board[4][11],
        this.board[5][8],
        this.board[5][9],
        this.board[5][10],
        this.board[5][11],
        this.board[6][8],
        this.board[6][9],
        this.board[6][10],
        this.board[6][11],
        this.board[7][8],
        this.board[7][9],
        this.board[7][10],
        this.board[7][11],
      ];
    } else if (this.isBox8(i, j)) {
      box = [
        this.board[4][12],
        this.board[4][13],
        this.board[4][14],
        this.board[4][15],
        this.board[5][12],
        this.board[5][13],
        this.board[5][14],
        this.board[5][15],
        this.board[6][12],
        this.board[6][13],
        this.board[6][14],
        this.board[6][15],
        this.board[7][12],
        this.board[7][13],
        this.board[7][14],
        this.board[7][15],
      ];
    } else if (this.isBox9(i, j)) {
      box = [
        this.board[8][0],
        this.board[8][1],
        this.board[8][2],
        this.board[8][3],
        this.board[9][0],
        this.board[9][1],
        this.board[9][2],
        this.board[9][3],
        this.board[10][0],
        this.board[10][1],
        this.board[10][2],
        this.board[10][3],
        this.board[11][0],
        this.board[11][1],
        this.board[11][2],
        this.board[11][3],
      ];
    } else if (this.isBox10(i, j)) {
      box = [
        this.board[8][4],
        this.board[8][5],
        this.board[8][6],
        this.board[8][7],
        this.board[9][4],
        this.board[9][5],
        this.board[9][6],
        this.board[9][7],
        this.board[10][4],
        this.board[10][5],
        this.board[10][6],
        this.board[10][7],
        this.board[11][4],
        this.board[11][5],
        this.board[11][6],
        this.board[11][7],
      ];
    } else if (this.isBox11(i, j)) {
      box = [
        this.board[8][8],
        this.board[8][9],
        this.board[8][10],
        this.board[8][11],
        this.board[9][8],
        this.board[9][9],
        this.board[9][10],
        this.board[9][11],
        this.board[10][8],
        this.board[10][9],
        this.board[10][10],
        this.board[10][11],
        this.board[11][8],
        this.board[11][9],
        this.board[11][10],
        this.board[11][11],
      ];
    } else if (this.isBox12(i, j)) {
      box = [
        this.board[8][12],
        this.board[8][13],
        this.board[8][14],
        this.board[8][15],
        this.board[9][12],
        this.board[9][13],
        this.board[9][14],
        this.board[9][15],
        this.board[10][12],
        this.board[10][13],
        this.board[10][14],
        this.board[10][15],
        this.board[11][12],
        this.board[11][13],
        this.board[11][14],
        this.board[11][15],
      ];
    } else if (this.isBox13(i, j)) {
      box = [
        this.board[12][0],
        this.board[12][1],
        this.board[12][2],
        this.board[12][3],
        this.board[13][0],
        this.board[13][1],
        this.board[13][2],
        this.board[13][3],
        this.board[14][0],
        this.board[14][1],
        this.board[14][2],
        this.board[14][3],
        this.board[15][0],
        this.board[15][1],
        this.board[15][2],
        this.board[15][3],
      ];
    } else if (this.isBox14(i, j)) {
      box = [
        this.board[12][4],
        this.board[12][5],
        this.board[12][6],
        this.board[12][7],
        this.board[13][4],
        this.board[13][5],
        this.board[13][6],
        this.board[13][7],
        this.board[14][4],
        this.board[14][5],
        this.board[14][6],
        this.board[14][7],
        this.board[15][4],
        this.board[15][5],
        this.board[15][6],
        this.board[15][7],
      ];
    } else if (this.isBox15(i, j)) {
      box = [
        this.board[12][8],
        this.board[12][9],
        this.board[12][10],
        this.board[12][11],
        this.board[13][8],
        this.board[13][9],
        this.board[13][10],
        this.board[13][11],
        this.board[14][8],
        this.board[14][9],
        this.board[14][10],
        this.board[14][11],
        this.board[15][8],
        this.board[15][9],
        this.board[15][10],
        this.board[15][11],
      ];
    } else if (this.isBox16(i, j)) {
      box = [
        this.board[12][12],
        this.board[12][13],
        this.board[12][14],
        this.board[12][15],
        this.board[13][12],
        this.board[13][13],
        this.board[13][14],
        this.board[13][15],
        this.board[14][12],
        this.board[14][13],
        this.board[14][14],
        this.board[14][15],
        this.board[15][12],
        this.board[15][13],
        this.board[15][14],
        this.board[15][15],
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
}

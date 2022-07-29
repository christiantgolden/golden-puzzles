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
    this.board[index] = temp_board_row.split("");
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
          ? (temp_num = `<input class='cell' maxlength=1 type='tel' style='font-size:${this.font_size}' ></input>`) &&
            this.remaining_blanks++
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
    document
      .querySelectorAll("input")
      .forEach((e) => e.addEventListener("input", handleChangeInput));
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
    this.isUpperLeftBox(i, j) &&
      (box = [
        this.board[0][0],
        this.board[0][1],
        this.board[0][2],
        this.board[1][0],
        this.board[1][1],
        this.board[1][2],
        this.board[2][0],
        this.board[2][1],
        this.board[2][2],
      ]);
    this.isUpperMiddleBox(i, j) &&
      (box = [
        this.board[0][3],
        this.board[0][4],
        this.board[0][5],
        this.board[1][3],
        this.board[1][4],
        this.board[1][5],
        this.board[2][3],
        this.board[2][4],
        this.board[2][5],
      ]);
    this.isUpperRightBox(i, j) &&
      (box = [
        this.board[0][6],
        this.board[0][7],
        this.board[0][8],
        this.board[1][6],
        this.board[1][7],
        this.board[1][8],
        this.board[2][6],
        this.board[2][7],
        this.board[2][8],
      ]);
    this.isMiddleLeftBox(i, j) &&
      (box = [
        this.board[3][0],
        this.board[3][1],
        this.board[3][2],
        this.board[4][0],
        this.board[4][1],
        this.board[4][2],
        this.board[5][0],
        this.board[5][1],
        this.board[5][2],
      ]);
    this.isMiddleMiddleBox(i, j) &&
      (box = [
        this.board[3][3],
        this.board[3][4],
        this.board[3][5],
        this.board[4][3],
        this.board[4][4],
        this.board[4][5],
        this.board[5][3],
        this.board[5][4],
        this.board[5][5],
      ]);
    this.isMiddleRightBox(i, j) &&
      (box = [
        this.board[3][6],
        this.board[3][7],
        this.board[3][8],
        this.board[4][6],
        this.board[4][7],
        this.board[4][8],
        this.board[5][6],
        this.board[5][7],
        this.board[5][8],
      ]);
    this.isBottomLeftBox(i, j) &&
      (box = [
        this.board[6][0],
        this.board[6][1],
        this.board[6][2],
        this.board[7][0],
        this.board[7][1],
        this.board[7][2],
        this.board[8][0],
        this.board[8][1],
        this.board[8][2],
      ]);
    this.isBottomMiddleBox(i, j) &&
      (box = [
        this.board[6][3],
        this.board[6][4],
        this.board[6][5],
        this.board[7][3],
        this.board[7][4],
        this.board[7][5],
        this.board[8][3],
        this.board[8][4],
        this.board[8][5],
      ]);
    this.isBottomRightBox(i, j) &&
      (box = [
        this.board[6][6],
        this.board[6][7],
        this.board[6][8],
        this.board[7][6],
        this.board[7][7],
        this.board[7][8],
        this.board[8][6],
        this.board[8][7],
        this.board[8][8],
      ]);
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
  checkCorrect(i, j, num) {
    return !(
      this.numAlreadyInBox(i, j, num) ||
      this.numAlreadyInRow(i, j, num) ||
      this.numAlreadyInColumn(i, j, num)
    );
  }
}

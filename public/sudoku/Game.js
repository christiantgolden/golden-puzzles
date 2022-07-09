class Game {
  #board;
  #difficulty;
  constructor() {
    this.#difficulty = 3;
    this.#board = [""];
    this.#generate();
  }
  #generate() {
    this.#generateRandomStart();
    this.#fillBoard();
  }
  regenerate() {
    this.#generateRandomStart();
    this.#fillBoard();
  }
  #fillBoard() {
    for (let i = 0; i < 9; i += 3) {
      i > 0 && (this.#board[i] = this.#board[i - 1]);
      let shift_one_array = this.#board[i].split("");
      let shift_one_first_char = shift_one_array.shift();
      this.#board[i] = shift_one_array.join("") + shift_one_first_char;
      this.#board[i + 1] = this.#board[i].slice(3) + this.#board[i].slice(0, 3);
      this.#board[i + 2] =
        this.#board[i + 1].slice(3) + this.#board[i + 1].slice(0, 3);
    }
  }
  #generateRandomStart() {
    let temp_num_array = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let n = 0; n < 9; n++) {
      this.#board[0] += temp_num_array.splice(
        Math.floor(Math.random() * (9 - n)),
        1
      );
    }
  }
  getBoard() {
    return this.#board;
  }
  setDifficulty(difficulty) {
    this.#difficulty = difficulty;
  }
  getDifficulty() {
    return this.#difficulty;
  }
  unsolveRow(index, difficulty) {
    let temp_board_row = this.#board[index];
    for (let d = 0; d < difficulty; d++) {
      temp_board_row = temp_board_row.replace(
        NUMBERS[Math.floor(Math.random() * 9)],
        " "
      );
    }
    return temp_board_row;
  }
  clearBoard(new_difficulty) {
    this.setDifficulty(DIFFICULTY_MAP[new_difficulty]);
    this.#board = [""];
  }
  draw() {
    let table = document.getElementById("game_table");
    table.innerHTML = "";
    for (let r = 0; r < 9; r++) {
      let new_row = table.insertRow(r);
      let row_string_array = this.unsolveRow(r, this.getDifficulty()).split("");
      for (let i = 0; i < 9; i++) {
        let new_cell = new_row.insertCell(i);
        row_string_array[i] == " "
          ? (new_cell.innerHTML =
              "<input id='cell' maxlength=1 type='number'>" +
              "" +
              "</textarea>")
          : (new_cell.innerHTML = row_string_array[i]);
        if (
          ((r < 3 || r > 5) && (i < 3 || i > 5)) ||
          (r > 2 && r < 6 && i > 2 && i < 6)
        ) {
          new_cell.style.background = "rgb(150,150,150)";
        } else {
          new_cell.style.background = "rgb(200,200,200)";
        }
      }
    }
  }
}

class Binary extends Game {
  colTotals;
  constructor() {
    super(10);
    this.resetColumnTotals();
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    this.resetColumnTotals();
  }
  clearBoard(difficulty) {
    this.board = [];
    this.setDifficulty(DIFFICULTY_MAP[difficulty]);
  }
  regenerate() {
    this.board = [];
    this.generateBoard();
  }
  generateFirstRow(r) {
    this.board[0] = "";
    let repeatingPattern = true;
    let previousRandBin;
    for (let c = 0; c < this.size / 2; c++) {
      let randBin = Math.floor(Math.random() * 2);
      c > 0 && previousRandBin != randBin && (repeatingPattern = false);
      previousRandBin = randBin;
      this.board[0] += randBin.toString();
      this.board[0] += Math.abs(randBin - 1).toString();
    }
    repeatingPattern && this.generateFirstRow(r);
    for (let i = 0; i < this.board[0].length; i++) {
      this.colTotals[i] = parseInt(this.board[0][i]);
    }
  }
  shiftRow(r) {
    let binString = r;
    let convertedToDecimal = parseInt(binString, 2);
    let doubledDecimal = convertedToDecimal * 2;
    let doubledDecimalModded = doubledDecimal % (2 ** this.size - 1);
    let decimalModdedToBinString = doubledDecimalModded.toString(2);
    let binPadded = ("00" + decimalModdedToBinString).slice(-this.size);

    return binPadded;
  }
  flipRow(r) {
    const tempFlip1 = r.replaceAll("0", "3");
    const tempFlip2 = tempFlip1.replaceAll("1", "0");
    const result = tempFlip2.replaceAll("3", "1");

    return result;
  }
  unsolveBoard() {
    for (let i = 0; i < this.size; i++) {
      let tempRow = "";
      let randNums = [];
      for (let d = 0; d < this.difficulty; d++) {
        randNums.push(Math.floor(Math.random() * 10));
      }
      for (let c = 0; c < this.size; c++) {
        randNums.includes(c) ? (tempRow += " ") : (tempRow += this.board[i][c]);
      }
      this.board[i] = tempRow;
    }
  }
  generateBoard() {
    this.resetColumnTotals();
    this.generateFirstRow(this.board[0]);
    for (let r = 1; r < this.size - 1; r += 2) {
      this.board[r] = this.shiftRow(this.board[r - 1]);
      this.board[r + 1] = this.flipRow(this.board[r]);
    }
    let finalRow = [];
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.colTotals[j] += parseInt(this.board[i][j]);
      }
    }
    for (let ct = 0; ct < this.colTotals.length; ct++) {
      this.colTotals[ct] < 5 ? (finalRow += "1") : (finalRow += "0");
    }
    this.board[this.size - 1] = finalRow;

    this.unsolveBoard();
  }
  resetColumnTotals() {
    this.colTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < this.colTotals.length; i++) {
      this.colTotals[i] = 0;
    }
  }
  draw() {
    let game_table_html = "";
    for (let r = 0; r < this.size; r++) {
      game_table_html += "<tr>";
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c] == " ") {
          game_table_html +=
            "<td id='ten-x-ten-board' style='background-color:#ccc'><input id='cell' maxlength='1' type='tel'></input></td>";
        } else {
          game_table_html +=
            "<td id='ten-x-ten-board' style='background-color:#aaa'>" +
            this.board[r][c] +
            "</td>";
        }
      }
      game_table_html += "</tr>";
    }
    document.getElementById("game_table").innerHTML = game_table_html;
    this.displayInstructions();
  }
}

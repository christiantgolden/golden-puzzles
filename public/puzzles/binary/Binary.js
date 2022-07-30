class Binary extends Puzzle {
  colTotals;
  constructor() {
    super(10);
    this.resetColumnTotals();
  }
  generateFirstRow(r) {
    this.board[0] = "";
    let repeatingPattern = true;
    let previousRandBin;
    for (let c = 0; c < this.size / 2; c++) {
      let randBin = mulberry32(seed++)() > 0.5 ? 1 : 0;
      console.log(mulberry32(seed++)() > 0.5 ? 1 : 0);
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
        randNums.push(randInRange(0, 9));
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
    this.randomize();
    let puzzle_table_html = `<div style='width:${this.table_width}'>`;
    for (let r = 0; r < this.size; r++) {
      puzzle_table_html += `<tr>`;
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c] == " ") {
          incrementRemainingBlanks();
          puzzle_table_html += `<td class='board' style='background-color:${BLANK_CELL_COLOR};width:${this.cell_width};
                                              height:${this.cell_height};
                                              font-size:${this.font_size}'></input></td>`;
        } else {
          puzzle_table_html +=
            `<td id='ten-x-ten-board' style='background-color:${FILLED_CELL_COLOR};width:${this.cell_width};
                                              height:${this.cell_height};
                                              font-size:${this.font_size}'>` +
            this.board[r][c] +
            "</td>";
        }
      }
      puzzle_table_html += "</tr>";
    }
    puzzle_table_html += "</div>";
    document.getElementById("puzzle_table").innerHTML = puzzle_table_html;
    this.displayInstructions();
    document
      .querySelectorAll("#puzzle_table td")
      .forEach(
        (e) =>
          e.innerText == "" && e.addEventListener("click", BINARYClickHandler)
      );
    for (let i = 0; i < this.board.length; i++) {
      !Array.isArray(this.board[i]) &&
        (this.board[i] = this.board[i].split(""));
    }
  }
  checkCorrect() {
    let colZeros = new Array(this.size).fill(0);
    let colOnes = new Array(this.size).fill(0);
    for (let i = 0; i < this.board.length; i++) {
      let rowZeros = 0;
      let rowOnes = 0;
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] === "1"
          ? rowOnes++ && colOnes[j]++
          : rowZeros++ && colZeros[j]++;
        if (rowZeros > 5 || rowOnes > 5 || colZeros[j] > 5 || colOnes[j] > 5) {
          return false;
        }
      }
    }
    return true;
  }
}

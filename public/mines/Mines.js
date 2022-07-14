class Mines {
  size;
  board;
  difficulty;
  constructor(size = 9) {
    this.size = size;
    this.board = [];
    this.difficulty =
      DIFFICULTY_MAP[document.getElementById("diff").value.toUpperCase()];
    this.generateBoard();
  }
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }
  clearBoard(difficulty) {
    this.board = [];
    this.setDifficulty(DIFFICULTY_MAP[difficulty]);
  }
  regenerate() {
    this.generateBoard();
  }
  setMines() {}

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
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = new Coord(Math.random() > 0.8);
        this.board[i][j].setX(j);
        this.board[i][j].setY(i);
      }
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.board[i - 1] &&
          this.board[i - 1][j - 1] &&
          this.board[i - 1][j - 1].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i - 1] &&
          this.board[i - 1][j] &&
          this.board[i - 1][j].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i - 1] &&
          this.board[i - 1][j + 1] &&
          this.board[i - 1][j + 1].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i][j - 1] &&
          this.board[i][j - 1].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i][j + 1] &&
          this.board[i][j + 1].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i + 1] &&
          this.board[i + 1][j - 1] &&
          this.board[i + 1][j - 1].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i + 1] &&
          this.board[i + 1][j] &&
          this.board[i + 1][j].hasBomb &&
          this.board[i][j].incrementBombsNearby();

        this.board[i + 1] &&
          this.board[i + 1][j + 1] &&
          this.board[i + 1][j + 1].hasBomb &&
          this.board[i][j].incrementBombsNearby();
      }
    }
  }
  draw() {
    let game_table_html = "";
    for (let r = 0; r < this.size; r++) {
      game_table_html += "<tr>";
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c].hasBomb || this.board[r][c].bombsNearby == 0) {
          game_table_html +=
            "<td id='nine-x-nine-board' style='background-color:#ccc'><input id='cell' maxlength='1'></input></td>";
        } else {
          game_table_html +=
            "<td id='nine-x-nine-board' style='background-color:#aaa'>" +
            this.board[r][c].bombsNearby +
            "</td>";
        }
      }
      game_table_html += "</tr>";
    }
    let instructions_html = "";
    for (let i = 0; i < GAME_INSTRUCTIONS["MINES"].length; i++) {
      instructions_html += GAME_INSTRUCTIONS["MINES"][i] + "<br/>";
    }
    document.getElementById("instructions").innerHTML = instructions_html;
    document.getElementById("game_table").innerHTML = game_table_html;
  }
}

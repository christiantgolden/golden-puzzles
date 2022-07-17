class Mines extends Game {
  constructor() {
    super(9);
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
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = {
          x: j,
          y: i,
          hasMine: Math.random() > 0.8,
          minesNearby: 0,
        };
        this.board[i][j].incrementMinesNearby = () => {
          this.board[i][j].minesNearby++;
        };
      }
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.setMinesNearby(i, j);
      }
    }
  }
  setMinesNearby(i, j) {
    this.board[i - 1] &&
      this.board[i - 1][j - 1] &&
      this.board[i - 1][j - 1].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i - 1] &&
      this.board[i - 1][j] &&
      this.board[i - 1][j].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i - 1] &&
      this.board[i - 1][j + 1] &&
      this.board[i - 1][j + 1].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i][j - 1] &&
      this.board[i][j - 1].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i][j + 1] &&
      this.board[i][j + 1].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i + 1] &&
      this.board[i + 1][j - 1] &&
      this.board[i + 1][j - 1].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i + 1] &&
      this.board[i + 1][j] &&
      this.board[i + 1][j].hasMine &&
      this.board[i][j].incrementMinesNearby();

    this.board[i + 1] &&
      this.board[i + 1][j + 1] &&
      this.board[i + 1][j + 1].hasMine &&
      this.board[i][j].incrementMinesNearby();
  }
  draw() {
    let game_table_html = "";
    for (let r = 0; r < this.size; r++) {
      game_table_html += "<tr>";
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c].hasMine || this.board[r][c].minesNearby == 0) {
          game_table_html +=
            "<td id='nine-x-nine-board' style='background-color:#ccc'></td>";
        } else {
          game_table_html +=
            "<td id='nine-x-nine-board' style='background-color:#aaa'>" +
            this.board[r][c].minesNearby +
            "</td>";
        }
      }
      game_table_html += "</tr>";
    }
    document.getElementById("game_table").innerHTML = game_table_html;
    this.displayInstructions();
    document
      .querySelectorAll("#game_table td")
      .forEach((e) => e.addEventListener("click", MINESClickHandler));
  }
}

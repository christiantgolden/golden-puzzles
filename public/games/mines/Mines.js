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
    this.solved_board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      this.solved_board[i] = [];
      for (let j = 0; j < this.size; j++) {
        const isMine = Math.random() > 0.8;
        this.board[i][j] = {
          hasMine: isMine,
          hasZero: !isMine,
          minesNearby: 0,
        };
        this.solved_board[i][j] = {
          hasMine: isMine,
          hasZero: !isMine,
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
    let game_table_html = `<div style='width:${this.table_width}'>`;
    for (let r = 0; r < this.size; r++) {
      game_table_html += `<tr>`;
      for (let c = 0; c < this.size; c++) {
        if (this.board[r][c].hasMine || this.board[r][c].minesNearby == 0) {
          game_table_html += `<td class='board' style='background-color:${BLANK_CELL_COLOR};width:${this.cell_width};
                                              height:${this.cell_height};
                                              font-size:${this.font_size}'></td>`;
          this.board[r][c].hasMine = 3;
        } else {
          game_table_html +=
            `<td class='board' style='background-color:${FILLED_CELL_COLOR};
                                              width:${this.cell_width};
                                              height:${this.cell_height};
                                              font-size:${this.font_size}'>` +
            this.board[r][c].minesNearby +
            "</td>";
        }
      }
      game_table_html += "</tr>";
    }
    game_table_html += "</div>";
    document.getElementById("game_table").innerHTML = game_table_html;
    this.displayInstructions();
    document
      .querySelectorAll("#game_table td")
      .forEach((e) => e.addEventListener("click", MINESClickHandler));
  }
}

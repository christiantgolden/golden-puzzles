class Stars extends Game {
  constructor() {
    super(9);
  }
  generateBoard() {
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = {
          x: j,
          y: i,
          isStar:
            [1, 3, 5, 7].indexOf(j) != -1 && [1, 3, 5, 7].indexOf(i) != -1,
          char: "",
          potentialNumbers: ["1", "2", "3", "4", "5", "6", "7", "8"],
          surroundingNumbers: [],
          nearbyStars: [],
          surroundingCells: [],
        };
        this.board[i][j].char = this.board[i][j].isStar ? "⭐" : "";
      }
    }
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        this.setNearbyCells(r, c);
        this.setNearbyStars(r, c);
      }
    }
    this.populateNumbers();
    this.draw();
  }
  setNearbyCells(r, c) {
    this.board[r][c].surroundingCells = [
      this.board[r - 1] &&
        this.board[r - 1][c - 1] &&
        !this.board[r - 1][c - 1].isStar &&
        this.board[r - 1][c - 1],
      this.board[r - 1] &&
        this.board[r - 1][c] &&
        !this.board[r - 1][c].isStar &&
        this.board[r - 1][c],
      this.board[r - 1] &&
        this.board[r - 1][c + 1] &&
        !this.board[r - 1][c + 1].isStar &&
        this.board[r - 1][c + 1],
      this.board[r] &&
        this.board[r][c + 1] &&
        !this.board[r][c + 1].isStar &&
        this.board[r][c + 1],
      this.board[r + 1] &&
        this.board[r + 1][c + 1] &&
        !this.board[r + 1][c + 1].isStar &&
        this.board[r + 1][c + 1],
      this.board[r + 1] &&
        this.board[r + 1][c] &&
        !this.board[r + 1][c].isStar &&
        this.board[r + 1][c],
      this.board[r + 1] &&
        this.board[r + 1][c - 1] &&
        !this.board[r + 1][c - 1].isStar &&
        this.board[r + 1][c - 1],
      this.board[r] &&
        this.board[r][c - 1] &&
        !this.board[r][c - 1].isStar &&
        this.board[r][c - 1],
    ];
  }
  setNearbyStars(r, c) {
    this.board[r][c].nearbyStars = [
      this.board[r - 1] &&
        this.board[r - 1][c - 1] &&
        this.board[r - 1][c - 1].isStar &&
        this.board[r - 1][c - 1],
      this.board[r - 1] &&
        this.board[r - 1][c] &&
        this.board[r - 1][c].isStar &&
        this.board[r - 1][c],
      this.board[r - 1] &&
        this.board[r - 1][c + 1] &&
        this.board[r - 1][c + 1].isStar &&
        this.board[r - 1][c + 1],
      this.board[r] &&
        this.board[r][c + 1] &&
        this.board[r][c + 1].isStar &&
        this.board[r][c + 1],
      this.board[r + 1] &&
        this.board[r + 1][c + 1] &&
        this.board[r + 1][c + 1].isStar &&
        this.board[r + 1][c + 1],
      this.board[r + 1] &&
        this.board[r + 1][c] &&
        this.board[r + 1][c].isStar &&
        this.board[r + 1][c],
      this.board[r + 1] &&
        this.board[r + 1][c - 1] &&
        this.board[r + 1][c - 1].isStar &&
        this.board[r + 1][c - 1],
      this.board[r] &&
        this.board[r][c - 1] &&
        this.board[r][c - 1].isStar &&
        this.board[r][c - 1],
    ];
  }
  updatePotentialNumbers(r, c, char) {
    let nearbyStarsLength = this.board[r][c].nearbyStars.length;
    for (let s = 0; s < nearbyStarsLength; s++) {
      let surroundingCellsLength =
        this.board[r][c].nearbyStars[s]?.surroundingCells?.length;
      for (let n = 0; n < surroundingCellsLength; n++) {
        this.board[r][c].nearbyStars[s].surroundingCells[
          n
        ].potentialNumbers.splice(
          this.board[r][c].nearbyStars[s].surroundingCells[
            n
          ].potentialNumbers.indexOf(char),
          1
        );
        console.log(
          `having removed ${char} from ${this.board[r][c].nearbyStars[s].surroundingCells[n].x},${this.board[r][c].nearbyStars[s].surroundingCells[n].y}, its newly remaining available numbers are ${this.board[r][c].nearbyStars[s].surroundingCells[n].potentialNumbers}`
        );
      }
    }
  }
  populateNumber(r, c) {
    let char =
      this.board[r][c].potentialNumbers[
        Math.floor(Math.random() * this.board[r][c].potentialNumbers.length)
      ] || 0;
    this.board[r][c].char = char;
  }
  populateNumbers() {
    //iterate over left triangle
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j <= i; j++) {
        console.log(i - j + "," + j);
        console.log(this.size - (1 + (i - j)) + "," + (this.size - (1 + j)));
        this.populateNumber(i - j, j);
        for (let s = 0; s < this.board[i - j][j].nearbyStars.length; s++) {
          this.board[i - j][j].nearbyStars[s]?.surroundingNumbers?.push(
            this.board[i - j][j].char
          );
        }
        this.updatePotentialNumbers(i - j, j, this.board[i - j][j].char);
      }
      //[0,0]
      //[1,0],[0,1]
      //[2,0],[1,1],[0,2]
      //[3,0],[2,1][1,2][0,3]
      //[4,0],[3,1][2,2][1,3][0,4]
      //y is decreasing, x is increasing
    }
    //iterate over right triangle
    // for (let a = 1; a < this.size; a++) {
    //   break;
    // }
    // for (let r = 0; r < this.size; r++) {
    //   for (let c = 0; c < this.size; c++) {
    //     if (!this.board[r][c].isStar) {
    //       this.populateNumber(r, c);
    //       for (let s = 0; s < this.board[r][c].nearbyStars.length; s++) {
    //         this.board[r][c].nearbyStars[s]?.surroundingNumbers?.push(
    //           this.board[r][c].char
    //         );
    //       }
    //       this.updatePotentialNumbers(r, c, this.board[r][c].char);
    //     }
    //   }
    // }
  }
  draw() {
    let game_table_html = "";
    for (let r = 0; r < this.size; r++) {
      game_table_html += `<tr>`;
      for (let c = 0; c < this.size; c++) {
        game_table_html += `<td id='nine-x-nine-board'>${this.board[r][c].char}</td>`;
      }
      game_table_html == `</tr>`;
    }
    document.getElementById("game_table").innerHTML = game_table_html;
  }
}

const star = new Stars();

const test_stars = () => {
  star.generateBoard();
};

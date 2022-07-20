/**
 * @description Game factory method
 * @returns new Game of specified type
 */
const CreateGame = () => {
  for (const g in GAMES) {
    if (GAMES[g].active) {
      switch (g) {
        case "SUDOKU":
          return new Sudoku();
        case "MINES":
          return new Mines();
        case "BINARY":
          return new Binary();
        case "TENTS":
          return new Tents();
        case "BOXES":
          return new Boxes();
        case "BOX16":
          return new Box16();
        case "HEXOKU":
          return new Hexoku();
        default:
          return new Tents();
      }
    }
  }
};

class Game {
  size;
  board;
  difficulty;
  constructor(size) {
    this.difficulty =
      DIFFICULTY_MAP[document.getElementById("diff").value.toUpperCase()];
    this.board = [""];
    this.size = size;
    this.generateBoard();
  }
  displayInstructions() {
    const current_game = document.getElementById("active").innerText;
    let instructions_html = "";
    for (let i = 0; i < GAME_INSTRUCTIONS[current_game].length; i++) {
      instructions_html += GAME_INSTRUCTIONS[current_game][i] + "<br/>";
    }
    document.getElementById("instructions").innerHTML = instructions_html;
  }
  transpose() {
    this.board = this.board[0]
      .split("")
      .map((_, colIndex) => this.board.map((row) => row[colIndex]));
  }
  randomize() {
    let random_operation =
      BOARD_OPERATIONS[Math.floor(Math.random() * BOARD_OPERATIONS.length)];
    switch (random_operation) {
      case "transpose":
        this.transpose();
        break;
      case "reverse":
        this.board = this.board.reverse();
        break;
      case "transpose-reverse":
        this.transpose();
        this.board = this.board.reverse();
        break;
      case "none":
        break;
    }
  }
}

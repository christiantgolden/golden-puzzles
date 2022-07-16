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
}

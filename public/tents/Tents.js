class Tents extends Game {
  constructor() {
    super(10);
  }
  generateBoard() {
    console.log("Generating new Tents board...");
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        let random_obj = Math.random();
        this.board[i][j] = random_obj > 0.7 ? "⛺" : "🌳";
        console.log("this.board[i][j]");
      }
    }
    console.log("Tents board: " + this.board);
  }
  draw() {
    let game_table_html = "";
    let final_row = new Array(this.size).fill(0);
    console.log("final_row initial state: " + final_row);
    for (let r = 0; r < this.size; r++) {
      console.log(final_row);
      game_table_html += "<tr>";
      let rowTotal = 0;
      for (let c = 0; c < this.size; c++) {
        this.board[r][c] == "⛺" && final_row[c]++;
        this.board[r][c] == "⛺" && rowTotal++;
        // if (this.board[r][c] == "⛺") {
        //   game_table_html +=
        //     "<td id='ten-x-ten-board' style='background-color:#ccc'>⛺</td>";
        // } else {
        game_table_html +=
          "<td id='ten-x-ten-board' style='background-color:#aaa'>" +
          this.board[r][c] +
          "</td>";
        // }
      }
      game_table_html += "<td>" + rowTotal + "</td>" + "</tr>";
    }
    let final_row_html = "<tr>";
    for (let i = 0; i < this.size; i++) {
      final_row_html += "<td>" + final_row[i] + "</td>";
    }
    final_row_html += "</tr>";
    game_table_html += final_row_html;
    console.log(game_table_html);
    document.getElementById("game_table").innerHTML = game_table_html;
  }
}

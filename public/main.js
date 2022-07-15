let activeGame = {};
const setActiveGame = (prevOrNext) => {
  const game = document.getElementById(prevOrNext).innerText;
  for (const g in GAMES) {
    if (GAMES[g].active) {
      GAMES[g].active = false;
      let oldGame = g.toUpperCase();
      prevOrNext == "next"
        ? (document.getElementById(prevOrNext).innerText =
            document.getElementById("prev").innerText)
        : (document.getElementById(prevOrNext).innerText =
            document.getElementById("next").innerText);
      document.getElementById(
        prevOrNext == "next" ? "prev" : "next"
      ).innerText = oldGame;
    }
  }
  GAMES[game].active = true;
  document.getElementById("active").innerText = game.toUpperCase();
  activeGame = CreateGame();
  activeGame.draw();
};

activeGame = CreateGame();
activeGame.draw();

document
  .getElementById("gen_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

const generateNewGame = () => {
  var select = document.getElementById("diff");
  var selected_difficulty =
    select.options[select.selectedIndex].value.toUpperCase();
  activeGame.clearBoard(selected_difficulty);
  activeGame.regenerate();
  activeGame.draw();
};

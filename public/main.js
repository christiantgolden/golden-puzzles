let activeGame = {};
const setActiveGame = (prevOrNext, initialGame = false) => {
  prevOrNext == "prev"
    ? console.log(document.getElementById("prev").innerText)
    : console.log(document.getElementById("next").innerText);
  const game = document.getElementById(prevOrNext).innerText;
  if (game == "MINES") {
    return;
  }
  for (const g in GAMES) {
    if (GAMES[g].active) {
      GAMES[g].active = false;
      console.log(g + " was active. Now deactivated.");
      let oldGame = g.toUpperCase();
      document.getElementById(prevOrNext).innerText = oldGame;
    }
  }
  GAMES[game].active = true;
  console.log(game + " is now the active game.");
  let newGame = game.toUpperCase();
  document.getElementById("active").innerText = newGame;
  activeGame = Game();
  activeGame.draw();
  // var select = document.getElementById("diff");
  // select.value = "easy";
};

activeGame = Game();
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

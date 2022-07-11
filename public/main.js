const setActiveGame = (game) => {
  console.log(game);
  for (const g in GAMES) {
    if (GAMES[g].active) {
      GAMES[g].active = false;
      console.log(g + " was active. Now deactivated.");
    }
  }
  GAMES[game].active = true;
  console.log(game + " is now the active game.");
};

const game = Game();
game.draw();

document
  .getElementById("gen_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

const generateNewGame = () => {
  var select = document.getElementById("diff");
  var selected_difficulty =
    select.options[select.selectedIndex].value.toUpperCase();
  game.clearBoard(selected_difficulty);
  game.regenerate();
  game.draw();
};

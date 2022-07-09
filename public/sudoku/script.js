const game = new Game();
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

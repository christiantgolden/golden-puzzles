let activeGame = {};
let prevGameIndex = 2;
let activeGameIndex = 3;
let nextGameIndex = 4;
const setActiveGame = (prevOrNext) => {
  const game = document.getElementById(prevOrNext).innerText;
  for (const g in GAMES) {
    if (GAMES[g].active) {
      GAMES[g].active = false;
      switch (prevOrNext) {
        case "prev":
          prevGameIndex = (prevGameIndex - 1) % AVAILABLE_GAMES.length;
          activeGameIndex = (activeGameIndex - 1) % AVAILABLE_GAMES.length;
          nextGameIndex = (nextGameIndex - 1) % AVAILABLE_GAMES.length;
          break;
        case "next":
          prevGameIndex = (prevGameIndex + 1) % AVAILABLE_GAMES.length;
          activeGameIndex = (activeGameIndex + 1) % AVAILABLE_GAMES.length;
          nextGameIndex = (nextGameIndex + 1) % AVAILABLE_GAMES.length;

          break;
      }
      document.getElementById("prev").innerText =
        AVAILABLE_GAMES.at(prevGameIndex);
      document.getElementById("active").innerText =
        AVAILABLE_GAMES.at(activeGameIndex);
      document.getElementById("next").innerText =
        AVAILABLE_GAMES.at(nextGameIndex);
    }
  }
  GAMES[game].active = true;
  document.getElementById("active").innerText = game.toUpperCase();
  generateNewGame();
};

const showGame = () => {
  document.getElementById("game").style.setProperty("opacity", 1);
};

document
  .getElementById("gen_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

const generateNewGame = () => {
  activeGame = CreateGame();
  activeGame.draw();
};

generateNewGame();
function TENTSClickHandler(e) {
  switch (this.innerText) {
    case GRASS:
      this.innerText = TENT;
      break;
    case TENT:
      this.innerText = " ";
      break;
    case "":
      this.innerText = GRASS;
      break;
    default:
      break;
  }
}
function MINESClickHandler(e) {
  switch (this.innerText) {
    case PERSON_SAFE:
      this.innerText = PERSON_MINE;
      break;
    case PERSON_MINE:
      this.innerText = "";
      break;
    case "":
      this.innerText = PERSON_SAFE;
      break;
    default:
      break;
  }
}
function BINARYClickHandler(e) {
  switch (this.innerText) {
    case "0":
      this.innerText = "1";
      break;
    case "1":
      this.innerText = "";
      break;
    case "":
      this.innerText = "0";
      break;
    default:
      break;
  }
}

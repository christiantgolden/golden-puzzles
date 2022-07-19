let activeGame = {};
const setActiveGame = (prevOrNext) => {
  const game = document.getElementById(prevOrNext).innerText;
  for (const g in GAMES) {
    if (GAMES[g].active) {
      GAMES[g].active = false;
      let oldGame = g.toUpperCase();
      prevOrNext == "next"
        ? (document.getElementById(prevOrNext).innerText =
            document.getElementById("hidden").innerText) &&
          (document.getElementById("hidden").innerText =
            document.getElementById("hidden2").innerText) &&
          (document.getElementById("hidden2").innerText =
            document.getElementById("prev").innerText)
        : (document.getElementById(prevOrNext).innerText =
            document.getElementById("hidden2").innerText) &&
          (document.getElementById("hidden2").innerText =
            document.getElementById("hidden").innerText) &&
          (document.getElementById("hidden").innerText =
            document.getElementById("next").innerText);
      document.getElementById(
        prevOrNext == "next" ? "prev" : "next"
      ).innerText = oldGame;
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
  // Here, `this` refers to the element the event was hooked on
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
  // Here, `this` refers to the element the event was hooked on
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
  // Here, `this` refers to the element the event was hooked on
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

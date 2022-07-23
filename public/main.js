let activeGame = {};
let prevGameIndex = 2;
let activeGameIndex = 3;
let nextGameIndex = 4;
let now = new Date().getTime();
let elapsed = now;

const resetTime = () => {
  now = new Date().getTime();
  elapsed = now;
};
const setActiveGame = (prevOrNext) => {
  resetTime();
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

const generateNewGame = async () => {
  resetTime();
  activeGame = CreateGame();
  activeGame.draw();
};

const printGame = () => {
  window.print();
};

const share = () => {
  const shareData = {
    title: "Golden Puzzles",
    text: `Check out the growing collection of logic puzzles over at Golden Puzzles`,
    url: `http://golden-puzzles.web.app`,
  };
  navigator.share(shareData);
};

const check_alert = () => {
  alert(
    "Sorry, this doesn't do anything yet, but will eventually turn opaque green upon successful completion of current puzzle"
  );
};

//eventually this will allow users to specify game in url
//also allow for passing in seed?
//allow for passing in a board?
//maybe allow user to obtain a hash of current board
//which they can later pass in through url param
//to retrieve prior board
const queryString = window.location.search.replace("?", "");
const queryStringArray = queryString.split("&");
queryStringArray.forEach((i) => {
  const key_val_pair = i.split("=");
  console.log("Param: " + key_val_pair[0] + " = " + key_val_pair[1]);
  if (key_val_pair[0]?.toUpperCase() == "GAME") {
    switch (key_val_pair[1]?.toUpperCase()) {
      case "HEXOKU":
        console.log("User selected Hexoku");
        break;
      case "SUDOKU":
        console.log("User selected Sudoku");
        break;
      case "TENTS":
        console.log("User selected Tents");
        break;
    }
  }
});

console.log(queryStringArray);

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

const timer_tick = setInterval(function () {
  elapsed = new Date().getTime() - now;
  // const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
  document.getElementById("timer").innerText =
    hours + "h " + minutes + "m " + seconds + "s ";
}, 1000);

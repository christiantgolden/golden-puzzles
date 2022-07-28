let activeGame = {};
let prevGameIndex = 2;
let activeGameIndex = 3;
let nextGameIndex = 4;
let now = new Date().getTime();
let elapsed = now;
let paused = false;
const resetTime = () => {
  now = new Date().getTime();
  elapsed = now;
  document.getElementById("timer").innerText = "00:00:00";
  paused && pause();
};
const setActiveGame = (prevOrNext) => {
  paused && pause();
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

const setActiveDiff = (prevOrNext) => {
  paused && pause();
  resetTime();
  let temp_diff;
  switch (prevOrNext) {
    case "prevdiff":
      temp_diff = document.getElementById("nextdiff").innerText;
      document.getElementById("nextdiff").innerText =
        document.getElementById("activediff").innerText;
      document.getElementById("activediff").innerText =
        document.getElementById("prevdiff").innerText;
      document.getElementById("prevdiff").innerText = temp_diff;
      break;
    case "nextdiff":
      temp_diff = document.getElementById("prevdiff").innerText;
      document.getElementById("prevdiff").innerText =
        document.getElementById("activediff").innerText;
      document.getElementById("activediff").innerText =
        document.getElementById("nextdiff").innerText;
      document.getElementById("nextdiff").innerText = temp_diff;
      break;
  }
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
  paused && pause();
  resetTime();
  activeGame = CreateGame();
  activeGame.draw();
};

const printGame = () => {
  !paused && pause();
  window.print();
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
  const i = this.closest("tr").rowIndex;
  const j = this.cellIndex;
  console.log("remaining blanks: " + activeGame.remaining_blanks);
  switch (this.innerHTML) {
    case GRASS:
      this.innerHTML = TENT;
      activeGame.attempt_final_column[i]++;
      activeGame.attempt_final_row[j]++;
      break;
    case TENT:
      this.innerHTML = "";
      activeGame.remaining_blanks++;
      activeGame.attempt_final_column[i]--;
      activeGame.attempt_final_row[j]--;
      break;
    case "":
      this.innerHTML = GRASS;
      activeGame.remaining_blanks--;
      break;
    default:
      return;
      break;
  }
  activeGame.board[i][j] = this.innerHTML;
  activeGame.remaining_blanks === 0 &&
    activeGame.checkCorrect() &&
    setGameSolved();
}
function MINESClickHandler(e) {
  let cellHasMine;
  console.log(this.innerHTML);
  switch (this.innerHTML) {
    case PERSON_SAFE:
      this.innerHTML = PERSON_MINE;
      cellHasMine = true;
      break;
    case PERSON_MINE:
      this.innerHTML = "";
      activeGame.remaining_blanks++;
      cellHasMine = 3;
      break;
    case "":
      this.innerHTML = PERSON_SAFE;
      activeGame.remaining_blanks--;
      cellHasMine = false;
      break;
    default:
      break;
  }
  const i = this.closest("tr").rowIndex;
  const j = this.cellIndex;
  activeGame.board[i][j].hasMine = cellHasMine;
  activeGame.remaining_blanks === 0 &&
    activeGame.checkCorrect() &&
    setGameSolved();
}
function BINARYClickHandler(e) {
  switch (this.innerText) {
    case "0":
      this.innerText = "1";
      break;
    case "1":
      this.innerText = "";
      activeGame.remaining_blanks--;
      break;
    case "":
      this.innerText = "0";
      activeGame.remaining_blanks++;
      break;
    default:
      break;
  }
}

const timer_tick = setInterval(function () {
  if (paused) {
    return;
  } else {
    elapsed = new Date().getTime() - now;
    const hours = Math.floor(
      (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    document.getElementById("timer").innerText =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
  }
}, 1000);

const pause = () => {
  const cells = document.getElementsByClassName("cell");
  if (paused) {
    for (let c = 0; c < cells.length; c++) {
      cells[c].removeAttribute("readonly");
    }
    document.getElementById("timer").style.opacity = 1;
    document.getElementById("timer").classList.remove("fa-beat-fade");
    document.getElementById("timer").style.color = "#ffffffaa";
    now = new Date().getTime() - elapsed;
  } else {
    for (let c = 0; c < cells.length; c++) {
      cells[c].setAttribute("readonly", true);
    }
    document.getElementById("timer").style.opacity = 0.5;
  }
  paused = !paused;
};

document.addEventListener("visibilitychange", pause);

const toggle_information = () => {
  this.document.getElementById("instructions").style.display == "block"
    ? (this.document.getElementById("instructions").style.display = "none")
    : (this.document.getElementById("instructions").style.display = "block");
};

(function () {
  var beforePrint = function () {
    !paused && pause();
  };

  if (window.matchMedia) {
    var mediaQueryList = window.matchMedia("print");
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        beforePrint();
      }
    });
  }

  window.onbeforeprint = beforePrint;
})();

const setGameSolved = () => {
  pause();
  document.getElementById("timer").style.color = SOLVED_COLOR;
  document.getElementById("timer").classList.add("fa-beat-fade");
};

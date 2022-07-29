//REFACTOR #29 - move these global variables and most/all of this code into an object of a Session class
let activePuzzle = {};
let prevPuzzleIndex = 2;
let activePuzzleIndex = 3;
let nextPuzzleIndex = 4;
let now = new Date().getTime();
let elapsed = now;
let paused = false;
const resetTime = () => {
  now = new Date().getTime();
  elapsed = now;
  document.getElementById("timer").innerText = "00:00:00";
  paused && pause();
};
const setActivePuzzle = (prevOrNext) => {
  paused && pause();
  resetTime();
  const puzzle = document.getElementById(prevOrNext).innerText;
  for (const g in PUZZLES) {
    if (PUZZLES[g].active) {
      PUZZLES[g].active = false;
      switch (prevOrNext) {
        case "prev":
          prevPuzzleIndex = (prevPuzzleIndex - 1) % AVAILABLE_PUZZLES.length;
          activePuzzleIndex =
            (activePuzzleIndex - 1) % AVAILABLE_PUZZLES.length;
          nextPuzzleIndex = (nextPuzzleIndex - 1) % AVAILABLE_PUZZLES.length;
          break;
        case "next":
          prevPuzzleIndex = (prevPuzzleIndex + 1) % AVAILABLE_PUZZLES.length;
          activePuzzleIndex =
            (activePuzzleIndex + 1) % AVAILABLE_PUZZLES.length;
          nextPuzzleIndex = (nextPuzzleIndex + 1) % AVAILABLE_PUZZLES.length;

          break;
      }
      document.getElementById("prev").innerText =
        AVAILABLE_PUZZLES.at(prevPuzzleIndex);
      document.getElementById("active").innerText =
        AVAILABLE_PUZZLES.at(activePuzzleIndex);
      document.getElementById("next").innerText =
        AVAILABLE_PUZZLES.at(nextPuzzleIndex);
    }
  }
  PUZZLES[puzzle].active = true;
  document.getElementById("active").innerText = puzzle.toUpperCase();
  generateNewPuzzle();
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
  generateNewPuzzle();
};

const showPuzzle = () => {
  document.getElementById("puzzle").style.setProperty("opacity", 1);
};

document
  .getElementById("gen_button")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

const generateNewPuzzle = async (puzzle = "", board = "", difficulty = "") => {
  paused && pause();
  resetTime();
  activePuzzle = CreatePuzzle(puzzle, board, difficulty);
  activePuzzle.draw();
};

const printPuzzle = () => {
  !paused && pause();
  window.print();
};

//eventually this will allow users to specify puzzle in url
//also allow for passing in seed?
//allow for passing in a board?
//maybe allow user to obtain a hash of current board
//which they can later pass in through url param
//to retrieve prior board
generateNewPuzzle();

function TENTSClickHandler(e) {
  if (paused) {
    return;
  }
  const i = this.closest("tr").rowIndex;
  const j = this.cellIndex;
  switch (this.innerHTML) {
    case GRASS:
      this.innerHTML = TENT;
      activePuzzle.attempt_final_column[i]++;
      activePuzzle.attempt_final_row[j]++;
      break;
    case TENT:
      this.innerHTML = "";
      activePuzzle.remaining_blanks++;
      activePuzzle.attempt_final_column[i]--;
      activePuzzle.attempt_final_row[j]--;
      break;
    case "":
      this.innerHTML = GRASS;
      activePuzzle.remaining_blanks--;
      break;
    default:
      return;
      break;
  }
  activePuzzle.board[i][j] = this.innerHTML;
  activePuzzle.remaining_blanks === 0 &&
    activePuzzle.checkCorrect() &&
    setPuzzleSolved();
}
function MINESClickHandler(e) {
  if (paused) {
    return;
  }
  let cellHasMine;
  console.log(this.innerHTML);
  switch (this.innerHTML) {
    case PERSON_SAFE:
      this.innerHTML = PERSON_MINE;
      cellHasMine = true;
      break;
    case PERSON_MINE:
      this.innerHTML = "";
      activePuzzle.remaining_blanks++;
      cellHasMine = 3;
      break;
    case "":
      this.innerHTML = PERSON_SAFE;
      activePuzzle.remaining_blanks--;
      cellHasMine = false;
      break;
    default:
      break;
  }
  const i = this.closest("tr").rowIndex;
  const j = this.cellIndex;
  activePuzzle.board[i][j].hasMine = cellHasMine;
  activePuzzle.remaining_blanks === 0 &&
    activePuzzle.checkCorrect() &&
    setPuzzleSolved();
}
function BINARYClickHandler(e) {
  if (paused) {
    return;
  }
  const i = this.closest("tr").rowIndex;
  const j = this.cellIndex;
  switch (this.innerHTML) {
    case "0":
      this.innerHTML = "1";
      break;
    case "1":
      this.innerHTML = "";
      activePuzzle.remaining_blanks++;
      break;
    case "":
      this.innerHTML = "0";
      activePuzzle.remaining_blanks--;
      break;
    default:
      break;
  }
  activePuzzle.board[i][j] = this.innerHTML;
  activePuzzle.remaining_blanks === 0 &&
    activePuzzle.checkCorrect() &&
    setPuzzleSolved();
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

const setPuzzleSolved = () => {
  pause();
  document.getElementById("timer").style.color = SOLVED_COLOR;
  document.getElementById("timer").classList.add("fa-beat-fade");
};

function handleChangeInput(e) {
  // sharePuzzle();
  switch (this.value) {
    case "":
      activePuzzle.remaining_blanks++;
      return;
    default:
      activePuzzle.remaining_blanks--;
      break;
  }
  const i = this.closest("tr").rowIndex;
  const j = this.parentElement.cellIndex;

  !Array.isArray(activePuzzle.board[i]) &&
    (activePuzzle.board[i] = activePuzzle.board[i].split(""));
  activePuzzle.board[i][j] = this.value;

  activePuzzle.board[i] = activePuzzle.board[i]
    .join("")
    .replace(activePuzzle.board[i].at(j), this.value);

  activePuzzle.remaining_blanks === 0 &&
    activePuzzle.checkCorrect(i, j, this.value) &&
    setPuzzleSolved();
}

const queryString = window.location.search.replace("?", "");
const queryStringArray = queryString.split("&");
let urlPuzzle;
queryStringArray.forEach((i) => {
  const key_val_pair = i.split("=");
  console.log("Param: " + key_val_pair[0] + " = " + key_val_pair[1]);
  if (key_val_pair[0]?.toUpperCase() == "PUZZLE") {
    switch (key_val_pair[1]?.toUpperCase()) {
      case "HEXOKU":
        urlPuzzle = "HEXOKU";
        console.log("User selected Hexoku");
        break;
      case "SUDOKU":
        urlPuzzle = "SUDOKU";
        console.log("User selected Sudoku");
        break;
      case "TENTS":
        urlPuzzle = "TENTS";
        console.log("User selected Tents");
        break;
      case "MINES":
        urlPuzzle = "MINES";
        console.log("User selected Tents");
        break;
      case "BINARY":
        urlPuzzle = "BINARY";
        console.log("User selected Tents");
        break;
      case "BOXES":
        urlPuzzle = "BOXES";
        console.log("User selected Tents");
        break;
      case "BOX16":
        urlPuzzle = "BOX16";
        console.log("User selected Tents");
        break;
      default:
        urlPuzzle = "SUDOKU";
        break;
    }
  }
});

console.log(queryStringArray);

async function sharePuzzle() {
  const boardString = JSON.stringify(activePuzzle.board);
  const shareData = {
    title: activePuzzle.constructor.name,
    text: "Check out this puzzle I either finished or am working on over at Golden Puzzles!",
    url: `https:\\golden-puzzles.web.app/?PUZZLE=${activePuzzle.constructor.name}&BOARD=${boardString}&DIFFICULTY=${activePuzzle.difficulty}`,
  };
  try {
    await navigator.share(shareData);
    console.log("Puzzle shared successfully");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  console.log(shareData);
}

//REFACTOR #29 - move these global variables and most/all of this code into an object of a Session class
let activePuzzle = {};
let prevPuzzleIndex = 2;
let activePuzzleIndex = 3;
let nextPuzzleIndex = 4;
let now = new Date().getTime();
let elapsed = now;
let paused = false;
let seed = INITIAL_SEED;
let sharing_seed = seed;

const resetTime = () => {
  now = new Date().getTime();
  elapsed = now;
  document.getElementById("timer").innerText = "00:00:00";
  paused && pause();
};

// const queryString = window.location.search.replace("?", "");
// const queryStringArray = queryString.split("&");

// if (queryStringArray.length === 3) {
//   setInitialPuzzle(queryStringArray[0]);
//   setInitialSeed(queryStringArray[1]);
//   setInitialDifficulty(queryStringArray[2]);
// }
// generateNewPuzzle();

const setInitialSeed = (initial_seed) => {
  seed = initial_seed;
};

const setInitialPuzzle = (puzzle) => {
  console.log(puzzle);
  for (const g in PUZZLES) {
    if (PUZZLES[g].active) {
      PUZZLES[g].active = false;
      switch (puzzle) {
        case "BINARY":
          activePuzzleIndex = 0;
          prevPuzzleIndex = 6;
          nextPuzzleIndex = 1;
          break;
        case "TENTS":
          activePuzzleIndex = 1;
          prevPuzzleIndex = 0;
          nextPuzzleIndex = 2;
          break;

        case "MINES":
          activePuzzleIndex = 2;
          prevPuzzleIndex = 1;
          nextPuzzleIndex = 3;
          break;

        case "HEXOKU":
          activePuzzleIndex = 3;
          prevPuzzleIndex = 2;
          nextPuzzleIndex = 4;
          break;

        case "BOXES":
          activePuzzleIndex = 4;
          prevPuzzleIndex = 3;
          nextPuzzleIndex = 5;
          break;

        case "BOX16":
          activePuzzleIndex = 5;
          prevPuzzleIndex = 4;
          nextPuzzleIndex = 6;
          break;

        case "SUDOKU":
          activePuzzleIndex = 6;
          prevPuzzleIndex = 5;
          nextPuzzleIndex = 0;
          break;

        default:
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

const setInitialDifficulty = (initial_diff) => {
  switch (initial_diff) {
    case 3: //easy
      document.getElementById("prevdiff").innerText = "HARD";
      document.getElementById("activediff").innerText = "EASY";
      document.getElementById("nextdiff").innerText = "NORMAL";
      break;
    case 5:
      document.getElementById("prevdiff").innerText = "EASY";
      document.getElementById("activediff").innerText = "NORMAL";
      document.getElementById("nextdiff").innerText = "HARD";
      break;
    case 8:
      document.getElementById("prevdiff").innerText = "NORMAL";
      document.getElementById("activediff").innerText = "HARD";
      document.getElementById("nextdiff").innerText = "EASY";
      break;
    default:
      break;
  }
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

const generateNewPuzzle = async () => {
  sharing_seed = seed;
  paused && pause();
  resetTime();
  activePuzzle = CreatePuzzle();
  activePuzzle.draw();
};

const printPuzzle = () => {
  !paused && pause();
  window.print();
};

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
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInRange(a, b) {
  return Math.floor(mulberry32(seed++)() * b + a);
}

function handleChangeInput(e) {
  const randNum = randInRange(1, 9);
  console.log("Random number: " + randNum);
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
async function sharePuzzle() {
  const boardString = JSON.stringify(activePuzzle.board);
  const shareData = {
    title: activePuzzle.constructor.name,
    text: "Check out this puzzle I either finished or am working on over at Golden Puzzles!",
    url: `https://golden-puzzles.web.app?${activePuzzle.constructor.name}&${sharing_seed}&${activePuzzle.difficulty}`,
  };
  try {
    await navigator.share(shareData);
    console.log("Puzzle shared successfully");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  console.log(shareData);
}
const queryString = window.location.search.replace("?", "");
const queryStringArray = queryString.split("&");

if (queryStringArray.length === 3) {
  setInitialPuzzle(queryStringArray[0].toUpperCase());
  setInitialSeed(queryStringArray[1]);
  setInitialDifficulty(queryStringArray[2]);
}
generateNewPuzzle();

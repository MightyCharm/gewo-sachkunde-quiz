const btnStart = document.getElementById("btn-start");
const btnQuit = document.getElementById("btn-quit");
const btnKnow = document.getElementById("btn-know");
const btnDidNotKnow = document.getElementById("btn-did-not-know");

const containerGameControl = document.querySelector(".container-game-control");
const containerStats = document.querySelector(".container-stats");
const containerQuestion = document.querySelector(".container-question");
const containerAnswer = document.querySelector(".container-answer");
const containerCheck = document.querySelector(".container-check");

const spanTotalCurrent = document.getElementById("stat-total-current");
const spanTotalMax = document.getElementById("stat-total-max");
const spanCorrect = document.getElementById("stat-correct");
const spanWrong = document.getElementById("stat-wrong");

let countQuestion = 0;
let totalQuestions = 50;

let countCorrect = 0;
let countWrong = 0;

const GAME_MAIN_MENU = "game_main_menu";
const GAME_START = "game_start";
const GAME_QUIT = "game_quit";

function resetGameStats() {
  countQuestion = 0;
  countCorrect = 0;
  countWrong = 0;
}

function toggleVisibilityGame(state) {
  switch (state) {
    case GAME_MAIN_MENU:
    case GAME_QUIT:
      containerStats.classList.add("hidden");
      containerQuestion.classList.add("hidden");
      containerAnswer.classList.add("hidden");
      containerCheck.classList.add("hidden");
      break;
    case GAME_START:
      containerStats.classList.remove("hidden");
      containerQuestion.classList.remove("hidden");
      containerAnswer.classList.remove("hidden");
      containerCheck.classList.remove("hidden");
      break;
    default:
      console.log("should not see me 1.");
  }
}

function setButtonState(state) {
  switch (state) {
    case GAME_MAIN_MENU:
      btnQuit.disabled = true;
      break;
    case GAME_START:
      btnStart.disabled = true;
      btnQuit.disabled = false;
      break;
    case GAME_QUIT:
      btnStart.disabled = false;
      btnQuit.disabled = true;
      break;
    default:
      console.log("should not see me 2.");
  }
}

function initialize() {
  spanTotalCurrent.textContent = countQuestion;
  spanTotalMax.textContent = totalQuestions;
  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;

  updateUI(GAME_MAIN_MENU);
}

function updateUI(state) {
  setButtonState(state);
  toggleVisibilityGame(state);
}

btnStart.addEventListener("click", () => {
  updateUI(GAME_START);
});

btnQuit.addEventListener("click", () => {
  resetGameStats();
  updateUI(GAME_QUIT);
});

btnKnow.addEventListener("click", () => {
  console.log("btnKnow");
});

btnDidNotKnow.addEventListener("click", () => {
  console.log("btnDidNotKnow");
});

initialize();

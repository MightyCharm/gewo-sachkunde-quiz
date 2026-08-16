const btnStart = document.getElementById("btn-start");
const btnQuit = document.getElementById("btn-quit");
const btnCorrect = document.getElementById("btn-correct");
const btnWrong = document.getElementById("btn-wrong");

const containerGameControl = document.querySelector(".container-game-control");
const containerStats = document.querySelector(".container-stats");
const containerQuestion = document.querySelector(".container-question");
const containerAnswer = document.querySelector(".container-answer");
const containerCheck = document.querySelector(".container-check");

const spanTotalCurrent = document.getElementById("stat-total-current");
const spanTotalMax = document.getElementById("stat-total-max");
const spanCorrect = document.getElementById("stat-correct");
const spanWrong = document.getElementById("stat-wrong");

let countQuestions = 0;
let totalQuestions = 5;

let countCorrect = 0;
let countWrong = 0;
const ANSWER_CORRECT = "correct";
const ANSWER_WRONG = "wrong";

const GAME_MAIN_MENU = "game_main_menu";
const GAME_START = "game_start";
const GAME_OVER = "game_over";
const GAME_QUIT = "game_quit";

function initialize() {
  spanTotalCurrent.textContent = countQuestions;
  spanTotalMax.textContent = totalQuestions;
  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;

  updateVisibilityGame(GAME_MAIN_MENU);
}

function resetGameStats() {
  countQuestions = 0;
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
  console.log("setButtonState:", state);
  switch (state) {
    case GAME_MAIN_MENU:
      btnQuit.disabled = true;
      break;
    case GAME_START:
      btnStart.disabled = true;
      btnQuit.disabled = false;
      btnCorrect.disabled = false;
      btnWrong.disabled = false;
      break;
    case GAME_OVER:
      btnCorrect.disabled = true;
      btnWrong.disabled = true;
      break;
    case GAME_QUIT:
      btnStart.disabled = false;
      btnQuit.disabled = true;
      break;
    default:
      console.log("should not see me 2.");
  }
}

function updateVisibilityGame(state) {
  setButtonState(state);
  toggleVisibilityGame(state);
}

function setStatsLogic(value) {
  switch (value) {
    case ANSWER_CORRECT:
      countCorrect += 1;
      break;
    case ANSWER_WRONG:
      countWrong += 1;
      break;
  }
  countQuestions = countCorrect + countWrong;
  console.log(`${countQuestions}: ${countCorrect} ${countWrong}`);
  if (countQuestions >= totalQuestions) {
    console.log(
      `Game Over: totalQuestions: ${totalQuestions} countQuestions: ${countQuestions}, `,
    );
    setButtonState(GAME_OVER);
    return;
  }
}

function updateStatsUI() {
  spanTotalCurrent.textContent = countQuestions;
  spanTotalMax.textContent = totalQuestions;

  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;
}

btnStart.addEventListener("click", () => {
  updateVisibilityGame(GAME_START);
  updateStatsUI();
});

btnQuit.addEventListener("click", () => {
  resetGameStats();
  updateVisibilityGame(GAME_QUIT);
  updateStatsUI();
});

btnCorrect.addEventListener("click", () => {
  setStatsLogic(ANSWER_CORRECT);
  updateStatsUI();
});

btnWrong.addEventListener("click", () => {
  setStatsLogic(ANSWER_WRONG);
  updateStatsUI();
});

initialize();

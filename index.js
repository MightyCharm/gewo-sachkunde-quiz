const btnStart = document.getElementById("btn-start");
const btnQuit = document.getElementById("btn-quit");
const btnShowAnswer = document.getElementById("btn-show-answer");
const btnCorrect = document.getElementById("btn-correct");
const btnWrong = document.getElementById("btn-wrong");

const containerGameControl = document.querySelector(".container-game-control");
const containerStats = document.querySelector(".container-stats");
const containerQuestion = document.querySelector(".container-question");
const containerAnswer = document.querySelector(".container-answer");
const containerShowAnswer = document.querySelector(".container-show-answer");
const containerCheck = document.querySelector(".container-check");

const spanTotalCurrent = document.getElementById("stat-total-current");
const spanTotalMax = document.getElementById("stat-total-max");
const spanCorrect = document.getElementById("stat-correct");
const spanWrong = document.getElementById("stat-wrong");

let countQuestions = 0;
let totalQuestions = 3;

let countCorrect = 0;
let countWrong = 0;
const GAME_ANSWER_CORRECT = "correct";
const GAME_ANSWER_WRONG = "wrong";

const GAME_MAIN_MENU = "game_main_menu";
const GAME_START = "game_start";
const GAME_OVER = "game_over";
const GAME_QUIT = "game_quit";
const GAME_SHOW_ANSWER = "game_show_answer";

function initialize() {
  console.log("inititalize()");
  spanTotalCurrent.textContent = countQuestions;
  spanTotalMax.textContent = totalQuestions;
  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;

  toggleVisibilityGame(GAME_MAIN_MENU);
  setButtonState(GAME_MAIN_MENU);
}

function resetGameStats() {
  countQuestions = 0;
  countCorrect = 0;
  countWrong = 0;
}

function toggleVisibilityGame(state) {
  console.log("toggleVisibilityGame(state):", state);
  switch (state) {
    case GAME_MAIN_MENU:
    case GAME_QUIT:
      containerStats.classList.add("hidden");
      containerQuestion.classList.add("hidden");
      containerAnswer.classList.add("hidden");
      containerShowAnswer.classList.add("hidden");
      containerCheck.classList.add("hidden");
      break;
    case GAME_START:
      containerStats.classList.remove("hidden");
      containerQuestion.classList.remove("hidden");
      containerShowAnswer.classList.remove("hidden");
      break;
    case GAME_SHOW_ANSWER:
      containerAnswer.classList.remove("hidden");
      containerShowAnswer.classList.add("hidden");
      containerCheck.classList.remove("hidden");
      break;
    case GAME_ANSWER_CORRECT:
    case GAME_ANSWER_WRONG:
      containerShowAnswer.classList.remove("hidden");
      containerCheck.classList.add("hidden");
      break;
    case GAME_OVER:
      containerQuestion.classList.add("hidden");
      containerAnswer.classList.add("hidden");
      containerShowAnswer.classList.add("hidden");
      break;
    default:
      console.log("should not see me 1.");
  }
}

function setButtonState(state) {
  console.log("setButtonState(state):", state);
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

function setStatsLogic(value) {
  switch (value) {
    case GAME_ANSWER_CORRECT:
      countCorrect += 1;
      break;
    case GAME_ANSWER_WRONG:
      countWrong += 1;
      break;
  }
  countQuestions = countCorrect + countWrong;
  console.log(`${countQuestions}: ${countCorrect} ${countWrong}`);
  if (countQuestions >= totalQuestions) {
    console.log(
      `Game Over: totalQuestions: ${totalQuestions} countQuestions: ${countQuestions}, `,
    );
    toggleVisibilityGame(GAME_OVER);
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
  toggleVisibilityGame(GAME_START);
  setButtonState(GAME_START);
  updateStatsUI();
});

btnQuit.addEventListener("click", () => {
  resetGameStats();
  updateStatsUI();
  toggleVisibilityGame(GAME_QUIT);
  setButtonState(GAME_QUIT);
});

btnShowAnswer.addEventListener("click", () => {
  toggleVisibilityGame(GAME_SHOW_ANSWER);
});

btnCorrect.addEventListener("click", () => {
  toggleVisibilityGame(GAME_ANSWER_CORRECT);
  setStatsLogic(GAME_ANSWER_CORRECT);
  updateStatsUI();
});

btnWrong.addEventListener("click", () => {
  toggleVisibilityGame(GAME_ANSWER_WRONG);
  setStatsLogic(GAME_ANSWER_WRONG);
  updateStatsUI();
});

initialize();

const header = document.getElementById("header");
const main = document.getElementById("main");

const start = {
  container: document.getElementById("container-start"),
  spanQuestionCount: document.getElementById("question-count"),
  spanCategoryCount: document.getElementById("category-count"),
  selectQuestionCount: document.getElementById("select-question-count"),
  selectQuestionCategory: document.getElementById("select-question-category"),
  btnStart: document.getElementById("btn-start"),
};

const end = {
  container: document.getElementById("container-end"),
  spanTotalCurrent: document.getElementById("end-screen-stat-total-current"),
  spanTotalMax: document.getElementById("end-screen-stat-total-max"),
  spanCorrect: document.getElementById("end-screen-stat-correct"),
  spanWrong: document.getElementById("end-screen-stat-wrong"),
  spanPercentage: document.getElementById("end-screen-percentage"),
  spanPercentageMessage: document.getElementById(
    "end-screen-percentage-message",
  ),
  btnMenu: document.getElementById("btn-main-menu"),
  btnPracticeMistakes: document.getElementById("btn-practice-mistakes"),
};

const game = {
  container: document.getElementById("container-game"),
  cardMenuControl: document.getElementById("card-menu-control"),
  btnQuit: document.getElementById("btn-quit"),
  cardStats: document.getElementById("card-stats"),
  spanTotalCurrent: document.getElementById("stat-total-current"),
  spanTotalMax: document.getElementById("stat-total-max"),
  spanCorrect: document.getElementById("stat-correct"),
  spanWrong: document.getElementById("stat-wrong"),
  divProgressBar: document.getElementById("progress-bar"),
  cardQuestion: document.getElementById("card-question"),
  headerQuestion: document.getElementById("header-question-category"),
  paraQuestion: document.getElementById("para-question"),
  spanQuestionId: document.getElementById("id-question"),
  cardAnswer: document.getElementById("card-answer"),
  paraAnswer: document.getElementById("answer-para"),
  cardGameControl: document.getElementById("card-game-control"),
  btnShowAnswer: document.getElementById("btn-show-answer"),
  btnCorrect: document.getElementById("btn-correct"),
  btnWrong: document.getElementById("btn-wrong"),
  btnResult: document.getElementById("btn-result"),
};

let countQuestions = 0;
let totalQuestions = undefined;

let countCorrect = 0;
let countWrong = 0;

let quizData = [];
let mistakesData = [];
let indexCurrentQuestion = 0;

const GAME_ANSWER_CORRECT = "correct";
const GAME_ANSWER_WRONG = "wrong";

const GAME_MAIN_MENU = "game_main_menu";
const GAME_START = "game_start";
const GAME_OVER = "game_over";
const GAME_RESULT = "game_result";
const GAME_RESULT_MISTAKES = "game_result_mistakes";
const GAME_QUIT = "game_quit";
const GAME_SHOW_ANSWER = "game_show_answer";

let isNormalMode = true;

function initialize() {
  //console.log("inititalize()");
  toggleVisibilityGame(GAME_MAIN_MENU);
  setButtonState(GAME_MAIN_MENU);
  displayTheme(getThemeStorage());
  updateStartScreenStats();
}

function initializeProgressBar() {
  //console.log("initializeProgressBar()");
  const COLUMNS_IN_ROW = 20;
  let count = 0;
  while (count < totalQuestions) {
    const row = document.createElement("div");
    row.classList.add("progress-bar-row");

    for (let i = 0; i < COLUMNS_IN_ROW; i++) {
      const column = document.createElement("div");
      column.classList.add("progress-bar-column");
      if (count === totalQuestions) break;
      row.appendChild(column);
      count++;
    }
    if (count <= totalQuestions) {
      game.divProgressBar.appendChild(row);
    }
  }
}

function clearProgressBar() {
  //console.log("clearProgressBar()");
  const rows = document.querySelectorAll(".progress-bar-row");
  for (const row of rows) {
    game.divProgressBar.removeChild(row);
  }
}

function updateProgressBar(value) {
  //console.log("updateProgressBar()", value);
  const columns = document.querySelectorAll(".progress-bar-column");

  for (let i = 0; i < columns.length; i++) {
    if (i === countQuestions) {
      if (value === "correct") {
        columns[i].classList.add("correct");
      } else {
        columns[i].classList.add("wrong");
      }
    }
  }
}

function getThemeStorage() {
  const theme = localStorage.getItem("theme");
  return theme;
}

function setThemeStorage(newTheme) {
  localStorage.setItem("theme", newTheme);
}

function displayTheme(newTheme) {
  //console.log("displayTheme()", newTheme);
  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
    return;
  }
  document.documentElement.classList.remove("dark");
}

function toggleTheme() {
  let currentTheme = getThemeStorage();
  if (!currentTheme) {
    currentTheme = "light";
  }
  const newTheme = currentTheme === "light" ? "dark" : "light";

  setThemeStorage(newTheme);
  displayTheme(newTheme);
}

function resetGameVariables() {
  //console.log("resetGameVariables()");
  countQuestions = 0;
  countCorrect = 0;
  countWrong = 0;
  indexCurrentQuestion = 0;
}

function clearData() {
  quizData = [];
}

function clearMistakesData() {
  mistakesData = [];
}

function updateStartScreenStats() {
  const countQuestions = data.length;

  const uniqueCategories = new Set();
  for (const question of data) {
    uniqueCategories.add(question.category);
  }
  const countCategories = uniqueCategories.size;

  start.spanQuestionCount.textContent = countQuestions;
  start.spanCategoryCount.textContent = countCategories;
}

function setStatsLogic(value) {
  //console.log("setStateLogic()");
  switch (value) {
    case GAME_ANSWER_CORRECT:
      countCorrect += 1;
      break;
    case GAME_ANSWER_WRONG:
      countWrong += 1;
      break;
  }
  countQuestions = countCorrect + countWrong;

  // game over condition
  if (countQuestions >= totalQuestions) {
    toggleVisibilityGame(GAME_OVER);
    setButtonState(GAME_OVER);
    return;
  }
}

function getPercentage() {
  //console.log("getPercentag()");
  return Math.round((countCorrect / totalQuestions) * 100);
}

function setPercentageResult(percentage) {
  //console.log("setPercentageResult()");
  end.spanPercentage.classList.remove("very-good");
  end.spanPercentage.classList.remove("good");
  end.spanPercentage.classList.remove("mediocre");
  end.spanPercentage.classList.remove("bad");
  let message = undefined;
  if (percentage >= 90) {
    message = "Sehr gut";
    end.spanPercentage.classList.add("very-good");
  } else if (percentage >= 70) {
    message = "Gut";
    end.spanPercentage.classList.add("good");
  } else if (percentage >= 50) {
    message = "Mittelmäßig";
    end.spanPercentage.classList.add("mediocre");
  } else {
    message = "Nochmal versuchen";
    end.spanPercentage.classList.add("bad");
  }
  return message;
}

function displayStats() {
  //console.log("displayStats()");
  game.spanTotalCurrent.textContent = countQuestions;
  game.spanTotalMax.textContent = totalQuestions;
  game.spanCorrect.textContent = countCorrect;
  game.spanWrong.textContent = countWrong;
}

function displayStatsEndScreen() {
  end.spanTotalCurrent.textContent = countQuestions;
  end.spanTotalMax.textContent = totalQuestions;
  end.spanCorrect.textContent = countCorrect;
  end.spanWrong.textContent = countWrong;
  const percentage = getPercentage();
  end.spanPercentage.textContent = `${percentage} %`;
  end.spanPercentageMessage.textContent = setPercentageResult(percentage);
}

function displayQuestion() {
  //console.log("displayQuestion()");
  const currentQuestion = quizData[indexCurrentQuestion];
  game.headerQuestion.textContent = currentQuestion.category;
  game.paraQuestion.textContent = currentQuestion.question;
  game.spanQuestionId.textContent = currentQuestion.id;
}

function displayAnswer() {
  //console.log(quizData[indexCurrentQuestion]);
  game.paraAnswer.innerHTML = quizData[indexCurrentQuestion].answer;
}

function setIndexCurrentQuestion() {
  //console.log("setIndexCurrentQuestion()");
  if (indexCurrentQuestion < quizData.length - 1) {
    indexCurrentQuestion += 1;
  }
}

function createQuizData(userCount, userCategory) {
  //console.log("createQuizData(", userCount, userCategory, ")");
  const count = Number(userCount);
  let copyData = [...data];
  if (userCategory !== "all") {
    copyData = copyData.filter((obj) => obj.category === userCategory);
  }
  const limit = copyData.length > count ? count : copyData.length;
  totalQuestions = limit; // Game Over Condition / Progressbar / quizData size
  const shuffledData = shuffleArray(copyData);
  quizData = shuffledData.slice(0, limit);
}

function createMistakesData() {
  //console.log("function createMistakesData()");
  let copyData = [...mistakesData];
  totalQuestions = copyData.length;
  const shuffledData = shuffleArray(copyData);
  quizData = shuffledData;
}

function addMistake() {
  mistakesData.push(quizData[indexCurrentQuestion]);
}

function hasMistakes() {
  return mistakesData.length > 0;
}

function removeMistake() {
  //console.log("function removeMistakes()");
  mistakesData = mistakesData.filter(
    (obj) => obj.id !== quizData[indexCurrentQuestion].id,
  );
}

function shuffleArray(data) {
  let shuffledData = [...data];
  for (let i = shuffledData.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const randomValue = shuffledData[randomIndex];
    const currentValue = shuffledData[i];
    shuffledData[randomIndex] = currentValue;
    shuffledData[i] = randomValue;
  }
  return shuffledData;
}

function toggleVisibilityGame(state) {
  //console.log("toggleVisibilityGame(state):", state);
  start.container.classList.add("hidden");
  game.container.classList.add("hidden");
  game.cardMenuControl.classList.add("hidden");
  game.cardStats.classList.add("hidden");
  game.cardQuestion.classList.add("hidden");
  game.cardAnswer.classList.add("hidden");
  game.cardGameControl.classList.add("hidden");
  game.btnShowAnswer.classList.add("removed");
  game.btnCorrect.classList.add("removed");
  game.btnWrong.classList.add("removed");
  game.btnResult.classList.add("removed");
  end.container.classList.add("hidden");
  end.btnPracticeMistakes.classList.add("removed");
  switch (state) {
    case GAME_MAIN_MENU:
    case GAME_QUIT:
      start.container.classList.remove("hidden");
      break;
    case GAME_START:
      game.container.classList.remove("hidden");
      game.cardMenuControl.classList.remove("hidden");
      game.cardStats.classList.remove("hidden");
      game.cardQuestion.classList.remove("hidden");
      game.cardGameControl.classList.remove("hidden");
      game.btnShowAnswer.classList.remove("removed");
      break;
    case GAME_SHOW_ANSWER:
      game.container.classList.remove("hidden");
      game.cardMenuControl.classList.remove("hidden");
      game.cardStats.classList.remove("hidden");
      game.cardQuestion.classList.remove("hidden");
      game.cardAnswer.classList.remove("hidden");
      game.cardGameControl.classList.remove("hidden");
      game.btnCorrect.classList.remove("removed");
      game.btnWrong.classList.remove("removed");
      break;
    case GAME_ANSWER_CORRECT:
    case GAME_ANSWER_WRONG:
      game.container.classList.remove("hidden");
      game.cardMenuControl.classList.remove("hidden");
      game.cardStats.classList.remove("hidden");
      game.cardQuestion.classList.remove("hidden");
      game.cardGameControl.classList.remove("hidden");
      game.btnShowAnswer.classList.remove("removed");
      break;
    case GAME_OVER:
      game.container.classList.remove("hidden");
      game.cardStats.classList.remove("hidden");
      game.cardGameControl.classList.remove("hidden");
      game.btnResult.classList.remove("removed");
      break;
    case GAME_RESULT_MISTAKES:
      end.container.classList.remove("hidden");
      end.btnPracticeMistakes.classList.remove("removed");
      break;
    case GAME_RESULT:
      end.container.classList.remove("hidden");
      break;
    default:
      console.log("should not see me 1.");
  }
}

function setButtonState(state) {
  //console.log("setButtonState(state):", state);
  start.btnStart.disabled = true;
  game.btnQuit.disabled = true;
  game.btnShowAnswer.disabled = true;
  game.btnCorrect.disabled = true;
  game.btnWrong.disabled = true;
  game.btnResult.disabled = true;
  end.btnMenu.disabled = true;
  end.btnPracticeMistakes.disabled = true;
  switch (state) {
    case GAME_MAIN_MENU:
      start.btnStart.disabled = false;
      break;
    case GAME_START:
      game.btnQuit.disabled = false;
      game.btnShowAnswer.disabled = false;
      break;
    case GAME_QUIT:
      start.btnStart.disabled = false;
      break;
    case GAME_SHOW_ANSWER:
      game.btnQuit.disabled = false;
      game.btnCorrect.disabled = false;
      game.btnWrong.disabled = false;
      break;
    case GAME_ANSWER_CORRECT:
    case GAME_ANSWER_WRONG:
      game.btnQuit.disabled = false;
      game.btnShowAnswer.disabled = false;
      break;
    case GAME_OVER:
      game.btnResult.disabled = false;
      break;
    case GAME_RESULT_MISTAKES:
      end.btnMenu.disabled = false;
      end.btnPracticeMistakes.disabled = false;
      break;
    case GAME_RESULT:
      end.btnMenu.disabled = false;
      break;
    default:
      console.log("Something went wrong. setButtonState()");
  }
}

function headerEventHandler(event) {
  //console.log("headerEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  const btnId = button.id;

  switch (btnId) {
    case "btn-theme":
      toggleTheme();
      break;
  }
}

function mainEventHandler(event) {
  //console.log("mainEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  const btnId = button.id;
  //console.log(btnId);
  switch (btnId) {
    case "btn-start":
      isNormalMode = true;
      resetGameVariables();
      clearData();
      clearMistakesData();
      createQuizData(
        start.selectQuestionCount.value,
        start.selectQuestionCategory.value,
      );
      displayStats();
      clearProgressBar();
      initializeProgressBar();
      displayQuestion();
      toggleVisibilityGame(GAME_START);
      setButtonState(GAME_START);
      break;

    case "btn-quit":
      displayStats();
      toggleVisibilityGame(GAME_QUIT);
      setButtonState(GAME_QUIT);
      break;

    case "btn-show-answer":
      displayAnswer();
      toggleVisibilityGame(GAME_SHOW_ANSWER);
      setButtonState(GAME_SHOW_ANSWER);
      break;

    case "btn-correct":
      toggleVisibilityGame(GAME_ANSWER_CORRECT);
      updateProgressBar(GAME_ANSWER_CORRECT);
      setStatsLogic(GAME_ANSWER_CORRECT);
      displayStats();
      if (!isNormalMode) {
        removeMistake();
      }
      setIndexCurrentQuestion();
      if (countQuestions >= totalQuestions) break;
      displayQuestion();
      setButtonState(GAME_ANSWER_CORRECT);
      break;

    case "btn-wrong":
      toggleVisibilityGame(GAME_ANSWER_WRONG);
      updateProgressBar(GAME_ANSWER_WRONG);
      setStatsLogic(GAME_ANSWER_WRONG);
      displayStats();
      if (isNormalMode) {
        addMistake();
      }
      setIndexCurrentQuestion();
      if (countQuestions >= totalQuestions) break;
      displayQuestion();
      setButtonState(GAME_ANSWER_WRONG);
      break;

    case "btn-result":
      displayStatsEndScreen();
      if (hasMistakes()) {
        toggleVisibilityGame(GAME_RESULT_MISTAKES);
        setButtonState(GAME_RESULT_MISTAKES);
        break;
      }
      toggleVisibilityGame(GAME_RESULT);
      setButtonState(GAME_RESULT);
      break;
    case "btn-main-menu":
      toggleVisibilityGame(GAME_MAIN_MENU);
      setButtonState(GAME_MAIN_MENU);
      break;
    case "btn-practice-mistakes":
      isNormalMode = false;
      resetGameVariables();
      clearData();

      createMistakesData();
      displayStats();
      clearProgressBar();
      initializeProgressBar();
      displayQuestion();
      toggleVisibilityGame(GAME_START);
      setButtonState(GAME_START);

      break;
    default:
      console.log("no btn was clicked");
  }
}

header.addEventListener("click", (event) => {
  headerEventHandler(event);
});

main.addEventListener("click", (event) => {
  mainEventHandler(event);
});

initialize();

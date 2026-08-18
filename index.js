const main = document.getElementById("main");
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

let quizData = [];
let indexCurrentQuestion = 0;

const GAME_ANSWER_CORRECT = "correct";
const GAME_ANSWER_WRONG = "wrong";

const GAME_MAIN_MENU = "game_main_menu";
const GAME_START = "game_start";
const GAME_OVER = "game_over";
const GAME_QUIT = "game_quit";
const GAME_SHOW_ANSWER = "game_show_answer";

function initialize() {
  //console.log("inititalize()");
  spanTotalCurrent.textContent = countQuestions;
  spanTotalMax.textContent = totalQuestions;
  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;

  toggleVisibilityGame(GAME_MAIN_MENU);
  setButtonState(GAME_MAIN_MENU);
}

function resetGameStats() {
  //console.log("resetGameStats()");
  countQuestions = 0;
  countCorrect = 0;
  countWrong = 0;
}

function resetData() {
  //console.log("resetData()");
  quizData = [];
  indexCurrentQuestion = 0;
}

function resetGame() {
  //console.log("resetGame()");
  resetGameStats();
  resetData();
}

function createQuizData() {
  //console.log("createQuizData()");
  let index = 0;
  while (index < data.length && index < totalQuestions) {
    quizData.push(data[index]);
    index++;
  }
  //console.log(quizData);
}

function toggleVisibilityGame(state) {
  //console.log("toggleVisibilityGame(state):", state);
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
  //console.log("setButtonState(state):", state);
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
  //console.log(`${countQuestions}: ${countCorrect} ${countWrong}`);
  if (countQuestions >= totalQuestions) {
    toggleVisibilityGame(GAME_OVER);
    return;
  }
}

function updateStatsUI() {
  //console.log("updateStatsUI()");
  spanTotalCurrent.textContent = countQuestions;
  spanTotalMax.textContent = totalQuestions;

  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;
}

function displayQuestion() {
  containerQuestion.textContent = quizData[indexCurrentQuestion].question;
}

function setIndexCurrentQuestion() {
  if (indexCurrentQuestion < quizData.length - 1) {
    indexCurrentQuestion += 1;
  }
}

function mainEventHandler(event) {
  //console.log("mainEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  console.log(button);
  const btnId = button.id;
  console.log(btnId);
  switch (btnId) {
    case "btn-start":
      resetGame();
      createQuizData();
      displayQuestion();
      updateStatsUI();
      toggleVisibilityGame(GAME_START);
      setButtonState(GAME_START);
      break;

    case "btn-quit":
      updateStatsUI();
      toggleVisibilityGame(GAME_QUIT);
      setButtonState(GAME_QUIT);
      break;

    case "btn-show-answer":
      setIndexCurrentQuestion();
      toggleVisibilityGame(GAME_SHOW_ANSWER);
      break;

    case "btn-correct":
      toggleVisibilityGame(GAME_ANSWER_CORRECT);
      setStatsLogic(GAME_ANSWER_CORRECT);
      displayQuestion();
      updateStatsUI();
      break;

    case "btn-wrong":
      toggleVisibilityGame(GAME_ANSWER_WRONG);
      setStatsLogic(GAME_ANSWER_WRONG);
      displayQuestion();
      updateStatsUI();

      break;
    default:
      console.log("no btn was clicked");
  }
}

main.addEventListener("click", (event) => {
  mainEventHandler(event);
});

initialize();

const data = [
  {
    id: 1,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was ist Föderalismus?",
    answer:
      "Ein staatliches Organisationsprinzip, bei dem die Staatsgewalt zwischen Bund und Bundesländern aufgeteilt ist.",
  },
  {
    id: 2,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was ist das Grundgesetz?",
    answer:
      "Die Verfassung. Steht über allen anderen Gesetzen und regelt die Grundrechte der Bürger sowie die Staatsorganisation",
  },
  {
    id: 3,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: 'Erkäre den Begriff "öffentliches Recht".',
    answer:
      "Regelt die Rechtsbeziehung zwischen Staat u. Bürger im Verhältnis der Über- und Unterordnung. Beispiele: GewO, Strafrecht.",
  },
  {
    id: 4,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: 'Erkläre den Begriff "Privatrecht".',
    answer:
      "Regelt die Rechtsbeziehung zwischen Bürger u. Bürger im Verhältnis der Gleichordnung. Beispiel: BGB.",
  },
  {
    id: 5,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was sind die sogenannten Grundrechte?",
    answer:
      "Primär Abwehrrechte des Bürgers gegen den Staat, entfalten Drittwirkung auch für Bürger untereinander. Artikel 1-19 GG.",
  },
  {
    id: 5,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was sind die sogenannten Rechtsgüter?",
    answer:
      "Konkrete Werte und Güter, die die Rechtsordnung schützt. Leben , Gesundheit, Freiheit, Ehre, Eigentum...",
  },
];

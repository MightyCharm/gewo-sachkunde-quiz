// This program should be a helpful tool for people who want to work as
// security in germany. For that they need to pass a test from the
// IHK (Industrie- und Handelskammer). It contains a variety of topics
// to make sure people have the right tools for this kind of job.
const main = document.getElementById("main");
const btnStart = document.getElementById("btn-start");
const btnQuit = document.getElementById("btn-quit");
const btnShowAnswer = document.getElementById("btn-show-answer");
const btnCorrect = document.getElementById("btn-correct");
const btnWrong = document.getElementById("btn-wrong");
const btnResult = document.getElementById("btn-result");

const containerStartScreen = document.getElementById("container-start");
const containerEndScreen = document.getElementById("container-end");
const spanEndScreenTotalCurrent = document.getElementById(
  "end-screen-stat-total-current",
);
const spanEndScreenTotalMax = document.getElementById(
  "end-screen-stat-total-max",
);
const spanEndScreenCorrect = document.getElementById("end-screen-stat-correct");
const spanEndScreenWrong = document.getElementById("end-screen-stat-wrong");

const containerGameControl = document.querySelector(".container-game-control");
const containerStats = document.querySelector(".container-stats");

const containerQuestion = document.querySelector(".container-question");
const headerQuestionCategory = document.getElementById(
  "header-question-category",
);
const paraQuestion = document.getElementById("para-question");
const paraQuestionID = document.getElementById("id-question");

const containerAnswer = document.querySelector(".container-answer");
const containerShowAnswer = document.querySelector(".container-show-answer");
const containerCheck = document.querySelector(".container-check");

const spanTotalCurrent = document.getElementById("stat-total-current");
const spanTotalMax = document.getElementById("stat-total-max");
const spanCorrect = document.getElementById("stat-correct");
const spanWrong = document.getElementById("stat-wrong");

let countQuestions = 0;
let totalQuestions = undefined;

let countCorrect = 0;
let countWrong = 0;

let quizData = [];
let indexCurrentQuestion = 0;

const GAME_ANSWER_CORRECT = "correct";
const GAME_ANSWER_WRONG = "wrong";

const GAME_MAIN_MENU = "game_main_menu";
const GAME_START = "game_start";
const GAME_OVER = "game_over";
const GAME_RESULT = "game_result";
const GAME_QUIT = "game_quit";
const GAME_SHOW_ANSWER = "game_show_answer";

function initialize() {
  //console.log("inititalize()");
  toggleVisibilityGame(GAME_MAIN_MENU);
  setButtonState(GAME_MAIN_MENU);
}

function createQuizData() {
  //console.log("createQuizData()");
  quizData = [...testData]; // change this line for small/big dataset
  totalQuestions = quizData.length;

  for (let i = quizData.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const randomValue = quizData[randomIndex];
    const currentValue = quizData[i];
    quizData[randomIndex] = currentValue;
    quizData[i] = randomValue;
  }
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

function clearContainerAnswer() {
  //console.log("clearContainerAnswer()");
  containerAnswer.textContent = "";
}

function resetGame() {
  //console.log("resetGame()");
  resetGameStats();
  resetData();
}

function setButtonState(state) {
  console.log("setButtonState(state):", state);
  switch (state) {
    case GAME_MAIN_MENU:
      btnStart.disabled = false;
      break;
    case GAME_START:
      btnStart.disabled = true;
      btnQuit.disabled = false;
      break;
    case GAME_QUIT:
      btnStart.disabled = false;
      btnQuit.disabled = true;
      break;
    case GAME_OVER:
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

  if (countQuestions >= totalQuestions) {
    toggleVisibilityGame(GAME_OVER);
    return;
  }
}

function displayStats() {
  //console.log("displayStats()");
  spanTotalCurrent.textContent = countQuestions;
  spanTotalMax.textContent = totalQuestions;

  spanCorrect.textContent = countCorrect;
  spanWrong.textContent = countWrong;
}

function displayStatsEndScreen() {
  spanEndScreenTotalCurrent.textContent = countQuestions;
  spanEndScreenTotalMax.textContent = totalQuestions;
  spanEndScreenCorrect.textContent = countCorrect;
  spanEndScreenWrong.textContent = countWrong;
}

function displayQuestion() {
  //console.log("displayQuestion()");
  const currentQuestion = quizData[indexCurrentQuestion];
  headerQuestionCategory.textContent = currentQuestion.category;
  paraQuestion.textContent = currentQuestion.question;
  paraQuestionID.textContent = currentQuestion.id;
}

function displayAnswer() {
  //console.log(quizData[indexCurrentQuestion]);
  containerAnswer.textContent = quizData[indexCurrentQuestion].answer;
}

function setIndexCurrentQuestion() {
  //console.log("setIndexCurrentQuestion()");
  if (indexCurrentQuestion < quizData.length - 1) {
    indexCurrentQuestion += 1;
  }
}

function toggleVisibilityGame(state) {
  //console.log("toggleVisibilityGame(state):", state);
  switch (state) {
    case GAME_MAIN_MENU:
    case GAME_QUIT:
      containerStartScreen.classList.remove("hidden");
      containerEndScreen.classList.add("hidden");
      containerStats.classList.add("hidden");
      containerQuestion.classList.add("hidden");
      containerAnswer.classList.add("hidden");
      containerShowAnswer.classList.add("hidden");
      containerCheck.classList.add("hidden");
      break;
    case GAME_START:
      containerStartScreen.classList.add("hidden");
      containerGameControl.classList.remove("hidden");
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
      containerAnswer.classList.add("hidden"); //
      containerShowAnswer.classList.remove("hidden");
      containerCheck.classList.add("hidden");
      break;
    case GAME_OVER:
      containerGameControl.classList.add("hidden");
      containerQuestion.classList.add("hidden");
      containerAnswer.classList.add("hidden");
      containerShowAnswer.classList.add("hidden");
      // show container and remove gewusst/nicht gewusst buttons , show Ergebnis button instead
      containerCheck.classList.remove("hidden"); // show container again
      btnCorrect.classList.add("removed");
      btnWrong.classList.add("removed");
      btnResult.classList.remove("removed");
      break;
    case GAME_RESULT:
      containerStats.classList.add("hidden");
      containerCheck.classList.add("hidden");
      btnCorrect.classList.remove("removed");
      btnWrong.classList.remove("removed");
      btnResult.classList.add("removed");
      containerEndScreen.classList.remove("hidden");
      break;
    default:
      console.log("should not see me 1.");
  }
}

function mainEventHandler(event) {
  //console.log("mainEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  //console.log(button);
  const btnId = button.id;
  console.log(btnId);
  switch (btnId) {
    case "btn-start":
      resetGame();
      createQuizData();
      displayQuestion();
      displayStats();
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
      setIndexCurrentQuestion();
      toggleVisibilityGame(GAME_SHOW_ANSWER);
      break;

    case "btn-correct":
      toggleVisibilityGame(GAME_ANSWER_CORRECT);
      setStatsLogic(GAME_ANSWER_CORRECT);
      displayStats();
      clearContainerAnswer();
      if (countQuestions >= totalQuestions) break;
      displayQuestion();

      break;

    case "btn-wrong":
      toggleVisibilityGame(GAME_ANSWER_WRONG);
      setStatsLogic(GAME_ANSWER_WRONG);
      displayStats();
      clearContainerAnswer();
      if (countQuestions >= totalQuestions) break;
      displayQuestion();
      break;

    case "btn-result":
      console.log("here");
      setButtonState(GAME_OVER);
      toggleVisibilityGame(GAME_RESULT);
      displayStatsEndScreen();
      break;
    case "btn-main-menu":
      toggleVisibilityGame(GAME_MAIN_MENU);
      setButtonState(GAME_MAIN_MENU);
      break;
    default:
      console.log("no btn was clicked");
  }
}

main.addEventListener("click", (event) => {
  mainEventHandler(event);
});

initialize();
// 1. Recht der öffentlichen Sicherheit und Ordnung (Grundrechte, Polizeirecht, Staatsaufbau)
// 2. Gewerberecht (GewO, Bewachungsverodrnung)
// 3. BVürgerliches Gesetzbuch (BGB)
// 4. Strafrecht und Strafverfahrensrecht (StGB, StPO, Festnahmerechte)
// 5. Datenschutzrecht (DSGVO, BDSG)
// 6. Unfallverhütungsvorschriften (DGUV Vorschrift 23)
// 7. Umgang mit Waffen (WaffG, Schusswaffengebrauch)
// 8. Umgang mit Menschen (Deeskalatation, Kommunikation, Verhalten)
// 9. Grundzüge der Sicherheitstechnik (Zutrittskontrolle, Videoüberwachung)

const testData = [
  {
    id: 1,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was bedeutet Föderalismus?",
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
];

const data = [
  {
    id: 1,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was bedeutet Föderalismus?",
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
    id: 6,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was sind die sogenannten Rechtsgüter?",
    answer:
      "Konkrete Werte und Güter, die die Rechtsordnung schützt. Leben , Gesundheit, Freiheit, Ehre, Eigentum...",
  },
  {
    id: 7,
    category: "Bürgerliches Gesetzbuch",
    question: "§227 BGB ?",
    answer:
      "Notwehr. Notwehr ist diejenige Verteidigung, welche erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.",
  },
  {
    id: 8,
    category: "Bürgerliches Gesetzbuch",
    question: "§228 BGB ?",
    answer:
      "Verteidigungsnotstand(Defensivnotstand). Erlaubt die Beschädigung/Zerstörung einer fremden Sache, um eine von ihr ausgehenden Gefahr abzuwenden.",
  },
  {
    id: 9,
    category: "Bürgerliches Gesetzbuch",
    question: "§904 BGB ?",
    answer:
      "Angriffsnotstand. Erlaubt die Beschädigung einer Sache von der keine Gefahr ausgeht, um eine gegenwärtige Gefahr abzuwenden. Der drohende Schaden muss unverhältnismäßig größer sein als der verursachte Schaden.",
  },
  {
    id: 10,
    category: "Bürgerliches Gesetzbuch",
    question: "§229 BGB ?",
    answer:
      "Allgemeine Selbsthilfe. Erlaubt das Festnehmen eines fluchtverdächtigen zur Sicherung zivilrechtlicher Ansprüche wenn obrigkeitliche Hilfe nicht rechtzeitig verfügbar ist und sofortiges Eingreifen notwendig ist.",
  },
  {
    id: 11,
    category: "Bürgerliches Gesetzbuch",
    question: "§859 BGB ?",
    answer:
      "Selbsthilfe des Besitzers. Umfasst Besitzwehr (sich gegen eine verbotene Eigenmacht mit Gewalt wehren) und Besitzkehr (eine weggenommene Sache sofort mit Gewalt zurückzuholen).",
  },
  {
    id: 12,
    category: "Bürgerliches Gesetzbuch",
    question: "§823 BGB ?",
    answer:
      "Schadensersatzpflicht. Wer vorsätzlich oder fahrlässig das Rechtsgut eines anderen widerrechtlich verletzt ist zum Ersatz des entstanden Schadens verpflichtet.",
  },
  {
    id: 13,
    category: "Bürgerliches Gesetzbuch",
    question: "§253 BGB ?",
    answer:
      "Immaterieller Schaden (Schmerzensgeld). Geldentschädigung nur wenn Gesetz es bestimmt, wie bei Verletzungen von Körper, Freiheit oder sexueller Selbstbestimmung.",
  },
  {
    id: 14,
    category: "Bürgerliches Gesetzbuch",
    question: "§985 BGB ?",
    answer:
      "Herausgabeanspruch. Der Eigentümer kann von dem Besitzer die Herausgabe der Sache verlangen.",
  },
  {
    id: 15,
    category: "Bürgerliches Gesetzbuch",
    question: "§833 BGB",
    answer:
      "Tierhalterhaftung. Tierhalter muss grundsätzlich für Schäden die sein Tier anrichtet haften (Gefährdungshaftung), auch dann wenn er nicht schuldhaft gehandelt hat (Ausnahme: Nutztiere).",
  },
  {
    id: 16,
    category: "Bürgerliches Gesetzbuch",
    question: "Gliederung des BGB?",
    answer:
      "Aufgeteilt in 5 Bücher: 1) Allgemeiner Teil (enthält Grundregeln für das gesamte BGB), 2) Recht der Schuldverhältnisse, 3) Sachenrecht, 4) Familienrecht, 5) Erbrecht.",
  },
];

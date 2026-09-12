// This program should be a helpful tool for people who want to work as
// security in germany. For that they need to pass a test from the
// IHK (Industrie- und Handelskammer). It contains a variety of topics
// to make sure people have the right tools for this kind of job.
const header = document.getElementById("header");
const main = document.getElementById("main");
const btnStart = document.getElementById("btn-start");
const btnQuit = document.getElementById("btn-quit");
const btnShowAnswer = document.getElementById("btn-show-answer");
const btnCorrect = document.getElementById("btn-correct");
const btnWrong = document.getElementById("btn-wrong");
const btnResult = document.getElementById("btn-result");
const btnMenu = document.getElementById("btn-main-menu");

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

const containerGame = document.getElementById("container-game");
const containerMenuControl = document.querySelector(".card-menu-control");
const containerStats = document.querySelector(".card-stats");
const containerQuestion = document.querySelector(".card-question");
const headerQuestionCategory = document.getElementById(
  "header-question-category",
);
const paraQuestion = document.getElementById("para-question");
const paraQuestionID = document.getElementById("id-question");

const containerAnswer = document.querySelector(".card-answer");
const paraAnswer = document.getElementById("answer-para");

const containerGameControl = document.querySelector(".card-game-control");

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
  displayTheme(getThemeStorage());
}

function createQuizData() {
  console.log("createQuizData()");
  //quizData = [...data]; // change this line for small/big dataset
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

function resetGame() {
  //console.log("resetGame()");
  resetGameStats();
  resetData();
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
  paraAnswer.innerHTML = quizData[indexCurrentQuestion].answer;
}

function setIndexCurrentQuestion() {
  //console.log("setIndexCurrentQuestion()");
  if (indexCurrentQuestion < quizData.length - 1) {
    indexCurrentQuestion += 1;
  }
}

function toggleVisibilityGame(state) {
  console.log("toggleVisibilityGame(state):", state);
  containerStartScreen.classList.add("hidden");
  containerEndScreen.classList.add("hidden");
  containerGame.classList.add("hidden");
  containerMenuControl.classList.add("hidden");
  containerStats.classList.add("hidden");
  containerQuestion.classList.add("hidden");
  containerAnswer.classList.add("hidden");
  containerGameControl.classList.add("hidden");
  btnShowAnswer.classList.add("removed");
  btnCorrect.classList.add("removed");
  btnWrong.classList.add("removed");
  btnResult.classList.add("removed");
  switch (state) {
    case GAME_MAIN_MENU:
    case GAME_QUIT:
      containerStartScreen.classList.remove("hidden");
      break;
    case GAME_START:
      containerGame.classList.remove("hidden");
      containerMenuControl.classList.remove("hidden");
      containerStats.classList.remove("hidden");
      containerQuestion.classList.remove("hidden");
      containerGameControl.classList.remove("hidden");
      btnShowAnswer.classList.remove("removed");
      break;
    case GAME_SHOW_ANSWER:
      containerGame.classList.remove("hidden");
      containerMenuControl.classList.remove("hidden");
      containerStats.classList.remove("hidden");
      containerQuestion.classList.remove("hidden");
      containerAnswer.classList.remove("hidden");
      containerGameControl.classList.remove("hidden");
      btnCorrect.classList.remove("removed");
      btnWrong.classList.remove("removed");
      break;
    case GAME_ANSWER_CORRECT:
    case GAME_ANSWER_WRONG:
      containerGame.classList.remove("hidden");
      containerMenuControl.classList.remove("hidden");
      containerStats.classList.remove("hidden");
      containerQuestion.classList.remove("hidden");
      containerGameControl.classList.remove("hidden");
      btnShowAnswer.classList.remove("removed");
      break;
    case GAME_OVER:
      containerGame.classList.remove("hidden");
      containerStats.classList.remove("hidden");
      containerGameControl.classList.remove("hidden");
      btnResult.classList.remove("removed");
      break;
    case GAME_RESULT:
      containerEndScreen.classList.remove("hidden");
      break;
    default:
      console.log("should not see me 1.");
  }
}

function setButtonState(state) {
  console.log("setButtonState(state):", state);
  btnStart.disabled = true;
  btnQuit.disabled = true;
  btnShowAnswer.disabled = true;
  btnCorrect.disabled = true;
  btnWrong.disabled = true;
  btnResult.disabled = true;
  btnMenu.disabled = true;
  switch (state) {
    case GAME_MAIN_MENU:
      btnStart.disabled = false;
      break;
    case GAME_START:
      btnQuit.disabled = false;
      btnShowAnswer.disabled = false;
      break;
    case GAME_QUIT:
      btnStart.disabled = false;
      break;
    case GAME_SHOW_ANSWER:
      btnQuit.disabled = false;
      btnCorrect.disabled = false;
      btnWrong.disabled = false;
      break;
    case GAME_ANSWER_CORRECT:
    case GAME_ANSWER_WRONG:
      btnQuit.disabled = false;
      btnShowAnswer.disabled = false;
      break;
    case GAME_OVER:
      btnResult.disabled = false;
      break;
    case GAME_RESULT:
      btnMenu.disabled = false;
      break;
    default:
      console.log("Something went wrong. setButtonState()");
  }
}

function mainEventHandler(event) {
  console.log("mainEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  //console.log(button);
  const btnId = button.id;
  //console.log(btnId);
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
      setButtonState(GAME_SHOW_ANSWER);
      break;

    case "btn-correct":
      toggleVisibilityGame(GAME_ANSWER_CORRECT);
      setStatsLogic(GAME_ANSWER_CORRECT);
      displayStats();

      if (countQuestions >= totalQuestions) break;
      displayQuestion();
      setButtonState(GAME_ANSWER_CORRECT);
      break;

    case "btn-wrong":
      toggleVisibilityGame(GAME_ANSWER_WRONG);
      setStatsLogic(GAME_ANSWER_WRONG);
      displayStats();
      if (countQuestions >= totalQuestions) break;
      displayQuestion();
      setButtonState(GAME_ANSWER_WRONG);
      break;

    case "btn-result":
      //setButtonState(GAME_OVER);
      toggleVisibilityGame(GAME_RESULT);
      displayStatsEndScreen();
      setButtonState(GAME_RESULT);
      break;
    case "btn-main-menu":
      toggleVisibilityGame(GAME_MAIN_MENU);
      setButtonState(GAME_MAIN_MENU);
      break;
    default:
      console.log("no btn was clicked");
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
  console.log("currentTheme: ", currentTheme);

  const newTheme = currentTheme === "light" ? "dark" : "light";

  console.log("newTheme:", newTheme);
  setThemeStorage(newTheme);
  displayTheme(newTheme);
}

function headerEventHandler(event) {
  console.log("headerEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  const btnId = button.id;

  switch (btnId) {
    case "btn-theme":
      toggleTheme();
      break;
  }
}

header.addEventListener("click", (event) => {
  headerEventHandler(event);
});

main.addEventListener("click", (event) => {
  mainEventHandler(event);
});

initialize();

const testData = [
  {
    id: 16,
    category: "Bürgerliches Gesetzbuch",
    question: "Was besagt § 985 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Herausgabeanspruch</strong>. Der Eigentümer kann von dem Besitzer die Herausgabe der Sache verlangen.",
  },
  {
    id: 17,
    category: "Bürgerliches Gesetzbuch",
    question: "Wie ist das Bürgerliche Gesetzbuch (BGB) gegliedert?",
    answer:
      "Aufgeteilt in 5 Bücher:<br>1) <strong>Allgemeiner Teil</strong> (enthält Grundregeln für das gesamte BGB)<br>2) <strong>Recht der Schuldverhältnisse</strong><br>3) <strong>Sachenrecht</strong><br>4) <strong>Familienrecht</strong><br>5) <strong>Erbrecht</strong>",
  },
];

const data = [
  {
    id: 1,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was bedeutet Föderalismus?",
    answer:
      "Ein <strong>staatliches Organisationsprinzip</strong>, bei dem die Staatsgewalt zwischen Bund und Bundesländern aufgeteilt ist.",
  },
  {
    id: 2,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was ist das Grundgesetz?",
    answer:
      "<strong>Die Verfassung</strong>.<br>Sie steht über allen anderen Gesetzen und regelt die Grundrechte der Bürger sowie die Staatsorganisation.",
  },
  {
    id: 3,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: 'Erkläre den Begriff "öffentliches Recht".',
    answer:
      "Regelt die Rechtsbeziehung zwischen Staat u. Bürger im Verhältnis der Über- und Unterordnung.<br>Beispiele: <strong>Gewerbeordnung (GewO)</strong>, <strong>Strafrecht</strong>.",
  },
  {
    id: 4,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: 'Erkläre den Begriff "Privatrecht".',
    answer:
      "Regelt die Rechtsbeziehung zwischen Bürger und Bürger im Verhältnis der Gleichordnung.<br>Beispiel: <strong>Bürgerliches Gesetzbuch (BGB)</strong>.",
  },
  {
    id: 5,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was sind die sogenannten Grundrechte?",
    answer:
      "Primär Abwehrrechte des Bürgers gegen den Staat, entfalten Drittwirkung auch für Bürger untereinander. <strong>Art. 1-19 Grundgesetz (GG)</strong>.",
  },
  {
    id: 6,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: "Was sind die sogenannten Rechtsgüter?",
    answer:
      "Konkrete Werte und Güter, die die Rechtsordnung schützt.<br><strong>Leben</strong>, <strong>Gesundheit</strong>, <strong>Freiheit</strong>, <strong>Ehre</strong>, <strong>Eigentum</strong>, <strong>Vermögen</strong>, <strong>sexuelle Selbstbestimmung</strong>.",
  },
  {
    id: 7,
    category: "Bürgerliches Gesetzbuch",
    question: "Was besagt § 227 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Notwehr</strong>. Notwehr ist diejenige <strong>Verteidigung</strong>, welche <strong>erforderlich</strong> ist, um einen <strong>gegenwärtigen</strong> <strong>rechtswidrigen Angriff</strong> von sich oder einem anderen abzuwenden.",
  },
  {
    id: 8,
    category: "Bürgerliches Gesetzbuch",
    question: "Was beschreibt § 228 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Defensivnotstand</strong>. Erlaubt die Beschädigung oder Zerstörung einer fremden Sache, um eine von ihr ausgehende Gefahr abzuwenden, wenn die Beschädigung oder Zerstörung zur Abwendung der Gefahr erforderlich ist und der Schaden nicht außer Verhältnis zur Gefahr steht.",
  },
  {
    id: 9,
    category: "Bürgerliches Gesetzbuch",
    question: "Was definiert § 229 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Allgemeine Selbsthilfe</strong>.<br>Erlaubt das Festnehmen eines Fluchtverdächtigen zur Sicherung zivilrechtlicher Ansprüche, wenn obrigkeitliche Hilfe nicht rechtzeitig verfügbar ist und sofortiges Eingreifen notwendig ist.",
  },
  {
    id: 10,
    category: "Bürgerliches Gesetzbuch",
    question: "Was beschreibt § 253 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Immaterieller Schaden (Schmerzensgeld)</strong>.<br>Geldentschädigung nur, wenn das Gesetz es bestimmt, wie bei Verletzungen von Körper, Freiheit oder sexueller Selbstbestimmung.",
  },
  {
    id: 11,
    category: "Bürgerliches Gesetzbuch",
    question: "Was besagt § 823 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Schadensersatzpflicht</strong>.<br>Wer vorsätzlich oder fahrlässig das Rechtsgut eines anderen widerrechtlich verletzt, ist zum Ersatz des entstandenen Schadens verpflichtet.",
  },
  {
    id: 12,
    category: "Bürgerliches Gesetzbuch",
    question: "Was besagt § 833 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Haftung des Tierhalters</strong>.<br>Tierhalter muss grundsätzlich für Schäden, die sein Tier anrichtet, haften (Gefährdungshaftung), auch dann, wenn er nicht schuldhaft gehandelt hat (Ausnahme: Nutztiere).",
  },
  {
    id: 13,
    category: "Bürgerliches Gesetzbuch",
    question: "Was beschreibt § 859 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Selbsthilfe des Besitzers</strong>.<br>Umfasst Besitzwehr und Besitzkehr.<br><strong>Besitzwehr</strong>: sich gegen eine verbotene Eigenmacht mit Gewalt wehren<br><strong>Besitzkehr</strong>: eine weggenommene Sache sofort mit Gewalt zurückholen.",
  },
  {
    id: 14,
    category: "Bürgerliches Gesetzbuch",
    question: "Was besagt § 860 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Selbsthilfe des Besitzdieners</strong>.<br>Derjenige, welcher die tatsächliche Gewalt für den Besitzer ausübt, hat dieselben Rechte wie der Besitzer nach § 859 BGB. Umfasst <strong>Besitzwehr</strong>: sich gegen eine verbotene Eigenmacht mit Gewalt wehren<br><strong>Besitzkehr</strong>: eine weggenommene Sache sofort mit Gewalt zurückholen.",
  },
  {
    id: 15,
    category: "Bürgerliches Gesetzbuch",
    question: "Was definiert § 904 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Angriffsnotstand</strong>.<br>Erlaubt die Einwirkung auf eine Sache, von der keine Gefahr ausgeht, um eine gegenwärtige Gefahr abzuwenden. Der drohende Schaden muss unverhältnismäßig größer sein als der verursachte Schaden.",
  },
  {
    id: 16,
    category: "Bürgerliches Gesetzbuch",
    question: "Was besagt § 985 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Herausgabeanspruch</strong>. Der Eigentümer kann von dem Besitzer die Herausgabe der Sache verlangen.",
  },
  {
    id: 17,
    category: "Bürgerliches Gesetzbuch",
    question: "Wie ist das Bürgerliche Gesetzbuch (BGB) gegliedert?",
    answer:
      "Aufgeteilt in 5 Bücher:<br>1) <strong>Allgemeiner Teil</strong> (enthält Grundregeln für das gesamte BGB)<br>2) <strong>Recht der Schuldverhältnisse</strong><br>3) <strong>Sachenrecht</strong><br>4) <strong>Familienrecht</strong><br>5) <strong>Erbrecht</strong>",
  },
  {
    id: 18,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was besagt § 1 Strafgesetzbuch (StGB)?",
    answer:
      "Eine Tat kann nur bestraft werden, wenn die Strafbarkeit gesetzlich bestimmt war, bevor die Tat begangen wurde.",
  },
  {
    id: 19,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was definiert § 12 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Verbrechen und Vergehen</strong>.<br>Alle Straftaten im Strafgesetzbuch sind eingeteilt in Verbrechen und Vergehen.<br><strong>Verbrechen</strong>: mindestens 1 Jahr Freiheitsstrafe<br><strong>Vergehen</strong>: unter 1 Jahr Freiheitsstrafe oder Geldstrafe",
  },
  {
    id: 20,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was beschreibt § 13 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Begehen durch Unterlassen</strong>.<br>Regelt die <strong>unechten Unterlassungsdelikte</strong>.<br>Grundvoraussetzung: ich kann den Tatbestand verhindern, bin in einer Garantenstellung, und wenn nicht verhindert, kann mir das vorgeworfen werden, als ob ich die Tat selbst begangen hätte.",
  },
  {
    id: 21,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was besagt § 19 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Schuldunfähigkeit des Kindes</strong>.<br>Schuldunfähig ist, wer bei der Begehung der Tat noch nicht vierzehn Jahre alt ist.",
  },
  {
    id: 22,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was definiert § 20 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Schuldunfähigkeit wegen seelischer Störungen</strong>.<br> Krankhafte seelische Störung, tiefgreifende Bewusstseinsstörung, Intelligenzminderung, oder eine andere seelische Störung, die den Täter unfähig macht, das Unrecht der Tat einzusehen oder nach dieser Einsicht zu handeln.",
  },
  {
    id: 23,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was regelt § 32 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Notwehr</strong>. Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen (Nothilfe) abzuwenden.",
  },
  {
    id: 24,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was beschreibt § 34 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Rechtfertigender Notstand</strong>.<br>Bei gegenwärtiger Gefahr für ein Rechtsgut, die nicht anders abwendbar ist, nach Rechtsgüterabwägung und Angemessenheit.",
  },
  {
    id: 25,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was regelt § 127 (1) Strafprozessordnung (StPO)?",
    answer:
      "<strong>Vorläufige Festnahme</strong>.<br>Wird jemand auf frischer Tat betroffen oder verfolgt, so ist, wenn er der Flucht verdächtigt ist oder seine Identität nicht sofort festgestellt werden kann, jedermann befugt, ihn auch ohne richterliche Anordnung vorläufig festzunehmen.",
  },
  {
    id: 26,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was ist die Aufgabe des Strafrechts?",
    answer:
      "Als <strong>Teil des öffentlichen Rechts</strong> hat es die Aufgabe, schutzbedürftige <strong>Rechtsgüter</strong> des Einzelnen sowie der Allgemeinheit vor Bedrohung und Verletzung zu <strong>schützen</strong>.",
  },
  {
    id: 27,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was sind die fünf Funktionen des Strafrechts?",
    answer:
      "1) <strong>Vergeltungstheorie</strong>: Ausgleich für das Unrecht der Tat<br>2) <strong>Generalprävention</strong>: Abschreckung der Allgemeinheit<br>3) <strong>Spezialprävention</strong>: Abschreckung des Täters<br>4) <strong>Resozialisierung</strong>: Wiedereingliederung des Täters<br>5) <strong>Rechtsfrieden</strong>: Aufrechterhaltung der Rechtsordnung",
  },
  {
    id: 28,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie heißen die Hauptgesetzwerke des Strafrechts?",
    answer:
      "<strong>Strafgesetzbuch</strong> (StGB)<br><strong>Strafprozessordnung</strong> (StPO)",
  },
  {
    id: 29,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was beinhaltet das Nebenstrafrecht?",
    answer:
      "Hier sind weitere strafbare Handlungen und die jeweiligen Rechtsfolgen geregelt.<br><strong>Gewerbeordnung</strong> (GewO)<br><strong>Bundesdatenschutzgesetz</strong> (BDSG)<br><strong>Betäubungsmittelgesetz</strong> (BtMG)<br><strong>Waffengesetz</strong> (WaffG)",
  },
  {
    id: 30,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was ist das materielle Strafrecht?",
    answer:
      "Es umfasst das <strong>Strafgesetzbuch</strong> (StGB) und alle <strong>nebenstrafrechtlichen Vorschriften</strong>.<br>Es regelt die Tatbestände einer strafbaren Handlung und die Rechtsfolgen für diese Tat, Freiheitsstrafe oder Geldstrafe.",
  },
  {
    id: 31,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was ist das formelle Strafrecht?",
    answer:
      "1) <strong>Strafprozessordnung</strong> (StPO)<br>2) Alles an Rechtsvorschriften, welche den Ablauf des Strafverfahrens insgesamt regeln, von der Ermittlung bis zur Vollstreckung der Strafe",
  },
  {
    id: 32,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie ist das Strafgesetzbuch (StGB) gegliedert?",
    answer:
      "<strong>Allgemeiner Teil</strong> §§ 1 - 79b StGB: enthält grundsätzliches zum Strafgesetzbuch, Geltungsbereich, Begriffsdefinitionen, Rechtfertigungsgründe<br><strong>Besonderer Teil</strong> §§ 80 - 358 StGB: enthält Katalog der einzelnen Straftaten",
  },
  {
    id: 33,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was beinhaltet der dreistufige Deliktsaufbau?",
    answer:
      "1) <strong>Tatbestand</strong>: Tat entspricht den Tatbestandsmerkmalen des Gesetzes<br>2) <strong>Rechtswidrigkeit</strong>: Kein Rechtfertigungsgrund<br>3) <strong>Schuld</strong>: Schuldfähig, vorsätzlich/fahrlässig, Unrechtseinsicht, kein Entschuldigungsgrund",
  },
  {
    id: 34,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie wird ein Antragsdelikt definiert?",
    answer:
      "<strong>Absolute Antragsdelikte</strong>: Straftaten, die nur auf Antrag eines Antragsberechtigten (Opfer) verfolgt werden können<br><strong>Relative Antragsdelikte</strong>: Straftaten, die grundsätzlich nur auf Antrag des Geschädigten verfolgt werden, aber falls ein öffentliches Interesse vorliegt, auch von der Staatsanwaltschaft",
  },
  {
    id: 35,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie wird ein Offizialdelikt definiert?",
    answer:
      "Eine Straftat, die von Amts wegen verfolgt wird. Alle Straftaten im Strafgesetzbuch, außer jene, in denen im Strafgesetzbuch explizit erwähnt wird, dass die Tat nur auf Antrag verfolgt wird, sind Offizialdelikte.",
  },
  {
    id: 36,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie wird ein Privatklagedelikt definiert?",
    answer:
      "Eine Straftat, die bei fehlendem öffentlichen Interesse vom Geschädigten selbst als Privatperson anstelle der Staatsanwaltschaft verfolgt werden kann.",
  },
  {
    id: 37,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was bedeutet die sogenannte Garantenpflicht?",
    answer:
      "Die rechtliche Verpflichtung einer Person (Garant), aufgrund einer besonderen Stellung dafür einzustehen, dass ein bestimmter tatbestandlicher Erfolg nicht eintritt.<br>1) <strong>Gesetz</strong><br>2) <strong>Lebensgemeinschaft</strong><br>3) <strong>Gefahrengemeinschaft</strong><br>4) <strong>Pflichtenübernahme</strong><br>5) <strong>Herbeiführen von Gefahren</strong>",
  },
  {
    id: 38,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Definiere Vorsätzliches Handeln.",
    answer:
      "Der Täter handelt mit Wissen und Wollen, der Täter weiß, dass er einen Tatbestand oder eine Straftat eines Gesetzes erfüllt und will den Tatbestandserfolg.",
  },
  {
    id: 39,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Definiere fahrlässiges Handeln.",
    answer:
      "Der Täter handelt nicht mit Wissen und Wollen, sondern verletzt die im Verkehr erforderliche Sorgfalt, obwohl die Pflichtverletzung für ihn vorhersehbar und der Erfolg vermeidbar war.",
  },
  {
    id: 40,
    category: "Umgang mit Menschen",
    question: "Erläutere den Begriff Psychologie.",
    answer:
      "Die Wissenschaft vom menschlichen Erleben und Verhalten. Überprüfbar, begründet und objektiv.<br><strong>Erleben</strong> ist das, was in unserem Gehirn und zentralen Nervensystem stattfindet und von außen nicht unmittelbar beobachtet werden kann.<br><strong>Verhalten</strong> setzt sich zusammen aus körperlichen Reaktionen und Aktivitäten, die beobachtet und gemessen werden können.",
  },
  {
    id: 41,
    category: "Umgang mit Menschen",
    question: "Erläutere den Begriff Menschenkenntnis.",
    answer:
      "Die <strong>Fähigkeit</strong> eines Menschen, andere Menschen richtig einzuschätzen und mit ihnen geschickt umzugehen. <strong>Subjektiv</strong>, beruht auf <strong>Erfahrung</strong>, <strong>Intuition</strong>, <strong>Intelligenz</strong> und <strong>Weisheit</strong>.",
  },
  {
    id: 42,
    category: "Umgang mit Menschen",
    question:
      "Was für Charaktereigenschaften sind besonders wichtig für Sicherheitskräfte?",
    answer:
      "Zuverlässigkeit, Integrität (Rechtschaffenheit), Menschenkenntnis, positives Selbstwertgefühl, Empathie, soziale Intelligenz, Kommunikationsfähigkeit.",
  },
  {
    id: 43,
    category: "Umgang mit Menschen",
    question: "Was sind Motive und woraus entstehen sie?",
    answer:
      "Es handelt sich um Beweggründe menschlichen Handelns. Sie entspringen den menschlichen Bedürfnissen.<br><strong>Primäre Motive</strong> (angeboren): Hunger, Durst, Schlaf<br><strong>Sekundäre Motive</strong> (erlernt): Leistung, Machtstreben, Rauchen",
  },
  {
    id: 44,
    category: "Umgang mit Menschen",
    question:
      "Erkläre das Schichtmodell des Menschen nach Platon und Aristoteles.",
    answer:
      "Der Mensch wird in drei Schichten, <strong>Trieb</strong>, <strong>Gefühl</strong> und <strong>Vernunft</strong>, aufgeteilt.<br><strong>Triebschicht</strong>: Selbsterhaltung, Arterhaltung<br><strong>Gefühlsschicht</strong>: Wut, Hass, Liebe, Zuneigung<br><strong>Vernunftschicht</strong>: rationales Denken.<br>Der Mensch reagiert grundsätzlich aus allen drei Schichten, außer in Extremsituationen, dann nur aus einer Schicht heraus.",
  },
  {
    id: 45,
    category: "Umgang mit Menschen",
    question: "Erkläre die sogenannte Bedürfnispyramide nach Maslow.",
    answer:
      "Hierarchische Einteilung menschlicher Bedürfnisse. Erst wenn die unteren Stufen erfüllt sind, drängen sich die oberen auf.<br>1) <strong>Grundbedürfnisse</strong>: Hunger, Durst, Atmen...<br>2) <strong>Sicherheitsbedürfnis</strong>: materielle und eigene Sicherheit<br>3) <strong>Soziale Bedürfnisse</strong>: Familie, Freundschaft, Liebe<br>4) <strong>Ich-Bedürfnisse</strong>: Anerkennung<br>5) <strong>Selbstverwirklichung</strong>: frei leben und seiner Berufung folgen<br><strong>Defizitbedürfnisse</strong>: Stufen 1-4, stillbar<br><strong>Wachstumsbedürfnisse</strong>: Stufe 5, kann nicht gestillt werden.",
  },
  {
    id: 46,
    category: "Umgang mit Menschen",
    question: "Definiere den Begriff Selbstwertgefühl.",
    answer:
      "Selbstwertgefühl ist das Ergebnis einer Selbstbewertung. Ein positives ist wichtig, denn nur so kann eine angemessene Kommunikations- und Konfliktfähigkeit hervorgehen. Ein angegriffenes Selbstwertgefühl ist Hauptgrund für Konflikte.",
  },
  {
    id: 47,
    category: "Umgang mit Menschen",
    question: "Definiere die Transaktionsanalyse nach Eric Berne.",
    answer:
      'Einteilung der Kommunikation in vier Grundhaltungen.<br>1) Ich bin ok - Du bist okay = <strong>Menschlichkeit</strong>, einzige Position für eine gute Kommunikation<br>2) Ich bin ok - Du bist nicht ok = <strong>Überheblichkeit</strong><br>3) Ich bin nicht ok - Du bist ok = <strong>Minderwertigkeit</strong><br>4) Ich bin nicht ok - Du bist nicht ok = <strong>Hoffnungslosigkeit</strong><br>"ok" bezieht sich immer auf die Person, nie das Verhalten. Man kann das Verhalten einer Person kritisieren, ohne sie als Person abzuwerten.',
  },
  {
    id: 48,
    category: "Umgang mit Menschen",
    question: "Was versteht man unter einem Minderwertigkeitsgefühl?",
    answer:
      "Es ist das Ergebnis einer <strong>negativen Selbstbewertung</strong>. Mögliche Ursachen können zum Beispiel eine <strong>negative frühkindliche Prägung</strong> (bis zum dritten Lebensjahr), <strong>Misserfolgserlebnisse</strong>, <strong>Enttäuschungen</strong> und <strong>Frustrationen</strong>, <strong>körperliche Einschränkungen</strong>, <strong>Langzeitarbeitslosigkeit</strong> sein.",
  },
  {
    id: 49,
    category: "Umgang mit Menschen",
    question: "Was versteht man unter einem Überwertigkeitsgefühl?",
    answer:
      "Es entsteht aus einem vorliegenden Minderwertigkeitsgefühl. Man versucht durch eine überstarke Anstrengung in einem bestimmten Bereich seines Lebens, allen anderen überlegen zu sein, um dieses Minderwertigkeitsgefühl zu kompensieren.",
  },
  {
    id: 50,
    category: "Umgang mit Menschen",
    question: "Welche 5 Aussagen lassen sich zum Selbstwertgefühl machen?",
    answer:
      "1) Man vergleicht sich mit anderen Menschen<br>2) Beurteilung durch andere Menschen<br>3) Durch Kommunikation mit anderen entsteht diese Beurteilung<br>4) Ein Angriff auf das Selbstwertgefühl beeinflusst die Kommunikation immer negativ<br>5) Es ist ein wichtiges Bedürfnis",
  },
  {
    id: 51,
    category: "Umgang mit Menschen",
    question: "Was versteht man unter Wahrnehmung?",
    answer:
      "Informationen, die durch unsere Sinnesorgane wahrgenommen werden (sehen, riechen, hören, schmecken, tasten).",
  },
  {
    id: 52,
    category: "Umgang mit Menschen",
    question: "Was versteht man unter selektiver Wahrnehmung?",
    answer:
      "Nur ein Bruchteil der Informationen, die wir wahrnehmen, kommt bei uns im Bewusstsein an. Was unser Gehirn herausfiltert, ist individuell und selektiv. Das Unterbewusstsein nimmt 5-mal so viele Informationen wahr.",
  },
  {
    id: 53,
    category: "Umgang mit Menschen",
    question: 'Erkläre den Begriff "Erster Eindruck".',
    answer:
      "Zählt zu den Wahrnehmungs- und Beurteilungsfehlern.<br>Wahrnehmung und Beurteilung findet in den ersten Sekunden statt.<br> Mehr unterbewusst als bewusst, durch Beobachtung, meistens Registrierung der Körpersprache.<br>Danach findet ein unterbewusster Vergleich mit Erfahrungen, Vorurteilen und Stereotypen statt.",
  },
  {
    id: 54,
    category: "Umgang mit Menschen",
    question: 'Was ist der sogenannte \"Halo Effekt\"?',
    answer:
      "Auch <strong>Überstrahlungseffekt</strong>, zählt zu den Wahrnehmungs- und Beurteilungsfehlern.<br>Ein einzelnes Merkmal einer Person (z.B. Aussehen, Auftreten) überstrahlt alles andere, sodass die Gesamtbewertung verzerrt wird.",
  },
  {
    id: 55,
    category: "Umgang mit Menschen",
    question: 'Was ist der sogenannte "Hierarchieeffekt"?',
    answer:
      "Man traut Menschen, die in der Hierarchie weiter oben stehen, mehr Kompetenzen zu als Menschen, die sich weiter unten befinden.",
  },
  {
    id: 56,
    category: "Umgang mit Menschen",
    question: "Was sind Vorurteile?",
    answer:
      "Übernahme von Einstellungen ohne ausreichende Erfahrung oder eine falsche Verallgemeinerung. Negative Einstellungen gegenüber Menschen oder Gruppen, die meistens durch Feindseligkeit oder Stereotypen verankert sind. Beeinflussen unsere Wahrnehmung erheblich.",
  },
  {
    id: 57,
    category: "Umgang mit Menschen",
    question: "Was sind Stereotypen?",
    answer: "Falsche Verallgemeinerungen, die nicht immer negativ sein müssen.",
  },
  {
    id: 58,
    category: "Umgang mit Menschen",
    question: "Beschreibe das JOHARI-Fenster.",
    answer:
      "Ein Modell, das besagt, umso deckungsgleicher Selbstbild und Fremdbild, umso besser ist die Kommunikation. Es beschreibt 4 Felder.<br><strong>Öffentliche Person</strong>: mir bekannt / anderen bekannt<br><strong>Mein Geheimnis</strong>: mir bekannt / anderen nicht bekannt<br><strong>Blinder Fleck</strong>: mir unbekannt / anderen bekannt<br><strong>Unbekannt</strong>: mir unbekannt / anderen unbekannt<br>Umso kleiner der Blinde Fleck, umso besser ist die Kommunikation. Hier sind wir jedoch auf das Feedback von anderen angewiesen.",
  },
];
// 1. Recht der öffentlichen Sicherheit und Ordnung (Grundrechte, Polizeirecht, Staatsaufbau)
// 2. Gewerberecht (GewO, Bewachungsverodrnung)
// 3. Bürgerliches Gesetzbuch (BGB)
// 4. Strafrecht und Strafverfahrensrecht (StGB, StPO, Festnahmerechte)
// 5. Datenschutzrecht (DSGVO, BDSG)
// 6. Unfallverhütungsvorschriften (DGUV Vorschrift 23)
// 7. Umgang mit Waffen (WaffG, Schusswaffengebrauch)
// 8. Umgang mit Menschen (Deeskalatation, Kommunikation, Verhalten)
// 9. Grundzüge der Sicherheitstechnik (Zutrittskontrolle, Videoüberwachung)

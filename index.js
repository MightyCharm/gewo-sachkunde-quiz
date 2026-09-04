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

const containerGameControl = document.querySelector(".container-game-control");
const containerStats = document.querySelector(".container-stats");

const containerQuestion = document.querySelector(".container-question");
const headerQuestionCategory = document.getElementById(
  "header-question-category",
);
const paraQuestion = document.getElementById("para-question");
const paraQuestionID = document.getElementById("id-question");

const containerAnswer = document.querySelector(".container-answer");
const paraAnswer = document.getElementById("answer-para");
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
  quizData = [...data]; // change this line for small/big dataset
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

function setButtonState(state) {
  console.log("setButtonState(state):", state, "<----------------------");
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
  //console.log("toggleVisibilityGame(state):", state);
  switch (state) {
    case GAME_MAIN_MENU:
    case GAME_QUIT:
      containerStartScreen.classList.remove("hidden");
      containerGameControl.classList.add("hidden");
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
  console.log("mainEventHandler()");
  const button = event.target.closest("button");
  if (!button) return;
  console.log(button);
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

main.addEventListener("click", (event) => {
  mainEventHandler(event);
});

initialize();
// 1. Recht der öffentlichen Sicherheit und Ordnung (Grundrechte, Polizeirecht, Staatsaufbau)
// 2. Gewerberecht (GewO, Bewachungsverodrnung)
// 3. Bürgerliches Gesetzbuch (BGB)
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
      "<strong>Die Verfassung</strong>. Sie steht über allen anderen Gesetzen und regelt die Grundrechte der Bürger sowie die Staatsorganisation.",
  },
  {
    id: 3,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: 'Erkäre den Begriff "öffentliches Recht".',
    answer:
      "Regelt die Rechtsbeziehung zwischen Staat u. Bürger im Verhältnis der Über- und Unterordnung.<br>Beispiele: <strong>Gewerbeordnung (GewO)</strong>, <strong>Strafrecht</strong>.",
  },
  {
    id: 4,
    category: "Recht der öffentlichen Sicherheit und Ordnung",
    question: 'Erkläre den Begriff "Privatrecht".',
    answer:
      "Regelt die Rechtsbeziehung zwischen Bürger u. Bürger im Verhältnis der Gleichordnung.<br>Beispiel: <strong>Bürgerliches Gesetzbuch (BGB)</strong>.",
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
      "Konkrete Werte und Güter, die die Rechtsordnung schützt. <strong>Leben</strong>, <strong>Gesundheit</strong>, <strong>Freiheit</strong>, <strong>Ehre</strong>, <strong>Eigentum</strong>...",
  },
  {
    id: 7,
    category: "Bürgerliches Gesetzbuch",
    question: "§227 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Notwehr</strong>. Notwehr ist diejenige Verteidigung, welche <strong>erforderlich</strong> ist, um einen <strong>gegenwärtigen</strong> <strong>rechtswidrigen Angriff</strong> von sich oder einem anderen abzuwenden.",
  },
  {
    id: 8,
    category: "Bürgerliches Gesetzbuch",
    question: "§228 Bürgerliches Gesetzbuch  (BGB)?",
    answer:
      "<strong>Verteidigungsnotstand (Defensivnotstand)</strong>. Erlaubt die Beschädigung/Zerstörung einer fremden Sache, um eine von ihr ausgehende Gefahr abzuwenden.",
  },
  {
    id: 9,
    category: "Bürgerliches Gesetzbuch",
    question: "§904 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Angriffsnotstand</strong>. Erlaubt die Beschädigung einer Sache von der keine Gefahr ausgeht, um eine gegenwärtige Gefahr abzuwenden. Der drohende Schaden muss unverhältnismäßig größer sein als der verursachte Schaden.",
  },
  {
    id: 10,
    category: "Bürgerliches Gesetzbuch",
    question: "§229 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Allgemeine Selbsthilfe</strong>. Erlaubt das Festnehmen eines Fluchtverdächtigen zur Sicherung zivilrechtlicher Ansprüche, wenn obrigkeitliche Hilfe nicht rechtzeitig verfügbar ist und sofortiges Eingreifen notwendig ist.",
  },
  {
    id: 11,
    category: "Bürgerliches Gesetzbuch",
    question: "§859 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Selbsthilfe des Besitzers</strong>. Umfasst <strong>Besitzwehr</strong>: sich gegen eine verbotene Eigenmacht mit Gewalt wehren<br><strong>Besitzkehr</strong>: eine weggenommene Sache sofort mit Gewalt zurückholen.",
  },
  {
    id: 12,
    category: "Bürgerliches Gesetzbuch",
    question: "§823 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Schadensersatzpflicht</strong>. Wer vorsätzlich oder fahrlässig das Rechtsgut eines anderen widerrechtlich verletzt, ist zum Ersatz des entstandenen Schadens verpflichtet.",
  },
  {
    id: 13,
    category: "Bürgerliches Gesetzbuch",
    question: "§253 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Immaterieller Schaden (Schmerzensgeld)</strong>. Geldentschädigung nur, wenn das Gesetz es bestimmt, wie bei Verletzungen von Körper, Freiheit oder sexueller Selbstbestimmung.",
  },
  {
    id: 14,
    category: "Bürgerliches Gesetzbuch",
    question: "§985 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Herausgabeanspruch</strong>. Der Eigentümer kann von dem Besitzer die Herausgabe der Sache verlangen.",
  },
  {
    id: 15,
    category: "Bürgerliches Gesetzbuch",
    question: "§833 Bürgerliches Gesetzbuch (BGB)?",
    answer:
      "<strong>Haftung des Tierhalters</strong>. Tierhalter muss grundsätzlich für Schäden, die sein Tier anrichtet, haften (Gefährdungshaftung), auch dann, wenn er nicht schuldhaft gehandelt hat (Ausnahme: Nutztiere).",
  },
  {
    id: 16,
    category: "Bürgerliches Gesetzbuch",
    question: "Wie ist das Bürgerliche Gesetzbuch (BGB) gegliedert?",
    answer:
      "Aufgeteilt in 5 Bücher:<br>1) <strong>Allgemeiner Teil</strong> (enthält Grundregeln für das gesamte BGB)<br>2) <strong>Recht der Schuldverhältnisse</strong><br>3) <strong>Sachenrecht</strong><br>4) <strong>Familienrecht</strong><br>5) <strong>Erbrecht</strong>",
  },
  {
    id: 17,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was ist die Aufgabe des Strafrechts?",
    answer:
      "Als Teil des öffentlichen Rechts hat es die Aufgabe, schutzbedürftige Rechtsgüter des Einzelnen sowie der Allgemeinheit vor Bedrohung und Verletzung zu schützen.",
  },
  {
    id: 18,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was sind die fünf Funktionen des Strafrechts?",
    answer:
      "1) <strong>Vergeltungstheorie</strong>: Ausgleich für das Unrecht der Tat<br>2) <strong>Generalprävention</strong>: Abschreckung der Allgemeinheit<br>3) <strong>Spezialprävention</strong>: Abschreckung des Täters<br>4) <strong>Resozialisierung</strong>: Wiedereingliederung des Täters<br>5) <strong>Rechtsfrieden</strong>: Aufrechterhaltung der Rechtsordnung",
  },
  {
    id: 19,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie heißen die Hauptgesetzwerke des Strafrechts?",
    answer:
      "1)<strong>Strafgesetzbuch</strong> (StGB)<br>2) <strong>Strafprozessordnung</strong> (StPO)",
  },
  {
    id: 20,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was beinhaltet das Nebenstrafrecht?",
    answer:
      "Hier sind weitere strafbare Handlungen und die jeweiligen Rechtsfolgen geregelt.<br>1) <strong>Gewerbeordnung</strong> (GewO)<br>2) <strong>Bundesdatenschutzgesetz</strong> (BDSG)<br>3) <strong>Betäubungsmittelgesetz</strong> (BtMG)<br>4) <strong>Waffengesetz</strong> (WaffG)",
  },
  {
    id: 21,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was ist das materielle Strafrecht?",
    answer:
      "1) Es umfasst das <strong>Strafgesetzbuch</strong> (StGB) und alle <strong>nebenstrafrechtlichen Vorschriften</strong><br>2) Es regelt die Tatbestände einer strafbaren Handlung und die Rechtsfolgen für diese Tat, Freiheitsstrafe oder Geldstrafe",
  },
  {
    id: 22,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was ist das formelle Strafrecht?",
    answer:
      "1) <strong>Strafprozessordnung</strong> (StPO)<br>2) Alles an Rechtsvorschriften, welche den Ablauf des Strafverfahrens insgesamt regeln, von der Ermittlung bis zur Vollstreckung der Strafe",
  },
  {
    id: 23,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie ist das Strafgesetzbuch (StGB) gegliedert?",
    answer:
      "1) <strong>Allgemeiner Teil</strong> §§ 1 - 79b StGB: enthält grundsätzliches zum Strafgesetzbuch, Geltungsbereich, Begriffsdefinitionen, Rechtfertigungsgründe<br>2) <strong>Besonderer Teil</strong> §§ 80 - 358 StGB: enthält Katalog der einzelnen Straftaten",
  },
  {
    id: 24,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "§ 1 Strafgesetzbuch (StGB)?",
    answer:
      "Eine Tat kann nur bestraft werden, wenn die Strafbarkeit gesetzlich bestimmt war, bevor die Tat begangen wurde.",
  },
  {
    id: 25,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was beinhaltet der dreistufige Deliktsaufbau?",
    answer:
      "1) <strong>Tatbestand</strong>: Tat entspricht den Tatbestandsmerkmalen des Gesetzes<br>2) <strong>Rechtswidrigkeit</strong>: Kein Rechtfertigungsgrund<br>3) <strong>Schuld</strong>: Schuldfähig, vorsätzlich/fahrlässig, Unrechtseinsicht, kein Entschuldigungsgrund",
  },
  {
    id: 26,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "§12 Strafgesetzbuch (StGB) Verbrechen und Vergehen?",
    answer:
      "Alle Straftaten im Strafgesetzbuch sind eingeteilt in Verbrechen und Vergehen.<br>1) <strong>Verbrechen</strong>: mindestens 1 Jahr Freiheitsstrafe<br>2) <strong>Vergehen</strong>: unter 1 Jahr Freiheitsstrafe oder Geldstrafe.",
  },
  {
    id: 27,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie wird ein Antragsdelikt definiert?",
    answer:
      "1) <strong>Absolute Antragsdelikte</strong>: Straftaten, die nur auf Antrag eines Antragsberechtigten (Opfer) verfolgt werden können<br>2) <strong>Relative Antragsdelikte</strong>: Straftaten, die grundsätzlich nur auf Antrag des Geschädigten verfolgt werden, aber falls ein öffentliches Interesse vorliegt, auch von der Staatsanwaltschaft",
  },
  {
    id: 28,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie wird ein Offizialdelikt definiert?",
    answer:
      "Eine Straftat, die von Amts wegen verfolgt wird. Alle Straftaten im Strafgesetzbuch, außer jene, in denen im Strafgesetzbuch explizit erwähnt wird, dass die Tat nur auf Antrag verfolgt wird, sind Offizialdelikte.",
  },
  {
    id: 29,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Wie wird ein Privatklagedelikt definiert?",
    answer:
      "Eine Straftat, die bei fehlendem öffentlichen Interesse vom Geschädigten selbst als Privatperson anstelle der Staatsanwaltschaft verfolgt werden kann.",
  },
  {
    id: 30,
    category: "Strafrecht und Strafverfahrensrecht",
    question:
      "Was beschreibt § 13 Strafgesetzbuch (StGB) Begehen durch Unterlassen?",
    answer:
      "Regelt die unechten Unterlassungsdelikte.<br>Grundvoraussetzung: ich kann den Tatbestand verhindern, bin in einer Garantenstellung, und wenn nicht verhindert, kann mir das vorgeworfen werden als ob ich selbst die Tat begangen hätte.",
  },
  {
    id: 31,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Was bedeutet die sogenannte Garantenpflicht?",
    answer:
      "Die rechtliche Verpflichtung einer Person (Garant), aufgrund einer besonderen Stellung dafür einzustehen, dass ein bestimmter tatbestandlicher Erfolg nicht eintritt.<br>1) <strong>Gesetz</strong><br>2) <strong>Lebensgemeinschaft</strong><br>3) <strong>Gefahrengemeinschaft</strong><br>4) <strong>Pflichtenübernahme</strong><br>5) <strong>Herbeiführen von Gefahren</strong>",
  },
  {
    id: 32,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Definiere Vorsätzliches Handeln.",
    answer:
      "Der Täter handelt mit Wissen und Wollen, der Täter weiß, dass er einen Tatbestand oder eine Straftat eines Gesetzes erfüllt und will den Tatbestandserfolg",
  },
  {
    id: 33,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "Definiere fahrlässiges Handeln.",
    answer:
      "Der Täter handelt nicht mit Wissen und Wollen, sondern verletzt die im Verkehr erforderliche Sorgfalt, obwohl die Pflichtverletzung für ihn vorhersehbar und der Erfolg vermeidbar war.",
  },
  {
    id: 34,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "§ 19 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Schuldunfähigkeit des Kindes</strong>. Schuldunfähig ist, wer bei der Begehung der Tat noch nicht vierzehn Jahre alt ist.",
  },
  {
    id: 35,
    category: "Strafrecht und Strafverfahrensrecht",
    question: "§ 20 Strafgesetzbuch (StGB)?",
    answer:
      "<strong>Schuldunfähigkeit wegen seelischer Störungen</strong>. Krankhafte seelische Störung, tiefgreifende Bewusstseinsstörung, Intelligenzminderung, oder eine andere seelische Störung, die den Täter unfähig macht, das Unrecht der Tat einzusehen oder nach dieser Einsicht zu handeln.",
  },
];

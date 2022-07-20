// Questions
const questions = [
  {
    question: "A string must be contained in what?",
    choices: ["A) Parentheses", "B) Quotes", "C) Brackets", "D) Nothing"],
    answer: "B) Quotes"
  },
  {
    question: "CSS is linked to HTML using what tag?",
    choices: ["A) <css>", "B) <script>", "C) <insert>", "D) <link>"],
    answer: "D) <link>"
  },
  {
    question: "JavaScript is linked to HTML using what tag?",
    choices: ["A) <js>", "B) <script>", "C) <insert>", "D) <link>"],
    answer: "B) <script>"
  },
  {
    question: "What is HTML responsible for in a web application?",
    choices: ["A) The markup of the page.", "B) The style of the page.", "C) The functionality of the page.", "D) It doesn't do anything."],
    answer: "A) The markup of the page."
  },
  {
    question: "What is JavaScript responsible for in a web application?",
    choices: ["A) The markup of the page.", "B) The style of the page.", "C) The functionality of the page.", "D) It doesn't do anything."],
    answer: "C) The functionality of the page."
  }
];

// Setting up variables
let timer = document.getElementById("timer");
let timeRemaining = document.getElementById("timeRemaining");
let timesUp = document.getElementById("timesUp");
let highscoreLink = document.getElementById("highscoreLink");

let container = document.getElementById("container");

let start = document.getElementById("startScreen");
let startBtn = document.getElementById("start-button");

let questionCard = document.getElementById("questionCard");
let quizQuestion = document.getElementById("quizQuestion");
let choiceA = document.getElementById("choice0");
let choiceB = document.getElementById("choice1");
let choiceC = document.getElementById("choice2");
let choiceD = document.getElementById("choice3");
let checkAnswer = document.getElementById("checkAnswer");

let scoreCheck = document.getElementById("scoreCheck");
let scoreFinal = document.getElementById("scoreFinal");
let initials = document.getElementById("initials");
let initialsBtn = document.getElementById("initialsBtn");

let highscores = document.getElementById("highscores");
let highscoreList = document.getElementById("highscoreList");
let homescreenBtn = document.getElementById("homeScreen");
let clearHighscoresBtn = document.getElementById("clearHighscores");
let highscoreBtns = document.getElementById("highscoreBtns");

let correctAnswer = 0;
let questionNumber = 0;
let result;
let questionIndex = 0;

// Functions

let totalTime = 101;

start.style.display = "block";
timesUp.style.display = "none";
scoreCheck.style.display = "none";
highscores.style.display = "none";

const startQuiz = () => {
  questionIndex = 0;
  totalTime = 100;
  timeRemaining.textContent = totalTime;
  initials.textContent = "";

  start.style.display = "none";
  questionCard.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  let startTime = setInterval(function() {
    totalTime--;
    timeRemaining.textContent = totalTime;
    if (totalTime <=0) {
      clearInterval(startTime);
      if (questionIndex < questions.length - 1) {
        quizOver();
      }
    }
  }, 1000)

  displayQuiz();
};

const displayQuiz = () => {
  nextQuestion();
}

const nextQuestion = () => {
  quizQuestion.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

const answerCheck = answer => {
  checkAnswer.style.display = "block";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
    correctAnswer++;
    checkAnswer.textContent = "You got it!"
  } else {
    totalTime -= 15;
    timeRemaining.textContent = totalTime;
    checkAnswer.textContent = "Incorrect! You should have selected " + questions[questionIndex].answer;
  }

  questionIndex++;
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    quizOver();
  }
}

const chooseA = () => {
  answerCheck(0);
}

const chooseB = () => {
  answerCheck(1);
}

const chooseC = () => {
  answerCheck(2);
}

const chooseD = () => {
  answerCheck(3);
}

const quizOver = () => {
  container.style.display = "block";
  questionCard.style.display = "none";
  start.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";
  scoreCheck.style.display = "block";

  scoreFinal.textContent = correctAnswer;
}

const storeScores = event => {
  event.preventDefault;

  if (initials.value === "") {
    alert("Please enter your initials!");
    return;
  }

  container.style.display = "none";
  start.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  highscores.style.display = "block";

  let savedScores = localStorage.getItem("high scores");
  let scoresArray;

  if (savedScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedScores);
  }

  let userScore = {
    initial: initials.value,
    score: scoreFinal.textContent
  };

  scoresArray.push(userScore);

  let scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);

  showScores();
} 

const showScores = () => {

  start.style.display = "none";
  timer.style.display = "none";
  questionCard.style.display = "none";
  timesUp.style.display = "none";
  container.style.display = "none";
  highscores.style.display = "block";
  highscoreList.style.display = "block";
  homescreenBtn.style.display = "block";
  clearHighscoresBtn.style.display = "block";
  highscoreBtns.style.display = "block";

  let savedScores = localStorage.getItem("high scores");

  if (savedScores === null) {
    return;
  }

  let storedScores = JSON.parse(savedScores);

  for (i = 0; i < storedScores.length; i++) {
    let newScore = document.createElement("p");
    newScore.innerHTML = storedScores[i].initial + ": " + storedScores[i].score;
    document.body.appendChild(newScore);
  }
}

// Event Listeners
startBtn.addEventListener("click", startQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

initialsBtn.addEventListener("click", function(event) {
  storeScores(event);
});

highscoreLink.addEventListener("click", function(event) {
  highscoreList.style.display = "block";
  showScores(event);
});

homescreenBtn.addEventListener("click", function() {
  start.style.display = "block";
  highscores.style.display = "none";
});

clearHighscoresBtn.addEventListener("click", function() {
  window.localStorage.removeItem("high scores");
  highscoreList.innerHTML = "High Scores Removed!";
});
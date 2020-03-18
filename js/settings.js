// DECLARE ALL VARIABLES
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const scorecard = document.getElementById('scorecard');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const quizOptions = document.getElementById('quiz-options');
const fiftyfifty = document.getElementById('fiftyfifty');
let loading = document.getElementById("loading");
let shuffledQuestions, currentQuestionIndex, ticker;
var initSeconds = 41;
var seconds = addZero(initSeconds);
var timeSpent;
var timeSeconds = 0;
var totalTime = addZero(timeSeconds);
var hour = 0;
var minutes = 0;
var sec = addZero(0);
let score = 0;
let attemptedQuestions = 0;
let characters, totalScore;

function render() {
  loading.classList.remove('hide');
  startButton.classList.add('hide');
  setTimeout(function () {
    loading.classList.add('hide');
    startButton.classList.remove('hide');
  }, 3700);
}

render();
// WHEN THE START BUTTON IS CLICKED, THE STARTGA
startButton.addEventListener('click', startGame);

// SET NEXT QUESTION AND CLEAR ALL TIME INTERVALS

function nextQuestion() {
  clearInterval(ticker);
  setTimeout(function () {
    currentQuestionIndex++;
    setNextQuestion();
    clearInterval(ticker);
    initSeconds = 41;
    seconds = addZero(initSeconds);
    ticker = setInterval(tinker, 1000);
    document.getElementById("questionTimer").classList.remove('danger');
    quizOptions.classList.remove('hide');
  }, 2900);
}

// THE START GAME FUNCTION CALLS THE SET_NEXT_QUESTION FUNCTION,CLEARS TIMER AND SET TIMER, SHUFFLE QUESTIONS
function startGame() {
  loading.classList.remove('hide');
  startButton.classList.add('hide');
  questionContainerElement.classList.add('hide');
  progress.classList.add('hide');
  setTimeout(function () {
    loading.classList.add('hide');
    answerButtonsElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    progress.classList.remove('hide');
    scorecard.innerHTML = "";
    setNextQuestion();
    score = 0;
    clearInterval(ticker);
    clearInterval(timeSpent);
    initSeconds = 41;
    seconds = addZero(initSeconds);
    sec = addZero(0);
    ticker = setInterval(tinker, 1000);
    timeSpent = setInterval(timeSet, 1000);
    removeDisableFiftyFiftyButton();
    removeDisableAudienceButton();
    document.getElementById("questionTimer").classList.remove('danger');
    quizOptions.classList.remove('hide');
  }, 2500);
}

// SETNEXTQUESTION FUNCTION RESET ALL CLASSES AND INCREAMENT THE QUESTION BY ONE. IT ALSO SHOWS QUESTION PROGRESS
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  showProgress();
  $(".btn1").removeClass('hidebutton');
  $(".btn1").removeClass('show');
}



// SHOW QUESTION SHOWS THE NEXT QUESTION, ADD CLASS TO THE CORRECT BUTTON AND INCREAMENT THE NUMBER OF ATTEMPTED QUESTION BY ONE
function showQuestion(question) {

  // ADD CHARCTERS TO ANSWERS, e.g A, B, C, D
  characters = 'A'.charCodeAt(0);

  // INSERT QUESTION TO DIV
  questionElement.innerText = question.question;

  // LOOP THROUGH THE BUTTONS AND ADD CORRESPONDING CLASSES TO THE BUTTONS CLICKED
  question.answers.forEach(answer => {
    const button = document.createElement('div');
    button.innerText = String.fromCharCode(characters++) + ". " + answer.text;
    button.classList.add('btn1');

    // CHECK IF THE ANSWER IS CORRECT AND ADD CORRECT ANSWER CLASS TO THAT BUTTON
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    //WHEN EACH BUTTON IS CLICKED, WE CHECK IF ITS THE CORRECT ANSWER
    button.addEventListener('click', selectAnswer);

    // INSERT ANSWER BUTTONS TO DIV ELEMENT
    answerButtonsElement.appendChild(button);
  });
}


// RESET ALL STATES, CLASSES
function resetState() {
  nextButton.classList.add('hide');

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

if (score == 0) {
  totalScore = 0;
}


// SELECT ANSWER FUNCTION CHECKS IF: (
// THE ANSWER IS CORRECT
// THE CURRENT QUESTION IS GREATER THAN THE TOTAL NUMBER OF QUESTIONS AVAILABLE
// INCREAMENT THE SCORE BY ONE IS THE ANSWER IS CORRECT
// ADD AND REMOVE ALL CSS CLASSES 
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  // setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  //CHECK IF THERE ARE MORE QUESTIONS,
  //IF CURRENT QUESTION IS LESS THAN TOTAL QUESTIONS, WE SHOW NEXT BUTTON
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    quizOptions.classList.add('hide');
    nextQuestion();

    if (correct) {
      score++;

      if (score > 0) {
        totalScore = score + 2;
      }

    }

  }

  //ELSE, WE 
  // HIDE NEXT BUTTON
  // SHOW TOTAL SCORE
  // DISPLAY TEXT
  // HIDE THE ANSWER BUTTON
  else {

    // loading.classList.remove('hide');
    // startButton.classList.add('hide');
    // questionContainerElement.classList.add('hide');
    // progress.classList.add('hide');
    setTimeout(function () {
      attemptedQuestions = currentQuestionIndex + 1;
      scorecard.innerHTML = "You attempted " + attemptedQuestions + " Out of " + questions.length + " Questions, You answered " + score + " correctly! Your score is " + totalScore * 2;
      startButton.innerText = 'Restart';
      questionElement.innerText = 'Game Over';
      startButton.classList.remove('hide');
      answerButtonsElement.classList.add('hide');
      progress.classList.add('hide');
      loading.classList.add('hide');
      questionContainerElement.classList.remove('hide');
      clearInterval(ticker);
      clearInterval(timeSpent);
      quizOptions.classList.add('hide');
      document.querySelector(".fiftycanceled").classList.add('hide');
      document.getElementById("questionTimer").innerHTML = 'Time spent: ' + addZero(hour) + ':' + addZero(minutes) + ':' + addZero(sec);
    }, 2000);
  }

}

// SET STATUS
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
    element.classList.add('blink');
  } else {
    element.classList.add('wrong');
  }

}

// SET STATUS
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('blink');
  element.classList.remove('wrong');
  element.classList.remove('yellow');

}

// SHOW THE CURRENT QUESTION NUMBER
function showProgress() {
  var currentQuestionNumber = currentQuestionIndex + 1;
  var progress = document.getElementById("progress");
  progress.innerHTML = "Question " + currentQuestionNumber + " of " + questions.length;

};

// FUNCTION THAT SET TIME INTERVAL
function tinker() {
  --seconds;

  if (seconds <= 15) {
    document.getElementById("questionTimer").classList.add('danger');
  }

  // check if seconds is less than or equal to zero, the show time out
  if (seconds <= 0) {
    attemptedQuestions = currentQuestionIndex;
    scorecard.innerHTML = "<span class='text-center'>You have exceeded your time <br> <br>You attempted " + attemptedQuestions + " Out of " + questions.length + " Questions, You answered " + score + " correctly! Your score is " + totalScore * 2;
    startButton.innerText = 'Restart';
    questionElement.innerText = 'Timeout!!!';
    startButton.classList.remove('hide');
    answerButtonsElement.classList.add('hide');
    progress.classList.add('hide');
    clearInterval(ticker);
    clearInterval(timeSpent);
    quizOptions.classList.add('hide');
    nextButton.classList.add('hide');
    document.getElementById("questionTimer").innerHTML = 'Time spent: ' + addZero(hour) + ':' + addZero(minutes) + ':' + addZero(sec);
    document.getElementById("questionTimer").classList.remove('danger');
    document.querySelector(".fiftycanceled").classList.add('hide');
  }

  document.getElementById("questionTimer").innerHTML = '00:' + addZero(seconds);

}

// FUNCTION THAT SET TOTAL TIME SPENT ON THE QUIZ
function timeSet() {
  ++sec;

  hour = (minutes > 59) ? ++hour : hour;
  minutes = (sec > 59) ? ++minutes : minutes;
  if (hour > 24) clearInterval(timeSpent);
  sec = (sec > 59) ? 0 : sec;
  if (minutes > 59) {
    ++hour;
    minutes = 0;
  }
}

//FUNCTION THAT ADDS ZERO IF ELEMENT IS LESS THAN 10

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//FUNCTION THAT CONTROLS 50/50 
function fiftyFity() {

  var i = 0;

  var ceheck = document.getElementsByClassName("btn1");

  var randomSelect = Math.floor(Math.random() * 4);

  for (var a of ceheck) {
    i += 1;

    var forCorrect = a.dataset.correct;

    if (forCorrect) {
      if (i == 1) {
        $(".btn1").not(':last-child').addClass('hidebutton');
        a.classList.add('show');
        a.classList.remove('hidebutton');
      } else {
        $(".btn1").not(':first-child').addClass('hidebutton');
        a.classList.add('show');
        a.classList.remove('hidebutton');
      }
    }
  }
  // DISABLE 50/50 BUTTON FUNCTION

  disableFiftyFiftyButton();

}

// DISABLE 50/50 BUTTON FUNCTION
function disableFiftyFiftyButton() {
  $("#fiftyfifty").prop("disabled", true).css({
    'cursor': 'auto',
    'color': 'red'
  });

  $("#fiftyfifty").addClass('cancel');
  $(".fiftycanceled").removeClass('hide');

}

// REMOVE DISABLE 50/50 BUTTON FUNCTION
function removeDisableFiftyFiftyButton() {
  $("#fiftyfifty").prop("disabled", false).css({
    'cursor': 'pointer',
    'color': 'white'
  });
  $("#fiftyfifty").removeClass('cancel');
  $(".fiftycanceled").addClass('hide');
}

//FUNCTION THAT CONTROLS Audience 
function audience() {

  setTimeout(function () {
    var i = 0;

    var ceheck = document.getElementsByClassName("btn1");

    for (var a of ceheck) {
      i += 1;

      var forCorrect = a.dataset.correct;

      if (forCorrect) {
        var audienceAnswer = a.innerText;
        a.classList.add('yellow');
      }
    }
  }, 1200);


  // DISABLE Audience BUTTON FUNCTION

  disableAudienceButton();

}

// DISABLE Audience BUTTON FUNCTION
function disableAudienceButton() {
  $("#audience").prop("disabled", true).css({
    'cursor': 'auto',
    'color': 'red'
  });

  $("#audience").addClass('cancel');
  $(".audiencecanceled").removeClass('hide');

}

// REMOVE DISABLE Audience BUTTON FUNCTION
function removeDisableAudienceButton() {
  $("#audience").prop("disabled", false).css({
    'cursor': 'pointer',
    'color': 'white'
  });
  $("#audience").removeClass('cancel');
  $(".audiencecanceled").addClass('hide');
}
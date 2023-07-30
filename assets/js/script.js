var quizQuestions = [
    {
        question: "Arrays in js can be used to store _______.",
        answers: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above",
        },
        correctAnswer: "all of the above",
    },

    {
        question: "Commonly used data types DO NOT include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers",
        },
        correctAnswer: "alerts"
    },

    {
        question: "The first index of an array is ___.",
        answers: {
            1: "0",
            2: "1",
            3: "-1",
            4: "2",
        },
        correctAnswer: "0"
    },

    {
        question: "How do you properly write an IF statement in JavaScript?",
        answers: {
            1: "if 1 == 5 then",
            2: "if i = 5 then",
            3: "if(1 == 5)",
            4: "if 1=5",
        },
        correctAnswer: "if(i == 5)",
    },
];

var timeInterval;
var timeLeft;
var questionEl = document.getElementById("question");
var submitEl = document.getElementById("startBtn")
var questionIndex = 0;
var timerEl = document.getElementById("timer");
var optionsEl = document.getElementById("options");
var resultEl = document.getElementById("result")
var selectedOption = null;



function startTimer() {
    countdown();
}


function countdown() {
    timeInterval = setInterval(function () {
        if (timeLeft >0) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        }
        else {
            clearInterval(timeInterval);
            questionEl.textContent = "Finished!"
            optionsEl.innerHTML = "";
            resultEl.textContent = "Your score: " + timeLeft;

            var insertName = document.createElement("insert");
            insertName.setAttribute("type", "text");
            insertName.setAttribute("placeholder", "Enter Name");
            optionsEl.appendChild(insertName);

            var submitBtn = document.createElement("button");
            submitBtn.textContent = "Submit";
            submitBtn.addEventListener("click", function() {
                var userName = insertName.value;
                console.log("Player Name", userName);
                var quizScore = timeLeft;
            });
            optionsEl.appendChild(submitBtn);
        }
    }, 1000);
}

function refreshQuestion() {
    questionEl.innerText = quizQuestions[questionIndex].question;
    optionsEl.innerText = quizQuestions[0].answers;

    // var currentQ = quizQuestions[questionIndex];

    var submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.addEventListener("click", function () {
            questionIndex++;
            optionsEl.innerHTML = "";
            refreshQuestion();
        });
}




function refreshQuestion() {
    questionEl.innerText = quizQuestions[questionIndex].question;
    optionsEl.innerHTML = "";
 
    var currentQ = quizQuestions[questionIndex];
    for (var option in currentQ.answers) {
        var optionBtn = document.createElement("button");
        optionBtn.textContent = currentQ.answers[option];
        optionBtn.addEventListener("click", function () {
            selectedOption = this.textContent;
            checkOption();
        });
        optionsEl.appendChild(optionBtn);
    }
}

function checkOption() {
    var currentQ = quizQuestions[questionIndex];
    var result;
 
    if (selectedOption === currentQ.correctAnswer) {
        result = "Correct!";
    } else {
        result = "Try Again!";
        timeLeft -= 15;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.textContent = timeLeft;
    }
 
    resultEl.textContent = result;
    setTimeout(function () {
        resultEl.textContent = "";
        newQuestion();
    }, 800);
}

function newQuestion() {
    questionIndex++;
 
    if (questionIndex < quizQuestions.length) {
        selectedOption = null;
        resultEl.textContent = "";
        refreshQuestion();
    } else if (questionIndex === quizQuestions.length) {
        questionEl.textContent = "Finished!";
        optionsEl.innerHTML = "";
        resultEl.textContent = "Your score: " + timeLeft;
 
        var insertName = document.createElement("input");
        insertName.setAttribute("type", "text");
        insertName.setAttribute("placeholder", "Enter Name");
        optionsEl.appendChild(insertName);
 
        var submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.addEventListener("click", function () {
            userName = insertName.value;
            console.log("Player Name:", userName);
            userScore = timeLeft;
            saveScore();
        });
        optionsEl.appendChild(submitBtn);
    }
}


function startQuiz() {
    console.log("Begin");
    timeLeft = parseInt(timerEl.textContent);
    startTimer();
    refreshQuestion();
    startBtn.style.display = "none";
}
 
startBtn.addEventListener("click", startQuiz);
 
function getScore() {
    var score = localStorage.getItem("score");
    return score ? JSON.parse(score) : [];
}
 
function saveScore() {
    var score = getScore();
    score.push({ name: userName, score: userScore });
    localStorage.setItem("score", JSON.stringify(score));

}
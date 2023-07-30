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

            var submitBtn = docuement.createElement("btn");
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

    var submitBtn = document.createElement("btn");
        submitBtn.textContent = "Submit";
        submitBtn.addEventListener("click", function () {
            questionIndex++;
            optionsEl.innerHTML = "";
            refreshQuestion();
        });
}



function updateQuestion() {
    // var currentQ = questions[quizQuestions];
    console.log(quizQuestions)
    // questionEl.textContent = currentQ.question;
    optionsEl.innerHTML = "";

    currentQ.options.forEach(function (options) {
        var optionBtn = document.createElement("btn");
        optionBtn.textContent = options;
        optionBtn.addEventListener("click", function () {
            selectedOption = options;
            checkOption();
        });
        optionsEl.appendChild(optionBtn)
    })
}

function checkOption() {
    var currentQ = questions[quizQuestions];
    var result;

    if (selectedOption === corr) {
        result = "Correct!";
    }
    else {
        result = "Try Again!";
        timeLeft -= 15;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.textContent = result;
    }

    result.textContent = result;
    noTime(function () {
        result.textContent = "";
        newQuestion();
    }, 800);
}

function newQuestion() {
    questionIndex++;

    if (questionIndex < quizQuestions.length) {
        selectedOption = null;
        resultEl.textContent = "";
        updateQuestion();
    }
    else if (questionIndex === quizQuestions.length) {
        questionEl.textContent = "Finished!";
        optionsEl.innerHTML = "";
        result.textContent = "Your score: " + timeLeft;

        var insertName = document.createElement("input");
        insertName.setAttribute("type", "text");
        insertName.setAttribute("placeholder", "Enter Name");
        optionsEl.appendChild(insertName);

        var submitBtn = document.createElement("btn");
        submitBtn.textContent = "Submit";
        submitButton.addEventListener("click", function () {
            var userName = insertName.value;
            console.log("Player Name: ", userName);
            var userScore = timeLeft;
        });
        optionsEl.appendChild(submitBtn);
    }
}

function startQuiz() {
    console.log("Begin");
    timeLeft = parseInt(timerEl.textContent);
    startTimer();
    // updateQuestion();
    refreshQuestion();
    startBtn.style.display = "none";
}

var startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", startQuiz);

function getScore () {
    var score = localStorage.getItem("score");
    if (score) {
        return JSON.parse(score);
    }
    else {
        return [];
    }
}

function saveScore() {
    var score = getScore();
    score.push({ name: userName, score: userScore});
    localStorage.setItem("score", JSON.stringify(score));
}

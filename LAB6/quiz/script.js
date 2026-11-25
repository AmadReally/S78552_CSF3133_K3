// ==========================================================
// script.js - Web Design Quiz
// ==========================================================

// Questions Array: each item has the question, the options and the index of the correct answer
const questions = [
    {
        question: "Which HTML tag is used to link an external CSS file?",
        options: ["<style>", "<link>", "<script>", "<css>"],
        answer: 1
    },
    {
        question: "Which CSS property changes the text colour?",
        options: ["font-color", "text-style", "color", "foreground"],
        answer: 2
    },
    {
        question: "Which method finds an HTML element by its id in JavaScript?",
        options: ["getElementById()", "findElement()", "queryId()", "selectById()"],
        answer: 0
    },
    {
        question: "Which tag defines the footer of a web page?",
        options: ["<bottom>", "<end>", "<foot>", "<footer>"],
        answer: 3
    },
    {
        question: "What does Math.floor(4.9) return?",
        options: ["5", "4", "4.9", "0"],
        answer: 1
    },
    {
        question: "Which symbol is used for a class selector in CSS?",
        options: [". (dot)", "# (hash)", "* (star)", "& (ampersand)"],
        answer: 0
    },
    {
        question: "Which JavaScript event runs when a button is clicked?",
        options: ["onhover", "onpress", "onclick", "onchange"],
        answer: 2
    },
    {
        question: "Which CSS value removes the bullets from a list?",
        options: ["list-style-type: none;", "bullets: off;", "list: hidden;", "text-decoration: none;"],
        answer: 0
    }
];

// Quiz state
const TIME_PER_QUESTION = 15;   // seconds for each question
let quizQuestions = [];         // shuffled copy of the questions
let currentIndex = 0;           // which question is on screen
let score = 0;                  // number of correct answers
let timeLeft = TIME_PER_QUESTION;
let timerId = null;             // id returned by setInterval
let answered = false;           // true after the user answers or time runs out

// Small helper to get an element by id
function $(id) {
    return document.getElementById(id);
}

// shuffleQuestions(): randomly shuffles the questions (Fisher-Yates algorithm)
function shuffleQuestions(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}

// startTimer(): countdown for the current question
function startTimer() {
    clearInterval(timerId);
    timeLeft = TIME_PER_QUESTION;
    updateTimerText();

    timerId = setInterval(function () {
        timeLeft--;
        updateTimerText();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timeUp();
        }
    }, 1000);
}

// Show the remaining seconds (turns red in the last 5 seconds)
function updateTimerText() {
    $("timer").textContent = "Time left: " + timeLeft + "s";
    $("timer").className = timeLeft <= 5 ? "timer low" : "timer";
}

// Called when the timer reaches 0 and no answer was submitted
function timeUp() {
    if (answered) {
        return;
    }
    answered = true;
    const q = quizQuestions[currentIndex];
    showFeedback("Time's up! The correct answer is: " + q.options[q.answer], false);
    highlightAnswer(-1, q.answer);
    finishQuestion();
}

// displayQuestion(): shows the current question and its answer options
function displayQuestion() {
    const q = quizQuestions[currentIndex];
    answered = false;

    $("questionNumber").textContent = "Question " + (currentIndex + 1) + " of " + quizQuestions.length;
    $("questionText").textContent = q.question;
    $("feedback").textContent = "";
    $("feedback").className = "feedback";

    // Build one radio button + label for every option
    const optionsBox = $("options");
    optionsBox.innerHTML = "";
    for (let i = 0; i < q.options.length; i++) {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = i;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + q.options[i]));
        optionsBox.appendChild(label);
    }

    // Show the Submit button and hide the Next button
    $("submitBtn").className = "";
    $("nextBtn").className = "hidden";

    startTimer();
}

// checkAnswer(): checks the selected answer and updates the score
function checkAnswer() {
    if (answered) {
        return;
    }
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected === null) {
        alert("Please select an answer.");
        return;
    }

    answered = true;
    clearInterval(timerId);

    const chosen = parseInt(selected.value, 10);
    const q = quizQuestions[currentIndex];

    if (chosen === q.answer) {
        score++;
        showFeedback("Correct! Well done.", true);
    } else {
        showFeedback("Incorrect. The correct answer is: " + q.options[q.answer], false);
    }
    highlightAnswer(chosen, q.answer);
    updateScore();
    finishQuestion();
}

// Show a feedback message in green (good) or red (bad)
function showFeedback(message, isCorrect) {
    $("feedback").textContent = message;
    $("feedback").className = isCorrect ? "feedback good" : "feedback bad";
}

// Colour the chosen answer and the correct answer, and lock the radio buttons
function highlightAnswer(chosen, correct) {
    const labels = $("options").getElementsByTagName("label");
    const radios = $("options").getElementsByTagName("input");
    for (let i = 0; i < labels.length; i++) {
        radios[i].disabled = true;
        if (i === correct) {
            labels[i].className = "correct";
        } else if (i === chosen) {
            labels[i].className = "wrong";
        }
    }
}

// After an answer: hide Submit, show Next (or "See Result" on the last question)
function finishQuestion() {
    $("submitBtn").className = "hidden";
    $("nextBtn").className = "";
    if (currentIndex === quizQuestions.length - 1) {
        $("nextBtn").textContent = "See Result";
    } else {
        $("nextBtn").textContent = "Next Question";
    }
}

// nextQuestion(): moves to the next question, resets the timer and updates the score
function nextQuestion() {
    currentIndex++;
    if (currentIndex >= quizQuestions.length) {
        showResult();
        return;
    }
    updateScore();
    displayQuestion();
}

// Update the score shown in the footer
function updateScore() {
    $("score").textContent = "Score: " + score + " / " + quizQuestions.length;
}

// Show the final score after the last question
function showResult() {
    clearInterval(timerId);
    $("quizSection").className = "card hidden";
    $("resultSection").className = "card";

    const percent = Math.round((score / quizQuestions.length) * 100);
    $("finalMessage").textContent =
        "You scored " + score + " out of " + quizQuestions.length + " (" + percent + "%).";
    $("score").textContent = "Final score: " + score + " / " + quizQuestions.length;
}

// startQuiz(): shuffles the questions, shows the first one and starts the timer
function startQuiz() {
    quizQuestions = shuffleQuestions(questions);
    currentIndex = 0;
    score = 0;
    updateScore();

    $("startSection").className = "card hidden";
    $("resultSection").className = "card hidden";
    $("quizSection").className = "card";

    displayQuestion();
}

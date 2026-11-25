// ==========================================================
// game.js - Rock, Paper, Scissors
// ==========================================================

// ----- Game data -----
let gameStarted = false;     // becomes true after the player clicks Start Game
let wins = 0;                // score counters
let losses = 0;
let draws = 0;
let results = [];            // stores "Win", "Lose" or "Draw" for every round

// The table header row, used again when the game is reset
const historyHeader = "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";

// Make text safe before putting it into innerHTML (so a name like <b> is not treated as HTML)
function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// First letter in capitals, e.g. "rock" -> "Rock"
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// ----- startGame(): validates the name and starts the game -----
function startGame() {
    const name = document.getElementById("playerName").value.trim();

    // Case 2: empty name -> alert and stop
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Welcome message (innerHTML) and the start date and time (Date())
    document.getElementById("welcome").innerHTML = "Welcome, " + escapeHTML(name) + "!";
    document.getElementById("startTime").innerHTML = "Game started: " + Date();

    // Allow the game to start
    gameStarted = true;
}

// ----- getComputerChoice(): random choice from an array -----
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    // Math.random() * 3 gives 0 to 2.99..., Math.floor() turns it into 0, 1 or 2
    const index = Math.floor(Math.random() * 3);
    return choices[index];
}

// ----- playRound(): plays one round -----
function playRound(playerChoice) {
    // Case 1: the game has not started yet
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();

    // Decide the result with if...else
    // rock beats scissors, scissors beats paper, paper beats rock
    let result;
    if (playerChoice === computerChoice) {
        result = "Draw";
    } else if (playerChoice === "rock" && computerChoice === "scissors") {
        result = "Win";
    } else if (playerChoice === "scissors" && computerChoice === "paper") {
        result = "Win";
    } else if (playerChoice === "paper" && computerChoice === "rock") {
        result = "Win";
    } else {
        result = "Lose";
    }

    // Change the src of both images and show them
    const playerImg = document.getElementById("playerImg");
    const computerImg = document.getElementById("computerImg");
    playerImg.src = playerChoice + ".png";
    playerImg.alt = "You chose " + playerChoice;
    playerImg.style.visibility = "visible";
    computerImg.src = computerChoice + ".png";
    computerImg.alt = "Computer chose " + computerChoice;
    computerImg.style.visibility = "visible";

    // Show the result and change its colour: green = Win, red = Lose, grey = Draw
    const resultBox = document.getElementById("result");
    if (result === "Win") {
        resultBox.innerHTML = "You Win!";
        resultBox.style.color = "green";
        wins++;
    } else if (result === "Lose") {
        resultBox.innerHTML = "You Lose!";
        resultBox.style.color = "red";
        losses++;
    } else {
        resultBox.innerHTML = "It's a Draw!";
        resultBox.style.color = "grey";
        draws++;
    }

    // Update the scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store the result in the array
    results.push(result);

    // Add a new row to the history table using innerHTML +=
    document.getElementById("history").innerHTML +=
        "<tr><td>" + results.length + "</td>" +
        "<td>" + capitalize(playerChoice) + "</td>" +
        "<td>" + capitalize(computerChoice) + "</td>" +
        "<td class=\"" + result + "\">" + result + "</td></tr>";
}

// ----- showSummary(): counts wins with a for loop -----
function showSummary() {
    const summary = document.getElementById("summary");

    if (results.length === 0) {
        summary.innerHTML = "No rounds played yet.";
        return;
    }

    // Count the wins
    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    // Win percentage rounded with Math.round()
    const percentage = Math.round((winCount / results.length) * 100);
    const roundWord = results.length === 1 ? "round" : "rounds";
    summary.innerHTML = "You played " + results.length + " " + roundWord + " and won " + percentage + "%";
}

// ----- resetGame(): set everything back to the start -----
function resetGame() {
    // Scores back to 0 and empty the results array
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear the history rows (keep the header row), result message and summary
    document.getElementById("history").innerHTML = historyHeader;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Hide the two images again
    document.getElementById("playerImg").style.visibility = "hidden";
    document.getElementById("computerImg").style.visibility = "hidden";
}

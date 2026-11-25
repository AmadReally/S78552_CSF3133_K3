function playGame() {
    // Generate a random integer between 1 and 10
    // Math.random() gives 0 to 0.999..., times 10 and Math.floor() rounds down, +1 shifts it to 1-10
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    // Prompt the user to guess the number (parseInt turns the text into a whole number)
    const userGuess = parseInt(prompt("Guess a number between 1 and 10:"), 10);

    // Validate the user's input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        alert("Please enter a valid number between 1 and 10.");
        return;
    }

    // Check if the guess is correct
    if (userGuess === randomNumber) {
        alert("Good Work! You guessed it right.");
    } else {
        alert(`Not matched. The correct number was ${randomNumber}.`);
    }
}

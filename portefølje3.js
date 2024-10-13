// Generate a random number between 1 and 20
let numberToGuess = Math.floor(Math.random() * 20) + 1;

// Initialize score and highscore
let score = 20;
let highscore = 0;
let guessedNumbers = []; // Array to store guessed numbers

// DOM Elements
const guessInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const messageDisplay = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
const numberDisplay = document.querySelector('.number');
const guessedNumbersDisplay = document.querySelector('.guessed-numbers'); // Element to display guessed numbers
const body = document.body;
const themeToggleButton = document.createElement('button'); // Create theme toggle button

// Function to display a message
function displayMessage(message) {
    messageDisplay.textContent = message;
}

// Function to update guessed numbers display
function updateGuessedNumbers() {
    guessedNumbersDisplay.textContent = guessedNumbers.join(', ');
}

// Event listener for Check! button
checkButton.addEventListener('click', function () {
    const userGuess = Number(guessInput.value);

    // Check if the input is not a number or not within the range 1-20
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        displayMessage('⛔ Please enter a number between 1 and 20!');
    } else {
        // Add the guess to the guessed numbers array
        guessedNumbers.push(userGuess);
        updateGuessedNumbers();

        // Add your game logic here when the input is valid
        if (userGuess === numberToGuess) {
            displayMessage('🎉 Correct Guess!');
            numberDisplay.textContent = numberToGuess;
            numberDisplay.style.backgroundColor = '#60b347';

            // Trigger confetti when the correct number is guessed
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });

            if (score > highscore) {
                highscore = score;
                highscoreDisplay.textContent = highscore;
            }
        } else if (userGuess < numberToGuess) {
            displayMessage('📉 Too low!');
            score--;
        } else {
            displayMessage('📈 Too high!');
            score--;
        }
        scoreDisplay.textContent = score;

        // Check if the player has run out of attempts
        if (score <= 0) {
            displayMessage('💥 You lost the game!');
            numberDisplay.textContent = numberToGuess;
            numberDisplay.style.backgroundColor = '#ff0000';
        }
    }
});

// Event listener for Again! button
againButton.addEventListener('click', function () {
    score = 20;
    numberToGuess = Math.floor(Math.random() * 20) + 1;
    guessedNumbers = [];
    displayMessage('Start guessing...');
    scoreDisplay.textContent = score;
    numberDisplay.textContent = '?';
    numberDisplay.style.backgroundColor = '#222';
    guessInput.value = '';
    updateGuessedNumbers();
});

// Function to toggle light/dark mode
function toggleTheme() {
    body.classList.toggle('light-mode');

    // Save the theme preference in localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}

// Set theme on page load based on preference saved in localStorage
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
};

// Create and style the theme toggle button
themeToggleButton.textContent = 'Light-Mode';
themeToggleButton.style.position = 'fixed';   // Changed to fixed to keep it in place during scrolling
themeToggleButton.style.bottom = '10px';      // Position at the bottom
themeToggleButton.style.left = '10px';        // Position at the left
themeToggleButton.style.padding = '10px';
themeToggleButton.style.cursor = 'pointer';
document.body.appendChild(themeToggleButton);

// Event listener for theme toggle button
themeToggleButton.addEventListener('click', toggleTheme);


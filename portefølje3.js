
let numberToGuess = Math.floor(Math.random() * 20) + 1;


let score = 20;
let highscore = 0;
let guessedNumbers = [];


const guessInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const messageDisplay = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
const numberDisplay = document.querySelector('.number');
const guessedNumbersDisplay = document.querySelector('.guessed-numbers');
const body = document.body;
const themeToggleButton = document.createElement('button');


function displayMessage(message) {
    messageDisplay.textContent = message;
}


function updateGuessedNumbers() {
    guessedNumbersDisplay.textContent = guessedNumbers.join(', ');
}


checkButton.addEventListener('click', function () {
    const userGuess = Number(guessInput.value);


    if (!userGuess || userGuess < 1 || userGuess > 20) {
        displayMessage('⛔ Please enter a number between 1 and 20!');
    } else {

        guessedNumbers.push(userGuess);
        updateGuessedNumbers();


        if (userGuess === numberToGuess) {
            displayMessage('🎉 Correct Guess!');
            numberDisplay.textContent = numberToGuess;
            numberDisplay.style.backgroundColor = '#60b347';


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


        if (score <= 0) {
            displayMessage('💥 You lost the game!');
            numberDisplay.textContent = numberToGuess;
            numberDisplay.style.backgroundColor = '#ff0000';
        }
    }
});


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


function toggleTheme() {
    body.classList.toggle('light-mode');


    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}


window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }
};


themeToggleButton.textContent = 'Light-Mode';
themeToggleButton.style.position = 'fixed';
themeToggleButton.style.bottom = '10px';
themeToggleButton.style.left = '10px';
themeToggleButton.style.padding = '10px';
themeToggleButton.style.cursor = 'pointer';
document.body.appendChild(themeToggleButton);


themeToggleButton.addEventListener('click', toggleTheme);


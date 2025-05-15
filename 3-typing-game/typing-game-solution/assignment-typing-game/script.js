const quotes = [
    "There is nothing more deceptive than an obvious fact",
    "You see, but you do not observe",
    "I am a brain, Watson. The rest of me is a mere appendix",
    "The game is afoot!",
    "Education never ends, Watson. It is a series of lessons with the greatest for the last"
];

const startBtn = document.getElementById("start-btn");
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");

let startTime, interval;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function startGame() {
    const randomQuote = getRandomQuote();
    quoteElement.textContent = randomQuote;
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();
    startBtn.disabled = true;

    startTime = new Date();
    timerElement.textContent = "Time: 0s";

    interval = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timerElement.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}

function calculateWPM(quote, timeInSeconds) {
    const words = quote.split(" ").length; // Count the number of words in the quote
    const timeInMinutes = timeInSeconds / 60; // Convert time to minutes
    return Math.round(words / timeInMinutes); // Calculate WPM
}

function endGame() {
    clearInterval(interval);
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const wpm = calculateWPM(quoteElement.textContent, elapsedTime);
    alert(`You completed the game in ${elapsedTime} seconds! Your WPM is ${wpm}.`);
    inputElement.disabled = true;
    startBtn.disabled = false;
}

inputElement.addEventListener("input", () => {
    const quoteText = quoteElement.textContent;
    const userInput = inputElement.value;

    if (userInput === quoteText) {
        endGame();
    }
});

startBtn.addEventListener("click", startGame);
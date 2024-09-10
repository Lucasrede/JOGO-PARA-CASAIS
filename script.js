// Palavra secreta
const secretWord = "Amor";

// Elementos HTML
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const resultMessage = document.getElementById("result-message");
const startButton = document.getElementById("start-button");

// Variáveis do jogo
let guessedLetters = [];
let remainingAttempts = 6;

// Iniciar o jogo
startButton.addEventListener("click", function() {
    guessedLetters = [];
    remainingAttempts = 6;
    resultMessage.textContent = "";
    guessButton.disabled = false;
    guessInput.disabled = false;
    guessInput.value = "";
    updateWordDisplay();
});

// Adivinhar uma letra
guessButton.addEventListener("click", function() {
    const letter = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (!letter.match(/[a-z]/i)) {
        resultMessage.textContent = "Por favor, digite apenas letras de A a Z.";
        return;
    }

    if (guessedLetters.includes(letter)) {
        resultMessage.textContent = "Você já tentou essa letra antes.";
        return;
    }

    guessedLetters.push(letter);

    if (secretWord.includes(letter)) {
        resultMessage.textContent = "Letra correta!";
    } else {
        remainingAttempts--;
        resultMessage.textContent = "Letra incorreta! Você tem " + remainingAttempts + " tentativa(s) restante(s).";
    }

    updateWordDisplay();
    checkGameEnd();
});

// Atualizar a exibição da palavra
function updateWordDisplay() {
    let display = "";
    for (let letter of secretWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display.trim();
}

// Verificar se o jogo terminou
function checkGameEnd() {
    if (remainingAttempts === 0) {
        resultMessage.textContent = "Fim de jogo! A palavra secreta era '" + secretWord + "'.";
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (!wordDisplay.textContent.includes("_")) {
        resultMessage.textContent = "Parabéns! Você adivinhou a palavra secreta!";
        guessButton.disabled = true;
        guessInput.disabled = true;
    }
}

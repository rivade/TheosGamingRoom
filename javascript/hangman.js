const words = ["earthquake", "imagine", "agile", "backflip", "machine", "hungry", "kick", "guitar", "laptop", "chair", "stew", "configuration", "saturation", "component", "exponential", "happy", "party", "balloon", "nice", "animal", "house"];
let word = words[Math.floor(Math.random() * words.length)];
let wordArray = word.split("");
let incorrectGuesses = [];
let wordPlaceholder = Array(word.length).fill("_");
const scoreLabel = document.querySelector(".score-label");
const resetButton = document.getElementById("reset-button");
const canvas = document.getElementById("hangmanCanvas");
const context = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 200;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

let score = 0;
let finished = false;

const updateWordPlaceholder = () => {
    document.getElementById("word").textContent = wordPlaceholder.join(" ");
};

const updateIncorrectGuesses = () => {
    document.getElementById("incorrect-guesses").textContent = incorrectGuesses.join(" ");
    document.getElementById("wrong-guesses").textContent = incorrectGuesses.length;
};

const handleGuess = () => {
    if (!finished){
        const letter = document.getElementById("letter-input").value;
        if (!letter.match(/^[a-zA-Z]$/)) {
            alert("Please enter a single letter");
        } else if (!wordArray.includes(letter)) {
            if (!incorrectGuesses.includes(letter)) {
                incorrectGuesses.push(letter);
                updateIncorrectGuesses();
            }
        } else {
            for (let i = 0; i < wordArray.length; i++) {
                if (wordArray[i] === letter) {
                    wordPlaceholder[i] = letter;
                }
            }
            updateWordPlaceholder();
        }
        if (!wordPlaceholder.includes("_")) {
            document.getElementById("message").textContent = "You won!";
            score++;
            scoreLabel.innerText = score;
            resetButton.style.display = "block";
            finished = true;
        }
        if (incorrectGuesses.length === 6) {
            document.getElementById("message").textContent = "You lost! The word was: " + word;
            resetButton.style.display = "block";
            finished = true;
        }
        document.getElementById("letter-input").value = "";
        drawHangman(incorrectGuesses);
    } else {
        alert("You already finished the game!")
    }
};

const letterInput = document.getElementById("letter-input");
letterInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        handleGuess();
    }
});

const reset = () => {
    word = words[Math.floor(Math.random() * words.length)];
    wordArray = word.split("");
    incorrectGuesses = [];
    wordPlaceholder = Array(word.length).fill("_");
    finished = false;
    resetButton.style.display = "none";
    document.getElementById("message").textContent = "";
    document.getElementById("letter-input").value = "";
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateWordPlaceholder();
    updateIncorrectGuesses();
}

////////////////////////////////////////////////////////
function drawGallow(){
    context.beginPath();
    context.moveTo(centerX, centerY - 25);
    context.lineTo(centerX, centerY - 80);
    context.lineTo(centerX - 75, centerY - 80);
    context.lineTo(centerX - 75, canvas.height);
    context.moveTo(centerX, centerY - 80);
    context.lineTo(centerX + 10, centerY - 80)
    context.strokeStyle = "black";
    context.stroke();
}
function drawHead(){
    context.beginPath();
    context.fillStyle = "black";
    context.arc(centerX, centerY - 25, 15, 0, Math.PI * 2, true);
    context.fill();
}
function drawBody(){
    context.beginPath();
    context.moveTo(centerX, centerY - 25);
    context.lineTo(centerX, centerY + 50);
    context.strokeStyle = "black";
    context.stroke();
}
function drawLeftArm(){
    context.beginPath();
    context.moveTo(centerX, centerY - 5);
    context.lineTo(centerX - 25, centerY + 25);
    context.strokeStyle = "black";
    context.stroke();

}
function drawRightArm(){
    context.beginPath();
    context.moveTo(centerX, centerY - 5);
    context.lineTo(centerX + 25, centerY + 25);
    context.strokeStyle = "black";
    context.stroke();
}
function drawLeftLeg(){
    context.beginPath();
    context.moveTo(centerX, centerY + 50);
    context.lineTo(centerX - 20, centerY + 80);
    context.strokeStyle = "black";
    context.stroke();
}
function drawRightLeg(){
    context.beginPath();
    context.moveTo(centerX, centerY + 50);
    context.lineTo(centerX + 20, centerY + 80);
    context.strokeStyle = "black";
    context.stroke();
}


function drawHangman(incorrectGuesses){
    let step = incorrectGuesses.length;
    switch (step){
        case 1:
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGallow();
            drawHead();
            break;
        case 2:
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGallow();
            drawHead();
            drawBody();
            break;
        case 3:
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGallow();
            drawHead();
            drawBody();
            drawLeftArm();
            break;
        case 4:
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGallow();
            drawHead();
            drawBody();
            drawLeftArm();
            drawRightArm();
            break;
        case 5:
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGallow();
            drawHead();
            drawBody();
            drawLeftArm();
            drawRightArm();
            drawLeftLeg();
            break;
        case 6:
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGallow();
            drawHead();
            drawBody();
            drawLeftArm();
            drawRightArm();
            drawLeftLeg();
            drawRightLeg();
            break;
    }
}

document.getElementById("guess-button").addEventListener("click", handleGuess);
resetButton.addEventListener("click", reset);
updateWordPlaceholder();
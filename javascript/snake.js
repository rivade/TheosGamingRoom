const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameOverDiv = document.getElementById("gameOver");
const resetButton = document.getElementById("resetButton");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const scoreLabel = document.querySelector(".score-label");
const highscoreLabel = document.querySelector(".highscore-label");

let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }];
let food = { x: 300, y: 300 };

let dx = 10;
let dy = 0;

let score = 0;
let highScore = 0;

let gameOver = false;
let gameStarted = false;

document.addEventListener("keydown", keydownHandler);
resetButton.addEventListener("click", reset);
startButton.addEventListener("click", start);

function keydownHandler(e) {
    if (e.code === "KeyA" && dx === 0) {
      dx = -10;
      dy = 0;
    } else if (e.code === "KeyD" && dx === 0) {
      dx = 10;
      dy = 0;
    } else if (e.code === "KeyW" && dy === 0) {
      dx = 0;
      dy = -10;
    } else if (e.code === "KeyS" && dy === 0) {
      dx = 0;
      dy = 10;
    }
}
  

function reset() {
  snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 }];
  dx = 10;
  dy = 0;
  food = { x: 300, y: 300 };
  gameOver = false;
  gameOverDiv.style.display = "none";
  score = 0;
}

function start() {
  startScreen.style.display = "none";
  gameCanvas.style.display = "block";
  gameStarted = true;
}

function drawGrid() {
  ctx.strokeStyle = "lightgray";

  for (let i = 0; i < canvas.width; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let j = 0; j < canvas.height; j += 10) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }
}

function drawFood() {
  let isFoodInsideBody = false;
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === food.x && snake[i].y === food.y) {
      isFoodInsideBody = true;
      break;
    }
  }

  if (isFoodInsideBody) {
    // Generate new coordinates for food until it is not inside the snake's body
    do {
      food.x = Math.floor(Math.random() * 29) * 10;
      food.y = Math.floor(Math.random() * 29) * 10;
      isFoodInsideBody = false;
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
          isFoodInsideBody = true;
          break;
        }
      }
    } while (isFoodInsideBody);
  }
  ctx.fillStyle = "darkred";
  ctx.fillRect(food.x, food.y, 10, 10);
}

function draw() {
  if (!gameStarted) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(); // Call the function to draw the grid

  if (gameOver) {
    gameOverDiv.style.display = "flex";
    return;
  }

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "black" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);

    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, 10, 10);
  }

  drawFood();

  let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    if (score > highScore) {
      highScore++;
    }
    food = { x: Math.floor(Math.random() * 29) * 10, y: Math.floor(Math.random() * 29) * 10 };
  } else {
    snake.pop();
  }

  if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
    gameOver = true;
  }

  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      gameOver = true;
    }
  }

  snake.unshift(newHead);

  scoreLabel.innerText = score;
  highscoreLabel.innerText = highScore;
}

setInterval(draw, 100);

const cvs = document.getElementById('snake')
const ctx = cvs.getContext('2d')

// create the unit

const box = 32

// load img

const ground = new Image()
ground.src = 'img/ground.png'

const foodImg = new Image()
foodImg.src = 'img/food.png'

// load audio files

const dead = new Audio()
const eat = new Audio()
const up = new Audio()
const left = new Audio()
const right = new Audio()
const down = new Audio()

dead.src = "./sound/dead.mp3"
eat.src = "./sound/eat.mp3"
up.src = "./sound/up.mp3"
left.src = "./sound/left.mp3"
right.src = "./sound/right.mp3"
down.src = "./sound/down.mp3"

// create the snake

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

// create the food

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score

let score = 0

// cntrol the snake

let d

document.addEventListener('keydown', direction)

function direction(event) {
  let key = event.keyCode
  if (key == 37 && d != "RIGHT") {
    left.play()
    d = 'LEFT'
  } else if (key == 38 && d != "DOWN") {
    up.play()
    d = 'UP'
  } else if (key == 39 && d != "LEFT") {
    right.play()
    d = 'RIGHT'
  } else if (key == 40 && d != "UP") {
    down.play()
    d = 'DOWN'
  }
}

// chaeck collision fn

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true
    }
  }
}

// draw to the canvas

function draw() {
  ctx.drawImage(ground, 0, 0)

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "green" : "white"
    ctx.fillRect(snake[i].x, snake[i].y, box, box)

    ctx.strokeStyle = "red"
    ctx.strokeRect(snake[i].x, snake[i].y, box, box)
  }

  ctx.drawImage(foodImg, food.x, food.y)

  // old head position
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // id the snake eats the food

  if (snakeX == food.x && snakeY == food.y) {
    score++
    eat.play()
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    snake.pop()
  }

  //add new head

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // game over

  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game)
    dead.play()
  }


  snake.unshift(newHead)

  ctx.fillStyle = "white"
  ctx.font = "45px Changa one"
  ctx.fillText(score, 2 * box, 1.6 * box)

}

// call draw fn every 100ms

let game = setInterval(draw, 100)

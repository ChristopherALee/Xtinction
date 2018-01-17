let canvas;
let ctx;
let width = 1200;
let height = 700;

let playerX = (width / 2) - 25;
let playerY = height / 2;
let playerW = 85;
let playerH = 85;

let playerMoveUp = false;
let playerMoveDown = false;
let playerMoveRight = false;
let playerMoveLeft = false;

function keyDown(e) {
  switch (e.keyCode) {
    case 87:
      playerMoveUp = true;
      break;
    case 83:
      playerMoveDown = true;
      break;
    case 65:
      playerMoveLeft = true;
      break;
    case 68:
      playerMoveRight = true;
      break;
  }
}

function keyUp(e) {
  switch (e.keyCode) {
    case 87:
      playerMoveUp = false;
      break;
    case 83:
      playerMoveDown = false;
      break;
    case 65:
      playerMoveLeft = false;
      break;
    case 68:
      playerMoveRight = false;
      break;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function drawPlayer() {
  const player = document.getElementById('player');

  if (playerMoveUp) {
    playerY -= 10;
  } else if (playerMoveDown) {
    playerY += 10;
  }

  if (playerMoveLeft) {
    playerX -= 10;
  } else if (playerMoveRight) {
    playerX += 10;
  }

  if (playerX <= 0) { playerX = 0; }
  if ((playerX + playerW) >= width) { playerX = width - playerW; }
  if ((playerY + playerH) >= height) { playerY = height - playerH; }
  if (playerY <= 0) { playerY = 0; }

  // ctx.fillStyle = 'white';
  // ctx.fillRect(playerX, playerY, playerW, playerH);
  ctx.drawImage(player,
    10, 1000,
    45, 45,
    playerX, playerY,
    playerW, playerH);
}

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  setInterval(gameLoop, 25);
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
}

function gameLoop() {
  clearCanvas();
  drawPlayer();
}

window.onload = init();

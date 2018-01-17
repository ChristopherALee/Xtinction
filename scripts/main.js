let canvas;
let ctx;
let width = 800;
let height = 800;

let playerX = (width / 2) - 25;
let playerY = height - 75;
let playerW = 50;
let playerH = 50;

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

function drawShip() {
  ctx.fillStyle = 'white';
  ctx.fillRect(playerX, playerY, playerW, playerH);
}

function init() {
  debugger
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  setInterval(gameLoop, 25);
}

function gameLoop() {
  clearCanvas();
  drawShip();
}

window.onload = init();

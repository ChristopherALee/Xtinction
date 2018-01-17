let playerX = (800 / 2) - 25;
let playerY = 800 - 75;
let playerW = 50;
let playerH = 50;

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

function drawPlayer() {
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
  if ((playerX + playerW) >= 800) { playerX = 800 - playerW; }
  if (playerY <= 0) { playerY = 0; }
  if ((playerY + playerH) >= 800) { playerY = 800 - playerH; }

  ctx.fillStyle = 'white';
  ctx.fillRect(playerX, playerY, playerW, playerH);
}

module.exports = drawPlayer;
module.exports = keyDown;
module.exports = keyUp;

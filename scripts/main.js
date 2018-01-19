import Sprite from './sprite.js';
import player from './player.js';
import * as Bullets from './bullet.js';
import checkCollisions from './collisions.js';
import * as Monsters from './enemies.js';

// player movement on key-press w/ event listeners
let activeKeys = {};
const checkKeyPress = () => {
  function setKey(e, status) {
    let keyCode = e.keyCode;
    let key;

    switch (keyCode) {
      case 87:
        key = 'UP';
        activeKeys[key] = status;
        break;
      case 83:
        key = 'DOWN';
        activeKeys[key] = status;
        break;
      case 65:
        key = 'LEFT';
        activeKeys[key] = status;
        break;
      case 68:
        key = 'RIGHT';
        activeKeys[key] = status;
        break;
      case 75:
        key = 'SHOOT';
        activeKeys[key] = status;
        break;
    }
  }

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });

  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });

  window.input = {
    pressed: (key) => {
      return activeKeys[key];
    }
  };
};
checkKeyPress();

function handleInput(timeDifferential) {

  // handles player movement
  if (window.input.pressed('DOWN')) {
    player.pos[1] += player.speed * timeDifferential;
  }

  if (window.input.pressed('UP')) {
    player.pos[1] -= player.speed * timeDifferential;
  }

  if (window.input.pressed('LEFT')) {
    player.direction = 'LEFT';
    player.sprite = new Sprite(
      'https://i.imgur.com/T9EWHuO.png',
      [570, 874],
      [100, 100],
      [0, 0],
      [100, 100],
      5,
      [0]);
    player.pos[0] -= player.speed * timeDifferential;
  }

  if (window.input.pressed('RIGHT')) {
    player.direction = 'RIGHT';
    player.sprite = new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [125, 874],
      [100, 100],
      [0, 0],
      [100, 100],
      5,
      [0]);
    player.pos[0] += player.speed * timeDifferential;
  }

  // handles directional shooting
  if (window.input.pressed('SHOOT') && player.direction === 'RIGHT' && ((Date.now() - previousShot) > 88)) {
    let x = player.pos[0] + (player.sprite.srcSize[0] / 2 + 35);
    let y = player.pos[1] + (player.sprite.srcSize[1] / 2 - 5);

    rightBullets.push(Bullets.bullet(x,y));
    rightBullets.push(Bullets.bulletDiagUp(x,y));
    rightBullets.push(Bullets.bulletDiagDown(x,y));
    previousShot = Date.now();
  } else if (window.input.pressed('SHOOT') && player.direction === 'LEFT' && ((Date.now() - previousShot) > 88)) {
    let x = player.pos[0] - (player.sprite.srcSize[0] / 2 - 21);
    let y = player.pos[1] + (player.sprite.srcSize[1] / 2 - 5);

    leftBullets.push(Bullets.bullet(x,y));
    leftBullets.push(Bullets.bulletDiagUp(x,y));
    leftBullets.push(Bullets.bulletDiagDown(x,y));
    previousShot = Date.now();
  }

  // handles player boundaries
  if (player.pos[0] < 0) {
     player.pos[0] = 0;
   }
   else if (player.pos[0] >= canvas.width - player.sprite.srcSize[0] - 10) {
     player.pos[0] = canvas.width - player.sprite.srcSize[0] - 10;
   }

   if (player.pos[1] < 0) {
     player.pos[1] = 0;
   }
   else if (player.pos[1] >= canvas.height - player.sprite.srcSize[1]) {
     player.pos[1] = canvas.height - player.sprite.srcSize[1];
   }
}

let lastTime;
function main() {
    let currentTime = Date.now();
    let timeDifferential = (currentTime - lastTime) / 1000.0;
    lastTime = currentTime;

    update(timeDifferential);
    requestAnimationFrame(main);
    render();
}

function init() {
    lastTime = Date.now();
    main();
}

// Game state
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let gameTime = 0;

let leftBullets = [];
let rightBullets = [];
let previousShot = Date.now();

let leftMonsters = [
  Monsters.taurospearLeft,
  Monsters.dragonTurtleLeft,
  Monsters.balrogLeft
];

let rightMonsters = [
  Monsters.taurospearRight,
  Monsters.dragonTurtleRight,
  Monsters.balrogRight
];

let killAnimation = [];

let isGameOver;

function clearCanvas() {
  ctx.clearRect(0, 0, 1200, 700);
}

function update(timeDifferential) {
  gameTime += timeDifferential;

  clearCanvas();
  handleInput(timeDifferential);
  updateAll(timeDifferential);
  checkCollisions(leftBullets, rightBullets, leftMonsters, rightMonsters);

  // Monsters.spawnRightMonsters(gameTime, canvas, rightMonsters);
  // Monsters.spawnLeftMonsters(gameTime, canvas, leftMonsters);
}

function updateAll(timeDifferential) {
  player.sprite.updateAnimation(timeDifferential);

  if (rightBullets.length + leftBullets.length >= 150) {
    rightBullets = rightBullets.slice(75);
    leftBullets = leftBullets.slice(75);
  }

  // persisting bullet animations upon moving character direction
  for (let i = 0; i < rightBullets.length; i++) {
    let currentRightBullet = rightBullets[i];

    switch (currentRightBullet.direction) {
      case 'straight':
        currentRightBullet.pos[0] += currentRightBullet.speed * timeDifferential;
        break;
      case 'diagUp':
        currentRightBullet.pos[0] += (currentRightBullet.speed) * timeDifferential;
        currentRightBullet.pos[1] -= (currentRightBullet.speed - 800) * timeDifferential;
        break;
      case 'diagDown':
        currentRightBullet.pos[0] += (currentRightBullet.speed) * timeDifferential;
        currentRightBullet.pos[1] += (currentRightBullet.speed - 800) * timeDifferential;
        break;
    }
  }
  for (let i = 0; i < leftBullets.length; i++) {
    let currentLeftBullet = leftBullets[i];

    switch (currentLeftBullet.direction) {
      case 'straight':
        currentLeftBullet.pos[0] -= (currentLeftBullet.speed) * timeDifferential;
        break;
      case 'diagUp':
        currentLeftBullet.pos[0] -= (currentLeftBullet.speed) * timeDifferential;
        currentLeftBullet.pos[1] -= (currentLeftBullet.speed - 800) * timeDifferential;
        break;
      case 'diagDown':
        currentLeftBullet.pos[0] -= currentLeftBullet.speed * timeDifferential;
        currentLeftBullet.pos[1] += (currentLeftBullet.speed - 800) * timeDifferential;
        break;
    }
  }

  for (let i = 0; i < leftMonsters.length; i++) {
    leftMonsters[i].pos[0] += leftMonsters[i].speed * timeDifferential;

      switch (leftMonsters[i].direction) {
        case 'straight':
        break;
        case 'diagUp':
        leftMonsters[i].pos[1] -= leftMonsters[i].speed * timeDifferential;
        break;
        case 'diagDown':
        leftMonsters[i].pos[1] += leftMonsters[i].speed * timeDifferential;
        break;
      }

    leftMonsters[i].sprite.updateAnimation(timeDifferential);

    if (
      leftMonsters[i].pos[0] > canvas.width ||
      leftMonsters[i].pos[1] < 0 ||
      leftMonsters[i].pos[1] > canvas.height
    ) {
      leftMonsters.splice(i, 1);
      i -= 1;
    }
  }

  for (let i = 0; i < rightMonsters.length; i++) {
    rightMonsters[i].pos[0] -= rightMonsters[i].speed * timeDifferential;

    rightMonsters[i].sprite.updateAnimation(timeDifferential);

    if (
      rightMonsters[i].pos[0] + rightMonsters[i].sprite.srcSize[0] < 0 ||
      rightMonsters[i].pos[1] < 0 ||
      rightMonsters[i].pos[1] > canvas.height
    ) {
      rightMonsters.splice(i, 1);
      i -= 1;
    }
  }

}

function render() {
  renderEntity(player);

  leftBullets.forEach( (bullet) => renderEntity(bullet));
  rightBullets.forEach( (bullet) => renderEntity(bullet));

  leftMonsters.forEach( (monster) => { renderEntity(monster); });
  rightMonsters.forEach( (monster) => { renderEntity(monster); });
}

function renderEntity(entity) {
  ctx.save();
  ctx.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(ctx);
  ctx.restore();
}

window.onload = init();

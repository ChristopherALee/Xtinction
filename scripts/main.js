import Sprite from './sprite.js';
import player from './player.js';
import bullet from './bullet.js';
import * as Monsters from './enemies.js';

let requestAnimFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

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

    rightBullets.push(bullet(x,y));
    previousShot = Date.now();
  } else if (window.input.pressed('SHOOT') && player.direction === 'LEFT' && ((Date.now() - previousShot) > 88)) {
    let x = player.pos[0] - (player.sprite.srcSize[0] / 2 - 21);
    let y = player.pos[1] + (player.sprite.srcSize[1] / 2 - 5);

    leftBullets.push(bullet(x,y));
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
    let now = Date.now();
    let timeDifferential = (now - lastTime) / 1000.0;

    update(timeDifferential);
    render();

    lastTime = now;
    requestAnimationFrame(main);
}

function init() {
    lastTime = Date.now();
    main();
}

// Game state
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let rightBullets = [];
let leftBullets = [];
let previousShot = Date.now();

let enemies = [
  Monsters.taurospear,
  Monsters.dragonTurtle,
  Monsters.balrog
];
let explosions = [];

let isGameOver;

function clearCanvas() {
  ctx.clearRect(0, 0, 1200, 700);
}

function update(timeDifferential) {
  clearCanvas();
  handleInput(timeDifferential);
  updateAll(timeDifferential);
  checkCollisions();
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

    currentRightBullet.pos[0] += currentRightBullet.speed * timeDifferential;
  }
  for (let i = 0; i < leftBullets.length; i++) {
    let currentLeftBullet = leftBullets[i];

    currentLeftBullet.pos[0] -= currentLeftBullet.speed * timeDifferential;
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].pos[0] -= enemies[i].speed * timeDifferential;
    enemies[i].sprite.updateAnimation(timeDifferential);

    if (enemies[i].pos[0] + enemies[i].sprite.srcSize[0] < 0) {
      enemies.splice(i, 1);
      i -= 1;
    }
  }

  enemies.forEach( (monster) => { monster.sprite.updateAnimation(timeDifferential); } )
}

function render() {
  renderEntity(player);

  rightBullets.forEach( (bullet) => renderEntity(bullet));
  leftBullets.forEach( (bullet) => renderEntity(bullet));

  enemies.forEach( (monster) => { renderEntity(monster); });
}

function renderEntity(object) {
  ctx.save();
  ctx.translate(object.pos[0], object.pos[1]);
  object.sprite.render(ctx);
  ctx.restore();
}

function isCollision(
  pos1X, pos1Y, size1X, size1Y,
  pos2X, pos2Y, size2X, size2Y) {
    return (
      pos1X < pos2X + size2X - 50 &&
      pos1X + size1X > pos2X &&
      pos1Y < pos2Y + size2Y - 70 &&
      size1X + pos1Y > pos2Y
    );
}

function checkCollisions() {
  for (let i = 0; i < enemies.length; i++) {
    let enemyPos = enemies[i].pos;
    let enemySize = enemies[i].sprite.srcSize;

    for (let j = 0; j < rightBullets.length; j++) {
      let rightBulletPos = rightBullets[j].pos;
      let rightBulletSize = rightBullets[j].sprite.srcSize;

      if (isCollision(
        enemyPos[0], enemyPos[1], enemySize[0], enemySize[1],
        rightBulletPos[0], rightBulletPos[1], rightBulletSize[0], rightBulletSize[1])) {
          enemies.splice(i, 1);
          i--;

          rightBullets.splice(j, 1);

          break;
      }
    }

    for (let j = 0; j < leftBullets.length; j++) {
      let leftBulletPos = leftBullets[j].pos;
      let leftBulletSize = leftBullets[j].sprite.srcSize;

      if (isCollision(
        enemyPos[0], enemyPos[1], enemySize[0], enemySize[1],
        leftBulletPos[0], leftBulletPos[1], leftBulletSize[0], leftBulletSize[1])) {
          enemies.splice(i, 1);
          i--;

          leftBullets.splice(j, 1);

          break;
      }
    }
  }
}

window.onload = init();

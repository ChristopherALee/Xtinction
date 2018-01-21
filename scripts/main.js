import Sprite from './sprite.js';
import * as Player from './player.js';
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
    if (Player.duckPlayer.direction === 'LEFT') {
      Player.duckPlayer.sprite = Player.duckSpriteLeft;
    } else {
      Player.duckPlayer.sprite = Player.duckSpriteRight;
    }
    Player.duckPlayer.pos[1] += Player.duckPlayer.speed * timeDifferential;
  }

  if (window.input.pressed('UP')) {
    if (Player.duckPlayer.direction === 'LEFT') {
      Player.duckPlayer.sprite = Player.duckSpriteLeft;
    } else {
      Player.duckPlayer.sprite = Player.duckSpriteRight;
    }
    Player.duckPlayer.pos[1] -= Player.duckPlayer.speed * timeDifferential;
  }

  if (window.input.pressed('LEFT')) {
    Player.duckPlayer.direction = 'LEFT';
    Player.duckPlayer.sprite = Player.duckSpriteLeft;
    Player.duckPlayer.pos[0] -= Player.duckPlayer.speed * timeDifferential;
  }

  if (window.input.pressed('RIGHT')) {
    Player.duckPlayer.direction = 'RIGHT';
    Player.duckPlayer.sprite = Player.duckSpriteRight;
    Player.duckPlayer.pos[0] += Player.duckPlayer.speed * timeDifferential;
  }

  if (
    (!activeKeys['LEFT'] && !activeKeys['UP'] && !activeKeys['DOWN'])
    && Player.duckPlayer.direction === 'LEFT') {
    Player.duckPlayer.sprite = Player.duckSpriteIdleLeft;
  }
  if (
    (!activeKeys['RIGHT'] && !activeKeys['UP'] && !activeKeys['DOWN'])
    && Player.duckPlayer.direction === 'RIGHT') {
    Player.duckPlayer.sprite = Player.duckSpriteIdleRight;
  }

  // handles directional shooting
  if (window.input.pressed('SHOOT') && Player.duckPlayer.direction === 'RIGHT' && ((Date.now() - previousShot) > 88)) {
    let x = Player.duckPlayer.pos[0] + (Player.duckPlayer.sprite.srcSize[0] / 2 + 15);
    let y = Player.duckPlayer.pos[1] + (Player.duckPlayer.sprite.srcSize[1] / 2 + 6);

    rightBullets.push(Bullets.bullet(x,y));
    rightBullets.push(Bullets.bulletDiagUp(x,y));
    rightBullets.push(Bullets.bulletDiagDown(x,y));
    previousShot = Date.now();
  } else if (window.input.pressed('SHOOT') && Player.duckPlayer.direction === 'LEFT' && ((Date.now() - previousShot) > 88)) {
    let x = Player.duckPlayer.pos[0] - (Player.duckPlayer.sprite.srcSize[0] / 2 - 15);
    let y = Player.duckPlayer.pos[1] + (Player.duckPlayer.sprite.srcSize[1] / 2 + 5);

    leftBullets.push(Bullets.bullet(x,y));
    leftBullets.push(Bullets.bulletDiagUp(x,y));
    leftBullets.push(Bullets.bulletDiagDown(x,y));
    previousShot = Date.now();
  }

  // handles Player.duckPlayer boundaries
  if (Player.duckPlayer.pos[0] < 0) {
     Player.duckPlayer.pos[0] = 0;
   }
   else if (Player.duckPlayer.pos[0] >= canvas.width - Player.duckPlayer.sprite.srcSize[0] - 10) {
     Player.duckPlayer.pos[0] = canvas.width - Player.duckPlayer.sprite.srcSize[0] - 10;
   }

   if (Player.duckPlayer.pos[1] < 0) {
     Player.duckPlayer.pos[1] = 0;
   }
   else if (Player.duckPlayer.pos[1] >= canvas.height - Player.duckPlayer.sprite.srcSize[1] - 15) {
     Player.duckPlayer.pos[1] = canvas.height - Player.duckPlayer.sprite.srcSize[1] - 15;
   }
}

const customRequestAnimationFrame = (main) => {
  return (
    window.requestAnimationFrame(main) ||
    window.mozRequestAnimationFrame(main) ||
    window.webkitRequestAnimationFrame(main) ||
    window.msRequestAnimationFrame(main)
  );
};

const gameOver = () => {
  $(".gameover-screen").show();
  isGameOver = true;
};

let lastTime;
function main() {
    let currentTime = Date.now();
    let timeDifferential = (currentTime - lastTime) / 1000.0;
    lastTime = currentTime;

    update(timeDifferential);
    customRequestAnimationFrame(main);
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

let spawnRate = 100;

let leftBullets = [];
let rightBullets = [];
let previousShot = Date.now();

let leftMonsters = [
  // Monsters.taurospearLeft,
  // Monsters.balrogLeft,
  // Monsters.wyvernLeft
];

let rightMonsters = [
  // Monsters.taurospearRight,
  // Monsters.balrogRight,
  // Monsters.wyvernRight
];

let hitAnimations = [];
let killAnimations = [];

let isGameOver = false;

function clearCanvas() {
  ctx.clearRect(0, 0, 1200, 700);
}

function update(timeDifferential) {
  gameTime += timeDifferential;

  if (spawnRate < 0) {
    spawnRate = 100;
  } else {
    spawnRate -= 1;
  }

  clearCanvas();
  handleInput(timeDifferential);
  updateAll(timeDifferential);
  checkCollisions(leftBullets, rightBullets, leftMonsters, rightMonsters, hitAnimations, killAnimations);

  Monsters.spawnRightMonsters(gameTime, canvas, rightMonsters, spawnRate);
  Monsters.spawnLeftMonsters(gameTime, canvas, leftMonsters, spawnRate);
}

function updateAll(timeDifferential) {
  Player.duckPlayer.sprite.updateAnimation(timeDifferential);

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

    if (
      currentRightBullet.pos[0] > canvas.width ||
      currentRightBullet.pos[1] > canvas.height ||
      currentRightBullet.pos[1] < 0
    ) {
      rightBullets.splice(i, 1);
      i -= 1;
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

    if (
      currentLeftBullet.pos[0] > canvas.width ||
      currentLeftBullet.pos[1] > canvas.height ||
      currentLeftBullet.pos[1] < 0
    ) {
      leftBullets.splice(i, 1);
      i -= 1;
    }
  }

  for (let i = 0; i < leftMonsters.length; i++) {
    leftMonsters[i].pos[0] += leftMonsters[i].speed * timeDifferential;

      switch (leftMonsters[i].direction) {
        case 'straight':
        break;
        case 'diagUp':
        leftMonsters[i].pos[1] -= (leftMonsters[i].speed / 4) * timeDifferential;
        break;
        case 'diagDown':
        leftMonsters[i].pos[1] += (leftMonsters[i].speed / 4) * timeDifferential;
        break;
      }

    leftMonsters[i].sprite.updateAnimation(timeDifferential);

    if (
      leftMonsters[i].pos[0] > canvas.width ||
      leftMonsters[i].pos[1] + leftMonsters[i].sprite.srcSize[1] < 0 ||
      leftMonsters[i].pos[1] > canvas.height
    ) {
      leftMonsters.splice(i, 1);
      i -= 1;
    }
  }

  for (let i = 0; i < rightMonsters.length; i++) {
    rightMonsters[i].pos[0] -= rightMonsters[i].speed * timeDifferential;

    switch (rightMonsters[i].direction) {
      case 'straight':
      break;
      case 'diagUp':
      rightMonsters[i].pos[1] -= (rightMonsters[i].speed / 4) * timeDifferential;
      break;
      case 'diagDown':
      rightMonsters[i].pos[1] += (rightMonsters[i].speed / 4) * timeDifferential;
      break;
    }

    rightMonsters[i].sprite.updateAnimation(timeDifferential);

    if (
      rightMonsters[i].pos[0] + rightMonsters[i].sprite.srcSize[0] < 0 ||
      rightMonsters[i].pos[1] + rightMonsters[i].sprite.srcSize[1] < 0 ||
      rightMonsters[i].pos[1] > canvas.height
    ) {
      rightMonsters.splice(i, 1);
      i -= 1;
    }
  }

  // animate hit animations
  for (let i = 0; i < hitAnimations.length; i++) {
    hitAnimations[i].sprite.updateAnimation(timeDifferential);

    if (hitAnimations[i].sprite.isDone) {
      hitAnimations.splice(i, 1);
      i -=1;
    }
  }

  // animate kill animations
  for (let i = 0; i < killAnimations.length; i++) {
    killAnimations[i].sprite.updateAnimation(timeDifferential);

    if (killAnimations[i].sprite.isDone) {
      killAnimations.splice(i, 1);
      i -= 1;
    }
  }

}

function render() {
  renderEntity(Player.duckPlayer);

  leftBullets.forEach( (bullet) => renderEntity(bullet));
  rightBullets.forEach( (bullet) => renderEntity(bullet));

  leftMonsters.forEach( (monster) => { renderEntity(monster); });
  rightMonsters.forEach( (monster) => { renderEntity(monster); });

  hitAnimations.forEach( (hit) => { renderEntity(hit); });
  killAnimations.forEach( (kill) => { renderEntity(kill); });
}

function renderEntity(entity) {
  ctx.save();
  ctx.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(ctx);
  ctx.restore();
}

// window.onload = init();
let introSong = document.getElementById("intro-song");
introSong.currentTime = 4;
// window.onload = introSong.play();

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 32) {
    document.getElementById("intro-song").pause();
    document.getElementById("main-song").play();

    $(".start-screen").hide();
    $("#canvas").show();
    init();
  }
});

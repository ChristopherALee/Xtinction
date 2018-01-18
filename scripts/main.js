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
const checkKeyPress = () => {
  let activeKeys = {};

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
  if (window.input.pressed('DOWN')) {
    player.pos[1] += player.speed * timeDifferential;
  }

  if (window.input.pressed('UP')) {
    player.pos[1] -= player.speed * timeDifferential;
  }

  if (window.input.pressed('LEFT')) {
    player.sprite = new Sprite(
      'https://i.imgur.com/T9EWHuO.png',
      [570, 874],
      [100, 100],
      [100, 100],
      5,
      [0]);
    player.pos[0] -= player.speed * timeDifferential;
  }

  if (window.input.pressed('RIGHT')) {
    player.sprite = new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [125, 874],
      [100, 100],
      [100, 100],
      5,
      [0]);
    player.pos[0] += player.speed * timeDifferential;
  }

  if (window.input.pressed('SHOOT')) {
    let x = player.pos[0] + (player.sprite.size[0] / 2 + 50);
    let y = player.pos[1] + (player.sprite.size[1] / 2 - 5);

    bullets.push(bullet(x,y));
  }

  // handles player bounds
  if (player.pos[0] < 0) {
     player.pos[0] = 0;
   }
   else if (player.pos[0] >= canvas.width - player.sprite.size[0] - 10) {
     player.pos[0] = canvas.width - player.sprite.size[0] - 10;
   }

   if (player.pos[1] < 0) {
     player.pos[1] = 0;
   }
   else if (player.pos[1] >= canvas.height - player.sprite.size[1]) {
     player.pos[1] = canvas.height - player.sprite.size[1];
   }
}

let lastTime;
function main() {
    let now = Date.now();
    let timeDifferential = (now - lastTime) / 1000.0;

    update(timeDifferential);
    render();

    lastTime = now;
    requestAnimFrame(main);
}

function init() {
    lastTime = Date.now();
    main();
}

// Game state
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let bullets = [];
let enemies = [];
let explosions = [];

let isGameOver;

function clearCanvas() {
  ctx.clearRect(0, 0, 1200, 700);
}

function update(timeDifferential) {
  clearCanvas();
  handleInput(timeDifferential);
  updateAll(timeDifferential);
}

function render() {
  renderEntity(player);
  bullets.forEach( (bullet) => renderEntity(bullet));
  renderEntity(Monsters.cerberus);
}

function renderEntity(object) {
  ctx.save();
  ctx.translate(object.pos[0], object.pos[1]);
  object.sprite.render(ctx);
  ctx.restore();
}

function updateAll(timeDifferential) {
  player.sprite.update(timeDifferential);
  bullets.forEach ( (bullet) => bullet.sprite.update(timeDifferential) );
  Monsters.cerberus.sprite.update(timeDifferential);
}

window.onload = init();

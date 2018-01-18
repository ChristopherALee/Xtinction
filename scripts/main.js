import Sprite from './sprite.js';

let requestAnimFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// player movement on key-press w/ event listeners
(function() {
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
    }
  }

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });

  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });

  window.input ={
    pressed: function(key) {
      return activeKeys[key];
    }
  };
})();

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
let player = {
    pos: [0, 250],
    sprite: new Sprite(
      'https://www.spriters-resource.com/resources/sheets/11/11226.gif',
      [0, 1000],
      [49.7, 45],
      [75, 75],
      5,
      [0, 2]),
    speed: 388
};
let grunt = {
  pos: [700, 250],
  sprite: new Sprite(
    'http://www.feplanet.net/media/sprites/8/battle/sheets/enemy/monster_cerberus_claws.gif',
    [5, 200],
    [75, 60],
    [200, 200],
    3,
    [0, 1]),
  speed: 100
};

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
  renderPlayer(player);
  renderPlayer(grunt);
}

function renderPlayer(object) {
  ctx.save();
  ctx.translate(object.pos[0], object.pos[1]);
  object.sprite.render(ctx);
  ctx.restore();
}

function handleInput(timeDifferential) {
  if (window.input.pressed('DOWN')) {
    player.pos[1] += player.speed * timeDifferential;
  }

  if (window.input.pressed('UP')) {
    player.pos[1] -= player.speed * timeDifferential;
  }

  if (window.input.pressed('LEFT')) {
    player.pos[0] -= player.speed * timeDifferential;
  }

  if (window.input.pressed('RIGHT')) {
    player.pos[0] += player.speed * timeDifferential;
  }

  if(player.pos[0] < 0) {
     player.pos[0] = 0;
   }
   else if (player.pos[0] >= canvas.width - player.sprite.size[0] - 30) {
     player.pos[0] = canvas.width - player.sprite.size[0] - 30;
   }

   if (player.pos[1] < 0) {
     player.pos[1] = 0;
   }
   else if (player.pos[1] >= canvas.height - player.sprite.size[1] - 30) {
     player.pos[1] = canvas.height - player.sprite.size[1] - 30;
   }
}

function updateAll(timeDifferential) {
  player.sprite.update(timeDifferential);
  grunt.sprite.update(timeDifferential);
}

window.onload = init();

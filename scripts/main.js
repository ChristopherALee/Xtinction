import Sprite from './sprite.js';
import input from './input.js';

let requestAnimFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function() {
  let pressedKeys = {};

  function setKey(e, status) {
    let keyCode = e.keyCode;
    let key;

    switch (keyCode) {
      case 87:
      key = 'UP';
      pressedKeys[key] = status;
      break;
      case 83:
      key = 'DOWN';
      pressedKeys[key] = status;
      break;
      case 65:
      key = 'LEFT';
      pressedKeys[key] = status;
      break;
      case 68:
      key = 'RIGHT';
      pressedKeys[key] = status;
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
      return pressedKeys[key];
    }
  };
})();

let lastTime;
function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    update(dt);
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
    sprite: new Sprite('https://www.spriters-resource.com/resources/sheets/11/11226.gif', [0, 1000], [49.7, 45], 5, [0, 2]),
    speed: 200
};

let bullets = [];
let enemies = [];
let explosions = [];

let gameTime = 0;
let isGameOver;

function clearCanvas() {
  ctx.clearRect(0, 0, 1200, 700);
}

function update(dt) {
  gameTime += dt;
  clearCanvas();
  handleInput(dt);
  updateEntities(dt);
}

function render() {
  renderPlayer(player);
}

function renderPlayer(object) {
  ctx.save();
  ctx.translate(object.pos[0], object.pos[1]);
  object.sprite.render(ctx);
  ctx.restore();
}

function handleInput(dt) {
  if(window.input.pressed('DOWN')) {
    player.pos[1] += player.speed * dt;
  }

  if(window.input.pressed('UP')) {
      player.pos[1] -= player.speed * dt;
  }

  if(window.input.pressed('LEFT')) {
      player.pos[0] -= player.speed * dt;
  }

  if(window.input.pressed('RIGHT')) {
      player.pos[0] += player.speed * dt;
  }
}

function updateEntities(dt) {
  player.sprite.update(dt);
}

window.onload = init();

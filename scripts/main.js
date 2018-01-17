import Sprite from './sprite.js';

let requestAnimFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
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
let player = {
    pos: [0, 0],
    sprite: new Sprite('https://www.spriters-resource.com/resources/sheets/11/11226.gif', [0, 1000], [55, 45], 16, [0, 1])
};

let bullets = [];
let enemies = [];
let explosions = [];

let gameTime = 0;
let isGameOver;

function update(dt) {
  gameTime += dt;

  handleInput(dt);
  updateEntities(dt);
}

function render() {
  renderPlayer(player);
}

function renderPlayer(object) {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.save();
  ctx.translate(object.pos[0], object.pos[1]);
  object.sprite.render(ctx);
  ctx.restore();
}

window.onload = init();

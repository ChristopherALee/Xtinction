import Sprite from './sprite.js';
import * as Player from './player.js';
import * as Bullets from './bullet.js';
import checkCollisions from './collisions.js';
import * as Monsters from './enemies.js';
import * as Ui from './ui.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.player = Player.duckPlayer;
    this.isGameOver = false;
    this.lastTime = Date.now();
    this.gameTime = 0;
    this.willReset = false;
    this.spawnRate = 125;
    this.leftBullets = [];
    this.rightBullets = [];
    this.previousShot = Date.now();
    this.leftMonsters = [];
    this.rightMonsters = [];
    this.hitAnimations = [];
    this.killAnimations = [];
    this.introSong = document.getElementById("intro-song");
    this.introSong.currentTime = 4;
    this.onGameScreen = false;
    this.score = 0;
  }

  deadPlayer() {
    return {
      pos: this.player.pos,
      sprite: new Sprite (
        'https://i.imgur.com/bxHEJ6i.png',
        [15, 350],
        [60, 60],
        [0, 0],
        [75, 75],
        1,
        [0]
      ),
      speed: 388,
      direction: 'RIGHT'
    };
  }

  customRequestAnimationFrame(main) {
    return (
      window.requestAnimationFrame(main) ||
      window.mozRequestAnimationFrame(main) ||
      window.webkitRequestAnimationFrame(main) ||
      window.msRequestAnimationFrame(main)
    );
  }

  gameOverOverlay(e) {
    if (e.keyCode == 13) {
      // press enter to play again
      $(".gameover-overlay").hide();
      $(".gameover-screen").hide();
      this.reset();
      this.willReset = true;
    }
  }

  handleInput(timeDifferential) {
    // handles player movement
    if (window.input.pressed('DOWN') && !this.isGameOver) {
      if (this.player.direction === 'LEFT') {
        this.player.sprite = Player.duckSpriteLeft;
      } else {
        this.player.sprite = Player.duckSpriteRight;
      }
      this.player.pos[1] += this.player.speed * timeDifferential;
    }

    if (window.input.pressed('UP') && !this.isGameOver) {
      if (this.player.direction === 'LEFT') {
        this.player.sprite = Player.duckSpriteLeft;
      } else {
        this.player.sprite = Player.duckSpriteRight;
      }
      this.player.pos[1] -= this.player.speed * timeDifferential;
    }

    if (window.input.pressed('LEFT') && !this.isGameOver) {
      this.player.direction = 'LEFT';
      this.player.sprite = Player.duckSpriteLeft;
      this.player.pos[0] -= this.player.speed * timeDifferential;
    }

    if (window.input.pressed('RIGHT') && !this.isGameOver) {
      this.player.direction = 'RIGHT';
      this.player.sprite = Player.duckSpriteRight;
      this.player.pos[0] += this.player.speed * timeDifferential;
    }

    if (
      (!activeKeys['LEFT'] && !activeKeys['UP'] && !activeKeys['DOWN'])
      && this.player.direction === 'LEFT') {
      this.player.sprite = Player.duckSpriteIdleLeft;
    }
    if (
      (!activeKeys['RIGHT'] && !activeKeys['UP'] && !activeKeys['DOWN'])
      && this.player.direction === 'RIGHT') {
      this.player.sprite = Player.duckSpriteIdleRight;
    }

    // handles directional shooting
    if (window.input.pressed('SHOOT') && !this.isGameOver && this.player.direction === 'RIGHT' && ((Date.now() - this.previousShot) > 88)) {
      let x = this.player.pos[0] + (this.player.sprite.srcSize[0] / 2 + 15);
      let y = this.player.pos[1] + (this.player.sprite.srcSize[1] / 2 + 6);

      this.rightBullets.push(Bullets.bullet(x,y));
      this.rightBullets.push(Bullets.bulletDiagUp(x,y));
      this.rightBullets.push(Bullets.bulletDiagDown(x,y));
      this.previousShot = Date.now();
    } else if (window.input.pressed('SHOOT') && !this.isGameOver && this.player.direction === 'LEFT' && ((Date.now() - this.previousShot) > 88)) {
      let x = this.player.pos[0] - (this.player.sprite.srcSize[0] / 2 - 15);
      let y = this.player.pos[1] + (this.player.sprite.srcSize[1] / 2 + 5);

      this.leftBullets.push(Bullets.bullet(x,y));
      this.leftBullets.push(Bullets.bulletDiagUp(x,y));
      this.leftBullets.push(Bullets.bulletDiagDown(x,y));
      this.previousShot = Date.now();
    }

    // handles this.player boundaries
    if (this.player.pos[0] < 0) {
       this.player.pos[0] = 0;
     }
     else if (this.player.pos[0] >= this.canvas.width - this.player.sprite.srcSize[0] - 10) {
       this.player.pos[0] = this.canvas.width - this.player.sprite.srcSize[0] - 10;
     }

     if (this.player.pos[1] < 0) {
       this.player.pos[1] = 0;
     }
     else if (this.player.pos[1] >= this.canvas.height - this.player.sprite.srcSize[1] - 15) {
       this.player.pos[1] = this.canvas.height - this.player.sprite.srcSize[1] - 15;
     }
  }

  gameOver() {
    $(".gameover-overlay").show();
    $(".gameover-screen").show();
    this.isGameOver = true;
  }

  reset() {
    this.gameTime = 0;
    this.spawnRate = 125;
    this.willReset = false;
    this.leftBullets = [];
    this.rightBullets = [];
    this.leftMonsters = [];
    this.rightMonsters = [];
    this.hitAnimations = [];
    this.killAnimations = [];
    this.isGameOver = false;
    this.player.pos = [550, 350];
  }

  init() {
    document.removeEventListener("keydown", startGame);
    this.lastTime = Date.now();
    this.main();
  }

  main() {
    let currentTime = Date.now();
    let timeDifferential = (currentTime - this.lastTime) / 1000.0;
    this.lastTime = currentTime;

    this.update(timeDifferential);
    this.customRequestAnimationFrame(this.main.bind(this));
    this.render();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 1200, 700);
  }

  update(timeDifferential) {
    this.gameTime += timeDifferential;

    if (this.spawnRate < 0) {
      this.spawnRate = 125;
    } else {
      this.spawnRate -= 1;
    }

    this.clearCanvas();
    this.handleInput(timeDifferential);
    this.updateAll(timeDifferential);
    checkCollisions(this.player, this.willReset, this.leftBullets, this.rightBullets, this.leftMonsters, this.rightMonsters, this.hitAnimations, this.killAnimations, this.gameOver.bind(this));

    Monsters.spawnRightMonsters(this.gameTime, this.canvas, this.rightMonsters, this.spawnRate);
    Monsters.spawnLeftMonsters(this.gameTime, this.canvas, this.leftMonsters, this.spawnRate);
  }

  updateAll(timeDifferential) {
    this.player.sprite.updateAnimation(timeDifferential);

    // persisting bullet animations upon moving character direction
    for (let i = 0; i < this.rightBullets.length; i++) {
      let currentRightBullet = this.rightBullets[i];

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
        currentRightBullet.pos[0] > this.canvas.width ||
        currentRightBullet.pos[1] > this.canvas.height ||
        currentRightBullet.pos[1] < 0
      ) {
        this.rightBullets.splice(i, 1);
        i -= 1;
      }
    }
    for (let i = 0; i < this.leftBullets.length; i++) {
      let currentLeftBullet = this.leftBullets[i];

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
        currentLeftBullet.pos[0] > this.canvas.width ||
        currentLeftBullet.pos[1] > this.canvas.height ||
        currentLeftBullet.pos[1] < 0
      ) {
        this.leftBullets.splice(i, 1);
        i -= 1;
      }
    }

    for (let i = 0; i < this.leftMonsters.length; i++) {
      this.leftMonsters[i].pos[0] += this.leftMonsters[i].speed * timeDifferential;

        switch (this.leftMonsters[i].direction) {
          case 'straight':
          break;
          case 'diagUp':
          this.leftMonsters[i].pos[1] -= (this.leftMonsters[i].speed / 4) * timeDifferential;
          break;
          case 'diagDown':
          this.leftMonsters[i].pos[1] += (this.leftMonsters[i].speed / 4) * timeDifferential;
          break;
        }

      this.leftMonsters[i].sprite.updateAnimation(timeDifferential);

      if (
        this.leftMonsters[i].pos[0] > this.canvas.width ||
        this.leftMonsters[i].pos[1] + this.leftMonsters[i].sprite.srcSize[1] < 0 ||
        this.leftMonsters[i].pos[1] > this.canvas.height
      ) {
        this.leftMonsters.splice(i, 1);
        i -= 1;
      }
    }

    for (let i = 0; i < this.rightMonsters.length; i++) {
      this.rightMonsters[i].pos[0] -= this.rightMonsters[i].speed * timeDifferential;

      switch (this.rightMonsters[i].direction) {
        case 'straight':
        break;
        case 'diagUp':
        this.rightMonsters[i].pos[1] -= (this.rightMonsters[i].speed / 4) * timeDifferential;
        break;
        case 'diagDown':
        this.rightMonsters[i].pos[1] += (this.rightMonsters[i].speed / 4) * timeDifferential;
        break;
      }

      this.rightMonsters[i].sprite.updateAnimation(timeDifferential);

      if (
        this.rightMonsters[i].pos[0] + this.rightMonsters[i].sprite.srcSize[0] < 0 ||
        this.rightMonsters[i].pos[1] + this.rightMonsters[i].sprite.srcSize[1] < 0 ||
        this.rightMonsters[i].pos[1] > this.canvas.height
      ) {
        this.rightMonsters.splice(i, 1);
        i -= 1;
      }
    }

    // animate hit animations
    for (let i = 0; i < this.hitAnimations.length; i++) {
      this.hitAnimations[i].sprite.updateAnimation(timeDifferential);

      if (this.hitAnimations[i].sprite.isDone) {
        this.hitAnimations.splice(i, 1);
        i -=1;
      }
    }

    // animate kill animations
    for (let i = 0; i < this.killAnimations.length; i++) {
      this.killAnimations[i].sprite.updateAnimation(timeDifferential);

      if (this.killAnimations[i].sprite.isDone) {
        this.killAnimations.splice(i, 1);
        i -= 1;
      }
    }
  }

  render() {
    if (this.isGameOver) {
      this.renderEntity(this.deadPlayer());
      document.addEventListener('keydown', this.gameOverOverlay.bind(this));
    } else {
      this.renderEntity(this.player);
      document.removeEventListener('keydown', this.gameOverOverlay.bind(this));
    }

    this.leftBullets.forEach( (bullet) => this.renderEntity(bullet));
    this.rightBullets.forEach( (bullet) => this.renderEntity(bullet));

    this.leftMonsters.forEach( (monster) => { this.renderEntity(monster); });
    this.rightMonsters.forEach( (monster) => { this.renderEntity(monster); });

    this.hitAnimations.forEach( (hit) => { this.renderEntity(hit); });
    this.killAnimations.forEach( (kill) => { this.renderEntity(kill); });
  }

  renderEntity(entity) {
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx);
    this.ctx.restore();
  }
}

// UI and Event Listeners
let activeKeys = {};
function checkKeyPress() {
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
}
checkKeyPress();

let introSong = document.getElementById("intro-song");
introSong.currentTime = 4;
window.onload = introSong.play();
let onGameScreen = false;
let isIntroMuted = false;
let isMainMuted = false;

const startGame = (e) => {
  if (e.keyCode == 32) {
    // press spacebar to start the game
    document.getElementById("intro-song").pause();

    $(".start-screen").hide();
    $("#canvas").show();
    onGameScreen = true;

    if (isIntroMuted) {
      isMainMuted = true;
      $('#mute')[0].innerHTML = '<i class="fas fa-volume-off fa-5x"></i>';
    } else {
      document.getElementById("main-song").play();
    }

    const newGame = new Game();
    newGame.init();
  }
};
document.addEventListener('keydown', startGame);

// // toggle music
$('#mute')[0].addEventListener('click', () => {
  if (onGameScreen) {
    if (isMainMuted) {
      document.getElementById("main-song").play();
      isMainMuted = false;
      $('#mute')[0].innerHTML = '<i class="fas fa-volume-up fa-5x"></i>';
    } else {
      document.getElementById("main-song").pause();
      isMainMuted = true;
      $('#mute')[0].innerHTML = '<i class="fas fa-volume-off fa-5x"></i>';
    }
  } else {
    if (isIntroMuted) {
      document.getElementById("intro-song").play();
      isIntroMuted = false;
      $('#mute')[0].innerHTML = '<i class="fas fa-volume-up fa-5x"></i>';
    } else {
      document.getElementById("intro-song").pause();
      isIntroMuted = true;
      $('#mute')[0].innerHTML = '<i class="fas fa-volume-off fa-5x"></i>';
    }
  }
});

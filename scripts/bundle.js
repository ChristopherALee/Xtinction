/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function () {
  function Sprite(url, srcPos, srcSize, canvasPos, canvasSize, speed, frames, timed) {
    _classCallCheck(this, Sprite);

    this.url = url;
    this.srcPos = srcPos;
    this.srcSize = srcSize;
    this.canvasPos = canvasPos;
    this.canvasSize = canvasSize;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.frameIdx = 0;
    this.timed = timed;
    this.isDone = false;
  }

  _createClass(Sprite, [{
    key: 'updateAnimation',
    value: function updateAnimation(timeDifferential) {
      this.frameIdx += this.speed * timeDifferential;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      var frame = void 0;

      if (this.speed > 0) {
        var allFrames = this.frames.length;
        var idx = Math.floor(this.frameIdx);
        frame = this.frames[idx % allFrames];

        if (idx >= this.frames.length) {
          this.isDone = true;
        }
      } else {
        frame = 0;
      }

      var x = this.srcPos[0];
      x += frame * this.srcSize[0];

      var newImage = new Image(this.srcSize[0], this.srcSize[1]);
      newImage.src = this.url;

      if (!this.timed) {
        ctx.drawImage(newImage, x, this.srcPos[1], this.srcSize[0], this.srcSize[1], this.canvasPos[0], this.canvasPos[1], this.canvasSize[0], this.canvasSize[1]);
      } else if (this.timed && !this.isDone) {
        ctx.drawImage(newImage, x, this.srcPos[1], this.srcSize[0], this.srcSize[1], this.canvasPos[0], this.canvasPos[1], this.canvasSize[0], this.canvasSize[1]);
      }
    }
  }]);

  return Sprite;
}();

exports.default = Sprite;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameOver = undefined;

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _player = __webpack_require__(2);

var Player = _interopRequireWildcard(_player);

var _bullet = __webpack_require__(3);

var Bullets = _interopRequireWildcard(_bullet);

var _collisions = __webpack_require__(4);

var _collisions2 = _interopRequireDefault(_collisions);

var _enemies = __webpack_require__(5);

var Monsters = _interopRequireWildcard(_enemies);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isGameOver = false;

// player movement on key-press w/ event listeners
var activeKeys = {};
var checkKeyPress = function checkKeyPress() {
  function setKey(e, status) {
    var keyCode = e.keyCode;
    var key = void 0;

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

  document.addEventListener('keydown', function (e) {
    setKey(e, true);
  });

  document.addEventListener('keyup', function (e) {
    setKey(e, false);
  });

  window.input = {
    pressed: function pressed(key) {
      return activeKeys[key];
    }
  };
};
checkKeyPress();

function handleInput(timeDifferential) {

  // handles player movement
  if (window.input.pressed('DOWN') && !isGameOver) {
    if (Player.duckPlayer.direction === 'LEFT') {
      Player.duckPlayer.sprite = Player.duckSpriteLeft;
    } else {
      Player.duckPlayer.sprite = Player.duckSpriteRight;
    }
    Player.duckPlayer.pos[1] += Player.duckPlayer.speed * timeDifferential;
  }

  if (window.input.pressed('UP') && !isGameOver) {
    if (Player.duckPlayer.direction === 'LEFT') {
      Player.duckPlayer.sprite = Player.duckSpriteLeft;
    } else {
      Player.duckPlayer.sprite = Player.duckSpriteRight;
    }
    Player.duckPlayer.pos[1] -= Player.duckPlayer.speed * timeDifferential;
  }

  if (window.input.pressed('LEFT') && !isGameOver) {
    Player.duckPlayer.direction = 'LEFT';
    Player.duckPlayer.sprite = Player.duckSpriteLeft;
    Player.duckPlayer.pos[0] -= Player.duckPlayer.speed * timeDifferential;
  }

  if (window.input.pressed('RIGHT') && !isGameOver) {
    Player.duckPlayer.direction = 'RIGHT';
    Player.duckPlayer.sprite = Player.duckSpriteRight;
    Player.duckPlayer.pos[0] += Player.duckPlayer.speed * timeDifferential;
  }

  if (!activeKeys['LEFT'] && !activeKeys['UP'] && !activeKeys['DOWN'] && Player.duckPlayer.direction === 'LEFT') {
    Player.duckPlayer.sprite = Player.duckSpriteIdleLeft;
  }
  if (!activeKeys['RIGHT'] && !activeKeys['UP'] && !activeKeys['DOWN'] && Player.duckPlayer.direction === 'RIGHT') {
    Player.duckPlayer.sprite = Player.duckSpriteIdleRight;
  }

  // handles directional shooting
  if (window.input.pressed('SHOOT') && !isGameOver && Player.duckPlayer.direction === 'RIGHT' && Date.now() - previousShot > 88) {
    var x = Player.duckPlayer.pos[0] + (Player.duckPlayer.sprite.srcSize[0] / 2 + 15);
    var y = Player.duckPlayer.pos[1] + (Player.duckPlayer.sprite.srcSize[1] / 2 + 6);

    rightBullets.push(Bullets.bullet(x, y));
    rightBullets.push(Bullets.bulletDiagUp(x, y));
    rightBullets.push(Bullets.bulletDiagDown(x, y));
    previousShot = Date.now();
  } else if (window.input.pressed('SHOOT') && !isGameOver && Player.duckPlayer.direction === 'LEFT' && Date.now() - previousShot > 88) {
    var _x = Player.duckPlayer.pos[0] - (Player.duckPlayer.sprite.srcSize[0] / 2 - 15);
    var _y = Player.duckPlayer.pos[1] + (Player.duckPlayer.sprite.srcSize[1] / 2 + 5);

    leftBullets.push(Bullets.bullet(_x, _y));
    leftBullets.push(Bullets.bulletDiagUp(_x, _y));
    leftBullets.push(Bullets.bulletDiagDown(_x, _y));
    previousShot = Date.now();
  }

  // handles Player.duckPlayer boundaries
  if (Player.duckPlayer.pos[0] < 0) {
    Player.duckPlayer.pos[0] = 0;
  } else if (Player.duckPlayer.pos[0] >= canvas.width - Player.duckPlayer.sprite.srcSize[0] - 10) {
    Player.duckPlayer.pos[0] = canvas.width - Player.duckPlayer.sprite.srcSize[0] - 10;
  }

  if (Player.duckPlayer.pos[1] < 0) {
    Player.duckPlayer.pos[1] = 0;
  } else if (Player.duckPlayer.pos[1] >= canvas.height - Player.duckPlayer.sprite.srcSize[1] - 15) {
    Player.duckPlayer.pos[1] = canvas.height - Player.duckPlayer.sprite.srcSize[1] - 15;
  }
}

var customRequestAnimationFrame = function customRequestAnimationFrame(main) {
  return window.requestAnimationFrame(main) || window.mozRequestAnimationFrame(main) || window.webkitRequestAnimationFrame(main) || window.msRequestAnimationFrame(main);
};

var gameOver = exports.gameOver = function gameOver() {
  $(".gameover-overlay").show();
  $(".gameover-screen").show();
  isGameOver = true;
};

var reset = function reset() {
  gameTime = 0;
  spawnRate = 125;
  willReset = false;
  leftBullets = [];
  rightBullets = [];
  leftMonsters = [];
  rightMonsters = [];
  hitAnimations = [];
  killAnimations = [];
  isGameOver = false;
  Player.duckPlayer.pos = [550, 350];
};

var lastTime = void 0;
function main() {
  var currentTime = Date.now();
  var timeDifferential = (currentTime - lastTime) / 1000.0;
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
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var deadPlayer = function deadPlayer() {
  return {
    pos: Player.duckPlayer.pos,
    sprite: new _sprite2.default('https://i.imgur.com/bxHEJ6i.png', [15, 350], [60, 60], [0, 0], [75, 75], 1, [0]),
    speed: 388,
    direction: 'RIGHT'
  };
};
var gameTime = 0;
var willReset = false;

var spawnRate = 125;

var leftBullets = [];
var rightBullets = [];
var previousShot = Date.now();

var leftMonsters = [];
var rightMonsters = [];

var hitAnimations = [];
var killAnimations = [];

function clearCanvas() {
  ctx.clearRect(0, 0, 1200, 700);
}

function update(timeDifferential) {
  gameTime += timeDifferential;

  if (spawnRate < 0) {
    spawnRate = 125;
  } else {
    spawnRate -= 1;
  }

  clearCanvas();
  handleInput(timeDifferential);
  updateAll(timeDifferential);
  (0, _collisions2.default)(Player.duckPlayer, willReset, leftBullets, rightBullets, leftMonsters, rightMonsters, hitAnimations, killAnimations);

  Monsters.spawnRightMonsters(gameTime, canvas, rightMonsters, spawnRate);
  Monsters.spawnLeftMonsters(gameTime, canvas, leftMonsters, spawnRate);
}

function updateAll(timeDifferential) {
  Player.duckPlayer.sprite.updateAnimation(timeDifferential);

  // persisting bullet animations upon moving character direction
  for (var i = 0; i < rightBullets.length; i++) {
    var currentRightBullet = rightBullets[i];

    switch (currentRightBullet.direction) {
      case 'straight':
        currentRightBullet.pos[0] += currentRightBullet.speed * timeDifferential;
        break;
      case 'diagUp':
        currentRightBullet.pos[0] += currentRightBullet.speed * timeDifferential;
        currentRightBullet.pos[1] -= (currentRightBullet.speed - 800) * timeDifferential;
        break;
      case 'diagDown':
        currentRightBullet.pos[0] += currentRightBullet.speed * timeDifferential;
        currentRightBullet.pos[1] += (currentRightBullet.speed - 800) * timeDifferential;
        break;
    }

    if (currentRightBullet.pos[0] > canvas.width || currentRightBullet.pos[1] > canvas.height || currentRightBullet.pos[1] < 0) {
      rightBullets.splice(i, 1);
      i -= 1;
    }
  }
  for (var _i = 0; _i < leftBullets.length; _i++) {
    var currentLeftBullet = leftBullets[_i];

    switch (currentLeftBullet.direction) {
      case 'straight':
        currentLeftBullet.pos[0] -= currentLeftBullet.speed * timeDifferential;
        break;
      case 'diagUp':
        currentLeftBullet.pos[0] -= currentLeftBullet.speed * timeDifferential;
        currentLeftBullet.pos[1] -= (currentLeftBullet.speed - 800) * timeDifferential;
        break;
      case 'diagDown':
        currentLeftBullet.pos[0] -= currentLeftBullet.speed * timeDifferential;
        currentLeftBullet.pos[1] += (currentLeftBullet.speed - 800) * timeDifferential;
        break;
    }

    if (currentLeftBullet.pos[0] > canvas.width || currentLeftBullet.pos[1] > canvas.height || currentLeftBullet.pos[1] < 0) {
      leftBullets.splice(_i, 1);
      _i -= 1;
    }
  }

  for (var _i2 = 0; _i2 < leftMonsters.length; _i2++) {
    leftMonsters[_i2].pos[0] += leftMonsters[_i2].speed * timeDifferential;

    switch (leftMonsters[_i2].direction) {
      case 'straight':
        break;
      case 'diagUp':
        leftMonsters[_i2].pos[1] -= leftMonsters[_i2].speed / 4 * timeDifferential;
        break;
      case 'diagDown':
        leftMonsters[_i2].pos[1] += leftMonsters[_i2].speed / 4 * timeDifferential;
        break;
    }

    leftMonsters[_i2].sprite.updateAnimation(timeDifferential);

    if (leftMonsters[_i2].pos[0] > canvas.width || leftMonsters[_i2].pos[1] + leftMonsters[_i2].sprite.srcSize[1] < 0 || leftMonsters[_i2].pos[1] > canvas.height) {
      leftMonsters.splice(_i2, 1);
      _i2 -= 1;
    }
  }

  for (var _i3 = 0; _i3 < rightMonsters.length; _i3++) {
    rightMonsters[_i3].pos[0] -= rightMonsters[_i3].speed * timeDifferential;

    switch (rightMonsters[_i3].direction) {
      case 'straight':
        break;
      case 'diagUp':
        rightMonsters[_i3].pos[1] -= rightMonsters[_i3].speed / 4 * timeDifferential;
        break;
      case 'diagDown':
        rightMonsters[_i3].pos[1] += rightMonsters[_i3].speed / 4 * timeDifferential;
        break;
    }

    rightMonsters[_i3].sprite.updateAnimation(timeDifferential);

    if (rightMonsters[_i3].pos[0] + rightMonsters[_i3].sprite.srcSize[0] < 0 || rightMonsters[_i3].pos[1] + rightMonsters[_i3].sprite.srcSize[1] < 0 || rightMonsters[_i3].pos[1] > canvas.height) {
      rightMonsters.splice(_i3, 1);
      _i3 -= 1;
    }
  }

  // animate hit animations
  for (var _i4 = 0; _i4 < hitAnimations.length; _i4++) {
    hitAnimations[_i4].sprite.updateAnimation(timeDifferential);

    if (hitAnimations[_i4].sprite.isDone) {
      hitAnimations.splice(_i4, 1);
      _i4 -= 1;
    }
  }

  // animate kill animations
  for (var _i5 = 0; _i5 < killAnimations.length; _i5++) {
    killAnimations[_i5].sprite.updateAnimation(timeDifferential);

    if (killAnimations[_i5].sprite.isDone) {
      killAnimations.splice(_i5, 1);
      _i5 -= 1;
    }
  }
}

function render() {
  if (isGameOver) {
    renderEntity(deadPlayer());
  } else {
    renderEntity(Player.duckPlayer);
  }

  leftBullets.forEach(function (bullet) {
    return renderEntity(bullet);
  });
  rightBullets.forEach(function (bullet) {
    return renderEntity(bullet);
  });

  leftMonsters.forEach(function (monster) {
    renderEntity(monster);
  });
  rightMonsters.forEach(function (monster) {
    renderEntity(monster);
  });

  hitAnimations.forEach(function (hit) {
    renderEntity(hit);
  });
  killAnimations.forEach(function (kill) {
    renderEntity(kill);
  });
}

function renderEntity(entity) {
  ctx.save();
  ctx.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(ctx);
  ctx.restore();
}

var introSong = document.getElementById("intro-song");
introSong.currentTime = 4;
window.onload = introSong.play();
var onGameScreen = false;

document.addEventListener('keydown', function (e) {
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

    init();
  } else if (e.keyCode == 13) {
    // press enter to play again
    $(".gameover-overlay").hide();
    $(".gameover-screen").hide();
    reset();
    willReset = true;
  }
});

var isIntroMuted = false;
var isMainMuted = false;
$('#mute')[0].addEventListener('click', function () {
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duckPlayer = exports.duckSpriteRight = exports.duckSpriteLeft = exports.duckSpriteIdleRight = exports.duckSpriteIdleLeft = exports.robotPlayer = undefined;

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// robot player
var robotPlayer = exports.robotPlayer = {
  pos: [550, 350],
  sprite: new _sprite2.default('https://i.imgur.com/6n1qcVc.png', [125, 874], [100, 100], [0, 0], [100, 100], 5, [0]),
  speed: 388,
  direction: 'RIGHT'
};

// duck player
var duckSpriteIdleLeft = exports.duckSpriteIdleLeft = new _sprite2.default('https://i.imgur.com/IsLSheM.png', [0, 37.7], [60, 60], [0, 0], [75, 75], 8, [0]);

var duckSpriteIdleRight = exports.duckSpriteIdleRight = new _sprite2.default('https://i.imgur.com/bxHEJ6i.png', [93, 37.7], [60, 60], [0, 0], [75, 75], 8, [0]);

var duckSpriteLeft = exports.duckSpriteLeft = new _sprite2.default('https://i.imgur.com/IsLSheM.png', [0, 145], [60, 60], [0, 0], [75, 75], 8, [0, 1, 2, 3]);

var duckSpriteRight = exports.duckSpriteRight = new _sprite2.default('https://i.imgur.com/bxHEJ6i.png', [88, 145], [60, 60], [0, 0], [75, 75], 8, [0, 1, 2, 3]);

// starting position
var duckPlayer = exports.duckPlayer = {
  pos: [550, 350],
  sprite: duckSpriteIdleRight,
  speed: 388,
  direction: 'RIGHT'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulletDiagDown = exports.bulletDiagUp = exports.bullet = undefined;

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullet = exports.bullet = function bullet(x, y) {
  return {
    pos: [x, y],
    sprite: new _sprite2.default('https://i.imgur.com/6n1qcVc.png', [725, 190], [60, 60], [0, 0], [60, 60], 0, [0]),
    speed: 1000,
    direction: 'straight'
  };
};

var bulletDiagUp = exports.bulletDiagUp = function bulletDiagUp(x, y) {
  return {
    pos: [x, y],
    sprite: new _sprite2.default('https://i.imgur.com/6n1qcVc.png', [725, 190], [60, 60], [0, 0], [60, 60], 0, [0]),
    speed: 1000,
    direction: 'diagUp'
  };
};

var bulletDiagDown = exports.bulletDiagDown = function bulletDiagDown(x, y) {
  return {
    pos: [x, y],
    sprite: new _sprite2.default('https://i.imgur.com/6n1qcVc.png', [725, 190], [60, 60], [0, 0], [60, 60], 0, [0]),
    speed: 1000,
    direction: 'diagDown'
  };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _main = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isCollision(pos1X, pos1Y, size1X, size1Y, pos2X, pos2Y, size2X, size2Y) {
  return pos1X < pos2X + size2X - 50 && pos1X + size1X - 100 > pos2X && pos1Y < pos2Y + size2Y - 70 && size1X + pos1Y > pos2Y;
}

var score = 0;

function checkCollisions(player, willReset, leftBullets, rightBullets, leftMonsters, rightMonsters, hitAnimations, killAnimations) {

  if (willReset && rightMonsters.length === 0 && leftMonsters.length === 0) {
    score = 0;
  }

  document.getElementById('score').innerHTML = 'Score: ' + score;

  // right monster collisions
  for (var i = 0; i < rightMonsters.length; i++) {
    var enemyPos = rightMonsters[i].pos;
    var enemySize = rightMonsters[i].sprite.srcSize;

    // player death
    if (isCollision(enemyPos[0], enemyPos[1] - 73, enemySize[0], enemySize[1], player.pos[0], player.pos[1], player.sprite.srcSize[0], player.sprite.srcSize[1])) {
      (0, _main.gameOver)();
    }

    for (var j = 0; j < rightBullets.length; j++) {
      var rightBulletPos = rightBullets[j].pos;
      var rightBulletSize = rightBullets[j].sprite.srcSize;

      if (isCollision(enemyPos[0], enemyPos[1], enemySize[0], enemySize[1], rightBulletPos[0], rightBulletPos[1], rightBulletSize[0], rightBulletSize[1])) {

        rightMonsters[i].hp -= 1;
        rightBullets.splice(j, 1);

        hitAnimations.push({
          pos: rightBulletPos,
          sprite: new _sprite2.default('https://i.imgur.com/LpgLmNZ.png', [35, 860], [75, 75], [0, 0], [40, 40], 10, [0], true)
        });

        if (rightMonsters[i].hp === 0) {
          // death animation
          switch (rightMonsters[i].type) {
            case 'balrog':
              killAnimations.push({
                pos: enemyPos,
                sprite: new _sprite2.default('https://i.imgur.com/WvHlsqj.png', [-50, 2350], [230, 230], [0, 0], [200, 200], 5, [0, 1, 2], true)
              });
              score += 2;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: enemyPos,
                sprite: new _sprite2.default('https://i.imgur.com/jHYJaMs.png', [-10, 930], [215, 175], [0, 0], [190, 190], 6, [0, 1, 2, 3, 4, 5, 6, 7], true)
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: enemyPos,
                sprite: new _sprite2.default('https://i.imgur.com/MAUkqfk.png', [5, 1600], [175, 175], [0, 0], [170, 170], 6, [0, 1, 2, 3, 4, 5, 6], true)
              });
              score += 1;
              break;
          }

          document.getElementById('score').innerHTML = 'Score: ' + score;
          rightMonsters.splice(i, 1);
          i -= 1;

          break;
        }
      }
    }

    for (var _j = 0; _j < leftBullets.length; _j++) {
      var leftBulletPos = leftBullets[_j].pos;
      var leftBulletSize = leftBullets[_j].sprite.srcSize;

      if (isCollision(enemyPos[0], enemyPos[1], enemySize[0], enemySize[1], leftBulletPos[0], leftBulletPos[1], leftBulletSize[0], leftBulletSize[1])) {

        rightMonsters[i].hp -= 1;
        leftBullets.splice(_j, 1);

        hitAnimations.push({
          pos: leftBulletPos,
          sprite: new _sprite2.default('https://i.imgur.com/LpgLmNZ.png', [35, 860], [75, 75], [0, 0], [40, 40], 10, [0], true)
        });

        if (rightMonsters[i].hp === 0) {
          switch (rightMonsters[i].type) {
            case 'balrog':
              killAnimations.push({
                pos: enemyPos,
                sprite: new _sprite2.default('https://i.imgur.com/WvHlsqj.png', [-50, 2350], [230, 230], [0, 0], [200, 200], 5, [0, 1, 2], true)
              });
              score += 2;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: enemyPos,
                sprite: new _sprite2.default('https://i.imgur.com/jHYJaMs.png', [-10, 930], [215, 175], [0, 0], [190, 190], 6, [0, 1, 2, 3, 4, 5, 6, 7], true)
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: enemyPos,
                sprite: new _sprite2.default('https://i.imgur.com/MAUkqfk.png', [5, 1600], [175, 175], [0, 0], [170, 170], 6, [0, 1, 2, 3, 4, 5, 6], true)
              });
              score += 1;
              break;
          }

          document.getElementById('score').innerHTML = 'Score: ' + score;
          rightMonsters.splice(i, 1);
          i -= 1;
        }
        break;
      }
    }
  }

  // left monster collisions
  for (var _i = 0; _i < leftMonsters.length; _i++) {
    var monsterPos = leftMonsters[_i].pos;
    var monsterSize = leftMonsters[_i].sprite.srcSize;

    // player death
    if (isCollision(monsterPos[0], monsterPos[1] - 73, monsterSize[0], monsterSize[1], player.pos[0], player.pos[1], player.sprite.srcSize[0], player.sprite.srcSize[1])) {
      (0, _main.gameOver)();
    }

    for (var _j2 = 0; _j2 < leftBullets.length; _j2++) {
      var _leftBulletPos = leftBullets[_j2].pos;
      var _leftBulletSize = leftBullets[_j2].sprite.srcSize;

      if (isCollision(monsterPos[0], monsterPos[1], monsterSize[0], monsterSize[1], _leftBulletPos[0], _leftBulletPos[1], _leftBulletSize[0], _leftBulletSize[1])) {

        leftMonsters[_i].hp -= 1;
        leftBullets.splice(_j2, 1);

        hitAnimations.push({
          pos: _leftBulletPos,
          sprite: new _sprite2.default('https://i.imgur.com/LpgLmNZ.png', [35, 860], [75, 75], [0, 0], [40, 40], 10, [0], true)
        });

        if (leftMonsters[_i].hp === 0) {
          // left monster kill animations
          switch (leftMonsters[_i].type) {
            case 'balrog':
              killAnimations.push({
                pos: monsterPos,
                sprite: new _sprite2.default('https://i.imgur.com/xQBSQHu.png', [430, 2350], [230, 230], [0, 0], [200, 200], 5, [2, 1, 0], true)
              });
              score += 2;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: monsterPos,
                sprite: new _sprite2.default('https://i.imgur.com/6TPUotY.png', [1800, 930], [215, 175], [0, 0], [190, 190], 6, [7, 6, 5, 4, 3, 2, 1, 0], true)
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: monsterPos,
                sprite: new _sprite2.default('https://i.imgur.com/EdvKlUj.png', [1640, 1600], [175, 175], [0, 0], [170, 170], 6, [6, 5, 4, 3, 2, 1, 0], true)
              });
              score += 1;
              break;
          }

          document.getElementById('score').innerHTML = 'Score: ' + score;
          leftMonsters.splice(_i, 1);
          _i -= 1;
        }

        break;
      }
    }

    for (var k = 0; k < rightBullets.length; k++) {
      var _rightBulletPos = rightBullets[k].pos;
      var _rightBulletSize = rightBullets[k].sprite.srcSize;

      if (isCollision(monsterPos[0], monsterPos[1], monsterSize[0], monsterSize[1], _rightBulletPos[0], _rightBulletPos[1], _rightBulletSize[0], _rightBulletSize[1])) {

        leftMonsters[_i].hp -= 1;
        rightBullets.splice(k, 1);

        hitAnimations.push({
          pos: _rightBulletPos,
          sprite: new _sprite2.default('https://i.imgur.com/LpgLmNZ.png', [35, 860], [75, 75], [0, 0], [40, 40], 10, [0], true)
        });

        if (leftMonsters[_i].hp === 0) {
          // left monster kill animations
          switch (leftMonsters[_i].type) {
            case 'balrog':
              killAnimations.push({
                pos: monsterPos,
                sprite: new _sprite2.default('https://i.imgur.com/xQBSQHu.png', [430, 2350], [230, 230], [0, 0], [200, 200], 5, [2, 1, 0], true)
              });
              score += 1;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: monsterPos,
                sprite: new _sprite2.default('https://i.imgur.com/6TPUotY.png', [1800, 930], [215, 175], [0, 0], [190, 190], 6, [7, 6, 5, 4, 3, 2, 1, 0], true)
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: monsterPos,
                sprite: new _sprite2.default('https://i.imgur.com/EdvKlUj.png', [1640, 1600], [175, 175], [0, 0], [170, 170], 6, [6, 5, 4, 3, 2, 1, 0], true)
              });
              score += 1;
              break;
          }

          document.getElementById('score').innerHTML = 'Score: ' + score;
          leftMonsters.splice(_i, 1);
          _i -= 1;
        }

        break;
      }
    }
  }
}

exports.default = checkCollisions;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnLeftMonsters = exports.spawnRightMonsters = exports.wyvernRight = exports.wyvernLeft = exports.balrogLeft = exports.balrogRight = exports.dragonTurtleLeft = exports.dragonTurtleRight = exports.taurospearLeft = exports.taurospearRight = exports.direction = undefined;

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var direction = exports.direction = ['straight', 'diagUp', 'diagDown'];

var taurospearRight = exports.taurospearRight = {
  hp: 20,
  type: 'taurospear',
  pos: [1200, Math.random() * (700 - 175)],
  sprite: new _sprite2.default('https://i.imgur.com/jHYJaMs.png', [5, 175], [215, 175], [0, 0], [190, 190], 6, [0, 1, 2], false),
  speed: 400
};
var taurospearLeft = exports.taurospearLeft = {
  hp: 20,
  type: 'taurospear',
  pos: [0 - 215, Math.random() * (700 - 175)],
  sprite: new _sprite2.default('https://i.imgur.com/6TPUotY.png', [2175, 175], [215, 175], [0, 0], [190, 190], 6, [2, 1, 0], false),
  speed: 400
};

var dragonTurtleRight = exports.dragonTurtleRight = {
  type: 'dragonTurtle',
  pos: [1200, Math.random() * (700 - 130)],
  sprite: new _sprite2.default('https://i.imgur.com/LRtOtZ3.png', [-5, 125], [140, 130], [0, 0], [150, 150], 3, [0, 1, 2, 3, 4, 5], false),
  speed: 100
};
var dragonTurtleLeft = exports.dragonTurtleLeft = {
  type: 'dragonTurtle',
  pos: [0 - 140, Math.random() * (700 - 130)],
  sprite: new _sprite2.default('https://i.imgur.com/a3LCa6u.png', [1100, 125], [140, 130], [0, 0], [150, 150], 3, [5, 4, 3, 2, 1, 0], false),
  speed: 100
};

var balrogRight = exports.balrogRight = {
  hp: 10,
  type: 'balrog',
  pos: [1200, Math.random() * (700 - 178)],
  sprite: new _sprite2.default('https://i.imgur.com/WvHlsqj.png', [15, 240], [178, 178], [0, 0], [175, 165], 3, [0, 1, 2, 3], false),
  speed: 200
};
var balrogLeft = exports.balrogLeft = {
  hp: 10,
  type: 'balrog',
  pos: [0 - 178, Math.random() * (700 - 178)],
  sprite: new _sprite2.default('https://i.imgur.com/xQBSQHu.png', [162, 240], [178, 178], [0, 0], [175, 165], 3, [3, 2, 1, 0], false),
  speed: 200
};

var wyvernLeft = exports.wyvernLeft = {
  hp: 5,
  type: 'wyvern',
  pos: [0 - 175, Math.random() * (700 - 175)],
  sprite: new _sprite2.default('https://i.imgur.com/EdvKlUj.png', [1817, 0], [175, 175], [0, 0], [170, 170], 8, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], false),
  speed: 300,
  direction: direction[Math.floor(Math.random() * direction.length)]
};

var wyvernRight = exports.wyvernRight = {
  hp: 5,
  type: 'wyvern',
  pos: [1200, Math.random() * (700 - 175)],
  sprite: new _sprite2.default('https://i.imgur.com/MAUkqfk.png', [5, 0], [175, 175], [0, 0], [170, 170], 8, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], false),
  speed: 300,
  direction: direction[Math.floor(Math.random() * direction.length)]
};

var spawnRightMonsters = exports.spawnRightMonsters = function spawnRightMonsters(gameTime, canvas, monsters, spawnRate) {

  // spawn balrog from right
  if (spawnRate === 0) {
    monsters.push({
      hp: 10,
      type: 'balrog',
      pos: [canvas.width, Math.random() * (canvas.height - 178)],
      sprite: new _sprite2.default('https://i.imgur.com/WvHlsqj.png', [15, 240], [178, 178], [0, 0], [175, 165], 4, [0, 1, 2, 3], false),
      speed: 150,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }

  // spawn dragonTurtle from right
  // if (Math.floor(gameTime * 1000) % 27 === 0) {
  //   monsters.push({
  //     pos: [canvas.width, Math.random() * (canvas.height - 130)],
  //     sprite: new Sprite(
  //       'https://i.imgur.com/LRtOtZ3.png',
  //       [-5, 125],
  //       [140, 130],
  //       [0, 0],
  //       [150, 150],
  //       4,
  //       [0, 1, 2, 3, 4, 5]),
  //     speed: 150,
  //     direction: direction[Math.floor(Math.random() * direction.length)]
  //   });
  // }

  // spawn taurospear from right
  if (spawnRate === 0) {
    monsters.push({
      hp: 20,
      type: 'taurospear',
      pos: [canvas.width, Math.random() * (canvas.height - 175)],
      sprite: new _sprite2.default('https://i.imgur.com/jHYJaMs.png', [5, 175], [215, 175], [0, 0], [190, 190], 6, [0, 1, 2], false),
      speed: 300,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }

  // spawn wyvern from right
  if (spawnRate === 0) {
    monsters.push({
      hp: 5,
      type: 'wyvern',
      pos: [canvas.width, Math.random() * (canvas.height - 175)],
      sprite: new _sprite2.default('https://i.imgur.com/MAUkqfk.png', [5, 0], [175, 175], [0, 0], [170, 170], 8, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], false),
      speed: 250,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }
};

var spawnLeftMonsters = exports.spawnLeftMonsters = function spawnLeftMonsters(gameTime, canvas, monsters, spawnRate) {
  if (spawnRate === 0) {
    // spawn balrog from left
    monsters.push({
      hp: 10,
      type: 'balrog',
      pos: [0 - 178, Math.random() * (canvas.height - 178)],
      sprite: new _sprite2.default('https://i.imgur.com/xQBSQHu.png', [161, 240], [178, 178], [0, 0], [150, 165], 4, [0, 1, 2, 3], false),
      speed: 200,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });

    // spawn dragonturtle from left
    // if (Math.floor(gameTime * 1000) % 27 === 0) {
    //   monsters.push({
    //     pos: [0 - 140, Math.random() * (700 - 130)],
    //     sprite: new Sprite(
    //       'https://i.imgur.com/a3LCa6u.png',
    //       [1100, 125],
    //       [140, 130],
    //       [0, 0],
    //       [150, 150],
    //       4,
    //       [5, 4, 3, 2, 1, 0]),
    //       speed: 100,
    //       direction: direction[Math.floor(Math.random() * direction.length)]
    //   });
    // }
  }

  if (spawnRate === 0) {
    // spawn taurospear from left
    monsters.push({
      hp: 20,
      type: 'taurospear',
      pos: [0 - 215, Math.random() * (700 - 175)],
      sprite: new _sprite2.default('https://i.imgur.com/6TPUotY.png', [2175, 175], [215, 175], [0, 0], [190, 190], 6, [2, 1, 0], false),
      speed: 300,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }

  // spawn wyvern from left
  if (spawnRate === 0) {
    monsters.push({
      hp: 5,
      type: 'wyvern',
      pos: [0 - 175, Math.random() * (canvas.height - 175)],
      sprite: new _sprite2.default('https://i.imgur.com/EdvKlUj.png', [1817, 0], [175, 175], [0, 0], [170, 170], 8, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1], false),
      speed: 250,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
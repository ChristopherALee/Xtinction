import Sprite from './sprite.js';

export const enemyList = [taurospear, dragonTurtle, balrog];

export const taurospear = {
  pos: [1200, Math.random() * (700 - 175)],
  sprite: new Sprite(
    'https://i.imgur.com/jHYJaMs.png',
    [5, 175],
    [215, 175],
    [0, 0],
    [190, 190],
    6,
    [0, 1, 2]),
  speed: 400
};

export const dragonTurtle = {
  pos: [1200, Math.random() * (700 - 130)],
  sprite: new Sprite(
    'https://i.imgur.com/LRtOtZ3.png',
    [-5, 125],
    [140, 130],
    [0, 0],
    [150, 150],
    3,
    [0, 1, 2, 3, 4, 5]),
  speed: 100
};

export const balrog = {
  pos: [1200, Math.random() * (700 - 178)],
  sprite: new Sprite(
    'https://i.imgur.com/WvHlsqj.png',
    [15, 240],
    [178, 178],
    [0, 0],
    [175, 165],
    3,
    [0, 1, 2, 3]
  ),
  speed: 200
};

export const spawnMonsters= (gameTime, canvas, enemies) => {
  // continuous monster spawn that gradually increases rate of spawn
  if (Math.random() < 1 - Math.pow(0.99, gameTime / 10)) {
    // spawn balrog from right
    enemies.push({
      pos: [canvas.width, Math.random() * (canvas.height - 178)],
      sprite: new Sprite(
        'https://i.imgur.com/WvHlsqj.png',
        [15, 240],
        [178, 178],
        [0, 0],
        [175, 165],
        3,
        [0, 1, 2, 3]
      ),
      speed: 150
    });

    // spawn dragonTurtle from right
    enemies.push({
      pos: [canvas.width, Math.random() * (canvas.height - 130)],
      sprite: new Sprite(
        'https://i.imgur.com/LRtOtZ3.png',
        [-5, 125],
        [140, 130],
        [0, 0],
        [150, 150],
        3,
        [0, 1, 2, 3, 4, 5]),
      speed: 150
    });
  }

  if (Math.random() < 1 - Math.pow(0.99, gameTime / 15)) {
    // spawn taurospear from right
    enemies.push({
      pos: [canvas.width, Math.random() * (canvas.height - 175)],
      sprite: new Sprite(
        'https://i.imgur.com/jHYJaMs.png',
        [5, 175],
        [215, 175],
        [0, 0],
        [190, 190],
        6,
        [0, 1, 2]),
      speed: 400
    });
  }
};

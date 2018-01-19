import Sprite from './sprite.js';

export const enemyList = [taurospear, dragonTurtle, balrog];

export const taurospear = {
  pos: [1200, 500],
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
  pos: [1200, 100],
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
  pos: [1200, 300],
  sprite: new Sprite(
    'https://i.imgur.com/WvHlsqj.png',
    [15, 240],
    [178, 178],
    [0, 0],
    [175, 165],
    3,
    [0, 1, 2, 3]
  ),
  speed: 100
};

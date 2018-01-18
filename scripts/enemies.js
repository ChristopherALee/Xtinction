import Sprite from './sprite.js';

export const cerberus = {
  pos: [700, 500],
  sprite: new Sprite(
    'http://www.feplanet.net/media/sprites/8/battle/sheets/enemy/monster_cerberus_claws.gif',
    [5, 200],
    [78, 61],
    [0, 0],
    [120, 120],
    2,
    [0, 1]),
  speed: 100
};

export const dragonTurtle = {
  pos: [700, 100],
  sprite: new Sprite(
    'https://i.imgur.com/LRtOtZ3.png',
    [-5, 125],
    [140, 130],
    [0, 0],
    [150, 150],
    5,
    [0, 1, 2, 3, 4, 5]),
  speed: 100
};

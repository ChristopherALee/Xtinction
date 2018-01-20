import Sprite from './sprite.js';

// robot player
export const robotPlayer = {
    pos: [550, 350],
    sprite: new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [125, 874],
      [100, 100],
      [0, 0],
      [100, 100],
      5,
      [0]),
    speed: 388,
    direction: 'RIGHT'
};

// duck player
export const duckSpriteIdleLeft = new Sprite(
  'https://i.imgur.com/IsLSheM.png',
  [0, 37.7],
  [60, 60],
  [0, 0],
  [75, 75],
  8,
  [0]);

export const duckSpriteIdleRight = new Sprite(
  'https://i.imgur.com/bxHEJ6i.png',
  [93, 37.7],
  [60, 60],
  [0, 0],
  [75, 75],
  8,
  [0]);

export const duckSpriteLeft = new Sprite(
  'https://i.imgur.com/IsLSheM.png',
  [0, 145],
  [60, 60],
  [0, 0],
  [75, 75],
  8,
  [0, 1, 2, 3]);

export const duckSpriteRight = new Sprite(
  'https://i.imgur.com/bxHEJ6i.png',
  [88, 145],
  [60, 60],
  [0, 0],
  [75, 75],
  8,
  [0, 1, 2, 3]);

export const duckPlayer = {
  pos: [550, 350],
  sprite: duckSpriteRight,
  speed: 388,
  direction: 'RIGHT'
};

import Sprite from './sprite.js';

export const bullet = (x, y) => {
  return {
    pos: [x,y],
    sprite: new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [725, 190],
      [60, 60],
      [0, 0],
      [60, 60],
      0,
      [0]),
    speed: 888,
    direction: 'straight'
  };
};

export const bulletDiagUp = (x, y) => {
  return {
    pos: [x,y],
    sprite: new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [725, 190],
      [60, 60],
      [0, 0],
      [60, 60],
      0,
      [0]
    ),
    speed: 888,
    direction: 'diagUp'
  };
};

export const bulletDiagDown = (x, y) => {
  return {
    pos: [x,y],
    sprite: new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [725, 190],
      [60, 60],
      [0, 0],
      [60, 60],
      0,
      [0]
    ),
    speed: 888,
    direction: 'diagDown'
  };
};

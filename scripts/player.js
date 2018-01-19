import Sprite from './sprite.js';

let player = {
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

export default player;

import Sprite from './sprite.js';

const bullet = (x, y) => {
  return {
    pos: [x,y],
    sprite: new Sprite(
      'https://i.imgur.com/6n1qcVc.png',
      [725, 190],
      [60, 60],
      [60, 60],
      0,
      [0]),
    speed: 888
  };
};

export default bullet;

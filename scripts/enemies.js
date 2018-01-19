import Sprite from './sprite.js';

export const direction = ['straight', 'diagUp', 'diagDown'];

export const taurospearRight = {
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
export const taurospearLeft = {
  pos: [0 - 215, Math.random() * (700 - 175)],
  sprite: new Sprite(
    'https://i.imgur.com/6TPUotY.png',
    [2175, 175],
    [215, 175],
    [0, 0],
    [190, 190],
    6,
    [2, 1, 0]),
  speed: 400
};

export const dragonTurtleRight = {
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
export const dragonTurtleLeft = {
  pos: [0 - 140, Math.random() * (700 - 130)],
  sprite: new Sprite(
    'https://i.imgur.com/a3LCa6u.png',
    [1100, 125],
    [140, 130],
    [0, 0],
    [150, 150],
    3,
    [5, 4, 3, 2, 1, 0]),
  speed: 100
};

export const balrogRight = {
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
export const balrogLeft = {
  pos: [0 - 178, Math.random() * (700 - 178)],
  sprite: new Sprite(
    'https://i.imgur.com/xQBSQHu.png',
    [161, 240],
    [178, 178],
    [0, 0],
    [150, 165],
    3,
    [3,2,1,0]
  ),
  speed: 200
};

export const spawnRightMonsters= (gameTime, canvas, monsters) => {
  // continuous monster spawn that gradually increases rate of spawn
  if (Math.random() < 1 - Math.pow(0.99, gameTime / 20)) {
    // spawn balrog from right
    monsters.push({
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
    monsters.push({
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

  if (Math.random() < 1 - Math.pow(0.99, gameTime / 40)) {
    // spawn taurospear from right
    monsters.push({
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

export const spawnLeftMonsters = (gameTime, canvas, monsters) => {
  if (Math.random() < 1 - Math.pow(0.99, gameTime / 20)) {
    // spawn balrog from left
    monsters.push({
      pos: [0 - 178, Math.random() * (canvas.height - 178)],
      sprite: new Sprite(
        'https://i.imgur.com/xQBSQHu.png',
        [161, 240],
        [178, 178],
        [0, 0],
        [150, 165],
        3,
        [0, 1, 2, 3]
      ),
      speed: 200,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });

    // spawn dragonturtle from left
    monsters.push({
      pos: [0 - 140, Math.random() * (700 - 130)],
      sprite: new Sprite(
        'https://i.imgur.com/a3LCa6u.png',
        [1100, 125],
        [140, 130],
        [0, 0],
        [150, 150],
        3,
        [5, 4, 3, 2, 1, 0]),
      speed: 100,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }

  if (Math.random() < 1 - Math.pow(0.99, gameTime / 40)) {
    // spawn taurospear from left
    monsters.push({
      pos: [0 - 215, Math.random() * (700 - 175)],
      sprite: new Sprite(
        'https://i.imgur.com/6TPUotY.png',
        [2175, 175],
        [215, 175],
        [0, 0],
        [190, 190],
        6,
        [2, 1, 0]),
      speed: 400,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }
};

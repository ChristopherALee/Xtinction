import Sprite from './sprite.js';

export const direction = ['straight', 'diagUp', 'diagDown'];

export const taurospearRight = {
  type: 'taurospear',
  pos: [1200, Math.random() * (700 - 175)],
  sprite: new Sprite(
    'https://i.imgur.com/jHYJaMs.png',
    [5, 175],
    [215, 175],
    [0, 0],
    [190, 190],
    6,
    [0, 1, 2],
  false),
  speed: 400
};
export const taurospearLeft = {
  type: 'taurospear',
  pos: [0 - 215, Math.random() * (700 - 175)],
  sprite: new Sprite(
    'https://i.imgur.com/6TPUotY.png',
    [2175, 175],
    [215, 175],
    [0, 0],
    [190, 190],
    6,
    [2, 1, 0],
  false),
  speed: 400
};

export const dragonTurtleRight = {
  type: 'dragonTurtle',
  pos: [1200, Math.random() * (700 - 130)],
  sprite: new Sprite(
    'https://i.imgur.com/LRtOtZ3.png',
    [-5, 125],
    [140, 130],
    [0, 0],
    [150, 150],
    3,
    [0, 1, 2, 3, 4, 5],
  false),
  speed: 100
};
export const dragonTurtleLeft = {
  type: 'dragonTurtle',
  pos: [0 - 140, Math.random() * (700 - 130)],
  sprite: new Sprite(
    'https://i.imgur.com/a3LCa6u.png',
    [1100, 125],
    [140, 130],
    [0, 0],
    [150, 150],
    3,
    [5, 4, 3, 2, 1, 0],
  false),
  speed: 100
};

export const balrogRight = {
  type: 'balrog',
  pos: [1200, Math.random() * (700 - 178)],
  sprite: new Sprite(
    'https://i.imgur.com/WvHlsqj.png',
    [15, 240],
    [178, 178],
    [0, 0],
    [175, 165],
    3,
    [0, 1, 2, 3],
    false
  ),
  speed: 200
};
export const balrogLeft = {
  type: 'balrog',
  pos: [0 - 178, Math.random() * (700 - 178)],
  sprite: new Sprite(
    'https://i.imgur.com/xQBSQHu.png',
    [162, 240],
    [178, 178],
    [0, 0],
    [175, 165],
    3,
    [3,2,1,0],
    false
  ),
  speed: 200
};

export const wyvernLeft = {
  type: 'wyvern',
  pos: [0 - 175, Math.random() * (700 - 175)],
  sprite: new Sprite(
    'https://i.imgur.com/EdvKlUj.png',
    [1817, 0],
    [175, 175],
    [0, 0],
    [170, 170],
    8,
    [0,1,2,3,4,5,4,3,2,1],
    false
  ),
  speed: 300,
  direction: direction[Math.floor(Math.random() * direction.length)]
};

export const wyvernRight = {
  type: 'wyvern',
  pos: [1200, Math.random() * (700 - 175)],
  sprite: new Sprite(
    'https://i.imgur.com/MAUkqfk.png',
    [5, 0],
    [175, 175],
    [0, 0],
    [170, 170],
    8,
    [0,1,2,3,4,5,4,3,2,1],
    false
  ),
  speed: 300,
  direction: direction[Math.floor(Math.random() * direction.length)]
};

export const spawnRightMonsters= (gameTime, canvas, monsters) => {
  // continuous monster spawn that gradually increases rate of spawn
  // debugger
  // spawn balrog from right
  if (Math.floor(gameTime * 1000) % 23 === 0) {
    monsters.push({
      type: 'balrog',
      pos: [canvas.width, Math.random() * (canvas.height - 178)],
      sprite: new Sprite(
        'https://i.imgur.com/WvHlsqj.png',
        [15, 240],
        [178, 178],
        [0, 0],
        [175, 165],
        4,
        [0, 1, 2, 3],
        false
      ),
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
  if (Math.floor(gameTime * 1000) % 43 === 0) {
    monsters.push({
      type: 'taurospear',
      pos: [canvas.width, Math.random() * (canvas.height - 175)],
      sprite: new Sprite(
        'https://i.imgur.com/jHYJaMs.png',
        [5, 175],
        [215, 175],
        [0, 0],
        [190, 190],
        6,
        [0, 1, 2],
      false),
      speed: 400,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }

  // spawn wyvern from right
  if (Math.floor(gameTime * 1000) % 53 === 0) {
    monsters.push({
      type: 'wyvern',
      pos: [canvas.width, Math.random() * (canvas.height - 175)],
      sprite: new Sprite(
        'https://i.imgur.com/MAUkqfk.png',
        [5, 0],
        [175, 175],
        [0, 0],
        [170, 170],
        8,
        [0,1,2,3,4,5,4,3,2,1],
        false
      ),
      speed: 300,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }
};

export const spawnLeftMonsters = (gameTime, canvas, monsters) => {
  if (Math.floor(gameTime * 1000) % 23 === 0) {
    // spawn balrog from left
    monsters.push({
      type: 'balrog',
      pos: [0 - 178, Math.random() * (canvas.height - 178)],
      sprite: new Sprite(
        'https://i.imgur.com/xQBSQHu.png',
        [161, 240],
        [178, 178],
        [0, 0],
        [150, 165],
        4,
        [0, 1, 2, 3],
        false
      ),
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

  if (Math.floor(gameTime * 1000) % 43 === 0) {
    // spawn taurospear from left
    monsters.push({
      type: 'taurospear',
      pos: [0 - 215, Math.random() * (700 - 175)],
      sprite: new Sprite(
        'https://i.imgur.com/6TPUotY.png',
        [2175, 175],
        [215, 175],
        [0, 0],
        [190, 190],
        6,
        [2, 1, 0],
      false),
      speed: 400,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }

  // spawn wyvern from left
  if (Math.floor(gameTime * 1000) % 53 === 0) {
    monsters.push({
      type: 'wyvern',
      pos: [0 - 175, Math.random() * (canvas.height - 175)],
      sprite: new Sprite(
        'https://i.imgur.com/EdvKlUj.png',
        [1817, 0],
        [175, 175],
        [0, 0],
        [170, 170],
        8,
        [0,1,2,3,4,5,4,3,2,1],
        false
      ),
      speed: 300,
      direction: direction[Math.floor(Math.random() * direction.length)]
    });
  }
};

import Sprite from './sprite.js';
import {gameOver} from './main.js';

function isCollision(
  pos1X, pos1Y, size1X, size1Y,
  pos2X, pos2Y, size2X, size2Y) {
    return (
      pos1X < pos2X + size2X - 50 &&
      pos1X + size1X - 100 > pos2X &&
      pos1Y < pos2Y + size2Y - 70 &&
      size1X + pos1Y > pos2Y
    );
}

let score = 0;

function checkCollisions(player, willReset, leftBullets, rightBullets, leftMonsters, rightMonsters, hitAnimations, killAnimations, gameOver) {

  if (
    willReset
    && rightMonsters.length === 0
    && leftMonsters.length === 0
  ) {
    score = 0;
  }

  document.getElementById('score').innerHTML = `Score: ${score}`;

  // right monster collisions
  for (let i = 0; i < rightMonsters.length; i++) {
    let enemyPos = rightMonsters[i].pos;
    let enemySize = rightMonsters[i].sprite.srcSize;

    // player death
    if (isCollision(
      enemyPos[0], enemyPos[1] - 73, enemySize[0], enemySize[1],
      player.pos[0], player.pos[1], player.sprite.srcSize[0], player.sprite.srcSize[1]
    )) {
      gameOver(score);
    }

    for (let j = 0; j < rightBullets.length; j++) {
      let rightBulletPos = rightBullets[j].pos;
      let rightBulletSize = rightBullets[j].sprite.srcSize;

      if (isCollision(
        enemyPos[0], enemyPos[1], enemySize[0], enemySize[1],
        rightBulletPos[0], rightBulletPos[1], rightBulletSize[0], rightBulletSize[1])) {

          rightMonsters[i].hp -= 1;
          rightBullets.splice(j, 1);

          hitAnimations.push({
            pos: rightBulletPos,
            sprite: new Sprite(
              'https://i.imgur.com/LpgLmNZ.png',
              [35, 860],
              [75, 75],
              [0, 0],
              [40, 40],
              10,
              [0],
              true
            )
          });

          if (rightMonsters[i].hp === 0) {
            // death animation
            switch (rightMonsters[i].type) {
              case 'balrog':
                killAnimations.push({
                  pos: enemyPos,
                  sprite: new Sprite(
                    'https://i.imgur.com/WvHlsqj.png',
                    [-50, 2350],
                    [230, 230],
                    [0, 0],
                    [200, 200],
                    5,
                    [0, 1, 2],
                    true
                  )
                });
                score += 2;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: enemyPos,
                sprite: new Sprite(
                  'https://i.imgur.com/jHYJaMs.png',
                  [-10, 930],
                  [215, 175],
                  [0, 0],
                  [190, 190],
                  6,
                  [0, 1, 2, 3, 4, 5, 6, 7],
                  true
                )
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: enemyPos,
                sprite: new Sprite(
                  'https://i.imgur.com/MAUkqfk.png',
                  [5, 1600],
                  [175, 175],
                  [0, 0],
                  [170, 170],
                  6,
                  [0, 1, 2, 3, 4, 5, 6],
                  true
                )
              });
              score += 1;
              break;
            }

          document.getElementById('score').innerHTML = `Score: ${score}`;
          rightMonsters.splice(i, 1);
          i -= 1;

          break;
        }
      }
    }

    for (let j = 0; j < leftBullets.length; j++) {
      let leftBulletPos = leftBullets[j].pos;
      let leftBulletSize = leftBullets[j].sprite.srcSize;

      if (isCollision(
        enemyPos[0], enemyPos[1], enemySize[0], enemySize[1],
        leftBulletPos[0], leftBulletPos[1], leftBulletSize[0], leftBulletSize[1])) {

          rightMonsters[i].hp -= 1;
          leftBullets.splice(j, 1);

          hitAnimations.push({
            pos: leftBulletPos,
            sprite: new Sprite(
              'https://i.imgur.com/LpgLmNZ.png',
              [35, 860],
              [75, 75],
              [0, 0],
              [40, 40],
              10,
              [0],
              true
            )
          });

          if (rightMonsters[i].hp === 0) {
            switch (rightMonsters[i].type) {
              case 'balrog':
              killAnimations.push({
                pos: enemyPos,
                sprite: new Sprite(
                  'https://i.imgur.com/WvHlsqj.png',
                  [-50, 2350],
                  [230, 230],
                  [0, 0],
                  [200, 200],
                  5,
                  [0, 1, 2],
                  true
                )
              });
              score += 2;
              break;
              case 'taurospear':
              killAnimations.push({
                pos: enemyPos,
                sprite: new Sprite(
                  'https://i.imgur.com/jHYJaMs.png',
                  [-10, 930],
                  [215, 175],
                  [0, 0],
                  [190, 190],
                  6,
                  [0, 1, 2, 3, 4, 5, 6, 7],
                  true
                )
              });
              score += 3;
              break;
              case 'wyvern':
              killAnimations.push({
                pos: enemyPos,
                sprite: new Sprite(
                  'https://i.imgur.com/MAUkqfk.png',
                  [5, 1600],
                  [175, 175],
                  [0, 0],
                  [170, 170],
                  6,
                  [0, 1, 2, 3, 4, 5, 6],
                  true
                )
              });
              score += 1;
              break;
            }

            document.getElementById('score').innerHTML = `Score: ${score}`;
            rightMonsters.splice(i, 1);
            i -= 1;
          }
          break;
      }
    }
  }

  // left monster collisions
  for (let i = 0; i < leftMonsters.length; i++) {
    let monsterPos = leftMonsters[i].pos;
    let monsterSize = leftMonsters[i].sprite.srcSize;

    // player death
    if (isCollision(
      monsterPos[0], monsterPos[1] - 73, monsterSize[0], monsterSize[1],
      player.pos[0], player.pos[1], player.sprite.srcSize[0], player.sprite.srcSize[1]
    )) {
      gameOver(score);
    }

    for (let j = 0; j < leftBullets.length; j++) {
      let leftBulletPos = leftBullets[j].pos;
      let leftBulletSize = leftBullets[j].sprite.srcSize;

      if (isCollision(
        monsterPos[0], monsterPos[1], monsterSize[0], monsterSize[1],
        leftBulletPos[0], leftBulletPos[1], leftBulletSize[0], leftBulletSize[1]
      )) {

        leftMonsters[i].hp -= 1;
        leftBullets.splice(j, 1);

        hitAnimations.push({
          pos: leftBulletPos,
          sprite: new Sprite(
            'https://i.imgur.com/LpgLmNZ.png',
            [35, 860],
            [75, 75],
            [0, 0],
            [40, 40],
            10,
            [0],
            true
          )
        });

        if (leftMonsters[i].hp === 0) {
          // left monster kill animations
          switch (leftMonsters[i].type) {
            case 'balrog':
              killAnimations.push({
                pos: monsterPos,
                sprite: new Sprite(
                  'https://i.imgur.com/xQBSQHu.png',
                  [430, 2350],
                  [230, 230],
                  [0, 0],
                  [200, 200],
                  5,
                  [2, 1, 0],
                  true
                )
              });
              score += 2;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: monsterPos,
                sprite: new Sprite(
                  'https://i.imgur.com/6TPUotY.png',
                  [1800, 930],
                  [215, 175],
                  [0, 0],
                  [190, 190],
                  6,
                  [7, 6, 5, 4, 3, 2, 1, 0],
                  true
                )
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: monsterPos,
                sprite: new Sprite(
                  'https://i.imgur.com/EdvKlUj.png',
                  [1640, 1600],
                  [175, 175],
                  [0, 0],
                  [170, 170],
                  6,
                  [6, 5, 4, 3, 2, 1, 0],
                  true
                )
              });
              score += 1;
              break;
          }

          document.getElementById('score').innerHTML = `Score: ${score}`;
          leftMonsters.splice(i, 1);
          i -= 1;
        }

        break;
      }
    }

    for (let k = 0; k < rightBullets.length; k++) {
      let rightBulletPos = rightBullets[k].pos;
      let rightBulletSize = rightBullets[k].sprite.srcSize;

      if (isCollision(
        monsterPos[0], monsterPos[1], monsterSize[0], monsterSize[1],
        rightBulletPos[0], rightBulletPos[1], rightBulletSize[0], rightBulletSize[1]
      )) {

        leftMonsters[i].hp -= 1;
        rightBullets.splice(k, 1);

        hitAnimations.push({
          pos: rightBulletPos,
          sprite: new Sprite(
            'https://i.imgur.com/LpgLmNZ.png',
            [35, 860],
            [75, 75],
            [0, 0],
            [40, 40],
            10,
            [0],
            true
          )
        });

        if (leftMonsters[i].hp === 0) {
          // left monster kill animations
          switch (leftMonsters[i].type) {
            case 'balrog':
              killAnimations.push({
                pos: monsterPos,
                sprite: new Sprite(
                  'https://i.imgur.com/xQBSQHu.png',
                  [430, 2350],
                  [230, 230],
                  [0, 0],
                  [200, 200],
                  5,
                  [2, 1, 0],
                  true
                )
              });
              score += 1;
              break;
            case 'taurospear':
              killAnimations.push({
                pos: monsterPos,
                sprite: new Sprite(
                  'https://i.imgur.com/6TPUotY.png',
                  [1800, 930],
                  [215, 175],
                  [0, 0],
                  [190, 190],
                  6,
                  [7, 6, 5, 4, 3, 2, 1, 0],
                  true
                )
              });
              score += 3;
              break;
            case 'wyvern':
              killAnimations.push({
                pos: monsterPos,
                sprite: new Sprite(
                  'https://i.imgur.com/EdvKlUj.png',
                  [1640, 1600],
                  [175, 175],
                  [0, 0],
                  [170, 170],
                  6,
                  [6, 5, 4, 3, 2, 1, 0],
                  true
                )
              });
              score += 1;
              break;
          }

          document.getElementById('score').innerHTML = `Score: ${score}`;
          leftMonsters.splice(i, 1);
          i -= 1;
        }

        break;
      }
    }
  }
}

export default checkCollisions;

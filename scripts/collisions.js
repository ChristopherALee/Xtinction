// import leftBullets from './main.js';
// import rightBullets from './main.js';
// import leftMonsters from './main.js';
// import rightMonsters from './main.js';

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

function checkCollisions(leftBullets, rightBullets, leftMonsters, rightMonsters) {
  for (let i = 0; i < rightMonsters.length; i++) {
    let enemyPos = rightMonsters[i].pos;
    let enemySize = rightMonsters[i].sprite.srcSize;

    for (let j = 0; j < rightBullets.length; j++) {
      let rightBulletPos = rightBullets[j].pos;
      let rightBulletSize = rightBullets[j].sprite.srcSize;

      if (isCollision(
        enemyPos[0], enemyPos[1], enemySize[0], enemySize[1],
        rightBulletPos[0], rightBulletPos[1], rightBulletSize[0], rightBulletSize[1])) {
          rightMonsters.splice(i, 1);
          i -= 1;

          rightBullets.splice(j, 1);

          break;
      }
    }

    for (let j = 0; j < leftBullets.length; j++) {
      let leftBulletPos = leftBullets[j].pos;
      let leftBulletSize = leftBullets[j].sprite.srcSize;

      if (isCollision(
        enemyPos[0], enemyPos[1], enemySize[0], enemySize[1],
        leftBulletPos[0], leftBulletPos[1], leftBulletSize[0], leftBulletSize[1])) {
          rightMonsters.splice(i, 1);
          i--;

          leftBullets.splice(j, 1);

          break;
      }
    }
  }

  for (let i = 0; i < leftMonsters.length; i++) {
    let monsterPos = leftMonsters[i].pos;
    let monsterSize = leftMonsters[i].sprite.srcSize;

    for (let j = 0; j < leftBullets.length; j++) {
      let leftBulletPos = leftBullets[j].pos;
      let leftBulletSize = leftBullets[j].sprite.srcSize;

      if (isCollision(
        monsterPos[0], monsterPos[1], monsterSize[0], monsterSize[1],
        leftBulletPos[0], leftBulletPos[1], leftBulletSize[0], leftBulletSize[1]
      )) {
        leftMonsters.splice(i, 1);
        i -= 1;

        leftBullets.splice(j, 1);

        break;
      }
    }
  }
}

export default checkCollisions;

<div align="center">
<img src="./screenshots/xtinction-title.png"></img>
</div>

## Background
Xtinction is a survival shooter game built with JavaScript and Canvas where the player defends themselves from waves of hostile monsters.

[Live-Demo](http://www.christopheradamlee.com/Xtinction/)

![starting-screen](./screenshots/xtinction-updated-ss.png)

## Renders multiple objects in a single animation frame
The game re-renders Canvas using `requestAnimationFrame`. In the `render()` function, it re-renders each object in the game (player, monsters, and bullets) where-ever their position is on the canvas. It also checks if the game is over to render a death animation for the player's character, triggering a game-over screen overlay via an event listener.
``` javascript
function render() {
  if (isGameOver) {
    renderEntity(deadPlayer());
    document.addEventListener('keydown', gameOverOverlay);
  } else {
    renderEntity(Player.duckPlayer);
    document.removeEventListener('keydown', gameOverOverlay);
  }

  leftBullets.forEach( (bullet) => renderEntity(bullet));
  rightBullets.forEach( (bullet) => renderEntity(bullet));

  leftMonsters.forEach( (monster) => { renderEntity(monster); });
  rightMonsters.forEach( (monster) => { renderEntity(monster); });

  hitAnimations.forEach( (hit) => { renderEntity(hit); });
  killAnimations.forEach( (kill) => { renderEntity(kill); });
}
```
<div align="center">
  <img src="./screenshots/xtinction-demo.gif"></img>
</div>

## Collision Detection
The collision detection method checks if the position and size of one object intersects with position and size of another within the given arguments and returns a boolean. The boolean is used to trigger certain events if collision is true or false (e.g. player loss, bullets hitting monsters, and monster deaths)
``` javascript
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
```

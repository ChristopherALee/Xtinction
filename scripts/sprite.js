class Sprite {
  constructor(url, pos, size, canvasSize, speed, frames) {
    this.url = url;
    this.pos = pos;
    this.size = size;
    this.canvasSize = canvasSize;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.frameIdx = 0;
  }

  update(timeDifferential) {
    this.frameIdx += this.speed * timeDifferential;
  }

  updatePos(timeDifferential) {
    this.pos[0] += this.speed * timeDifferential;
  }

  render(ctx) {
    let frame;

    if (this.speed > 0) {
      let allFrames = this.frames.length;
      let idx = Math.floor(this.frameIdx);
      frame = this.frames[idx % allFrames];
    } else {
      frame = 0;
    }

    let x = this.pos[0];
    let y = this.pos[1];

    x += frame * this.size[0];

    let newImage = new Image(this.size[0], this.size[1]);
    newImage.src = this.url;

    ctx.drawImage(newImage,
                  x, y,
                  this.size[0], this.size[1],
                  0, 0,
                  this.canvasSize[0], this.canvasSize[1]);
  }
}

export default Sprite;

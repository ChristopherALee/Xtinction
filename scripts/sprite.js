class Sprite {
  constructor(url, srcPos, srcSize, canvasPos, canvasSize, speed, frames) {
    this.url = url;
    this.srcPos = srcPos;
    this.srcSize = srcSize;
    this.canvasPos = canvasPos;
    this.canvasSize = canvasSize;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.frameIdx = 0;
  }

  updateAnimation(timeDifferential) {
    this.frameIdx += this.speed * timeDifferential;
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

    let x = this.srcPos[0];
    x += frame * this.srcSize[0];

    let newImage = new Image(this.srcSize[0], this.srcSize[1]);
    newImage.src = this.url;

    ctx.drawImage(newImage,
                  x, this.srcPos[1],
                  this.srcSize[0], this.srcSize[1],
                  this.canvasPos[0], this.canvasPos[1],
                  this.canvasSize[0], this.canvasSize[1]);
  }
}

export default Sprite;

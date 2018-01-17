class Sprite {
  constructor(url, pos, size, speed, frames, dir, once) {
    this.url = url;
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.index = 0;
  }

  update(dt) {
    this.index += this.speed * dt;
  }

  render(ctx) {
    let frame;

    if (this.speed > 0) {
      let max = this.frames.length;
      let idx = Math.floor(this.index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    let x = this.pos[0];
    let y = this.pos[1];

    if(this.dir === 'vertical') {
        y += frame * this.size[1];
    }
    else {
        x += frame * this.size[0];
    }

    let newImage = new Image(this.size[0], this.size[1]);
    newImage.src = this.url;

    ctx.drawImage(newImage,
                  x, y,
                  this.size[0], this.size[1],
                  0, 0,
                  75, 75);
  }
}

export default Sprite;

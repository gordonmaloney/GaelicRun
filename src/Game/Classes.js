import { gravity } from "./Canvas";

export class Sprite {
    constructor({ position, imageSrc, frameRate = 1 }) {
      this.position = position;
      this.image = new Image();
      this.image.onload = () => {
        this.width = this.image.width / this.frameRate;
        this.height = this.image.height;
      };
      this.image.src = imageSrc;
      this.frameRate = frameRate;
      this.currentFrame = 0;
      this.frameBuffer = 6;
      this.elapsedFrames = 0;
    }

    draw(c) {
      if (c) {
      if (!this.image) return;
      const cropbox = {
        position: {
          x: this.currentFrame * (this.image.width / this.frameRate),
          y: 0,
        },
        width: this.image.width / this.frameRate,
        height: this.image.height,
      };

      c.drawImage(
        this.image,
        cropbox.position.x,
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      }
    }

    update() {
      this.draw();
    }

    updateFrames() {
      this.elapsedFrames++;

      if (this.elapsedFrames % this.frameBuffer === 0) {
        if (this.currentFrame < this.frameRate - 1) {
          this.currentFrame++;
        } else {
          if (this.status == "crashing") {
            this.currentFrame = this.frameRate - 1;
          } else {
            this.currentFrame = 0;
          }
        }
      }
    }
  }

  export class Player extends Sprite {
    constructor({ position, imageSrc, frameRate, animations }) {
      super({ imageSrc, position, frameRate });
      this.position = position;
      this.velocity = {
        x: 0,
        y: 1,
      };
      this.height = 40;
      this.width = 20;
      this.animations = animations;
      this.status = "running";

      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }

    switchSprite(key) {
      this.image = this.animations[key].image;
      this.frameRate = this.animations[key].frameRate;
    }

    update() {
      this.updateFrames();

      this.draw();

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (
        this.position.y + this.height + this.velocity.y <
        140
      ) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }


  
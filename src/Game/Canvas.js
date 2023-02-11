import React, { useRef, useEffect, useState } from "react";
import bgImg from "../GameAssets/bg.png";
import run from "../GameAssets/run.png";
import alien from "../GameAssets/alien.png";
import crashing from "../GameAssets/crashed.png";
import jumping from "../GameAssets/jump.png";
import idle from "../GameAssets/idle.png"
import { Player } from "./Classes";
import { Sprite } from "./Classes";

export const player = new Player({
  position: { x: 50, y: -20 },
  imageSrc: run,
  frameRate: 11,
  animations: {
    Run: {
      imageSrc: run,
      frameRate: 11,
    },
    Crash: {
      imageSrc: crashing,
      frameRate: 4,
    },
    Jump: {
      imageSrc: jumping,
      frameRate: 6,
    },
    Idle: {
      imageSrc: idle,
      frameRate: 4
    }
  },
});

export const obstacle = new Player({
  position: { x: 200, y: -20 },
  imageSrc: alien,
  frameRate: 4,
});

export const bg = new Sprite({
  position: { x: 0, y: -25 },
  imageSrc: bgImg,
  frameRate: 1,
});
export const bg2 = new Sprite({
  position: { x: bg.image.width-210, y: -25 },
  imageSrc: bgImg,
  frameRate: 1,
});

export const gravity = 0.3;


export const Canvas = () => {
  //canvas
  const [canvas, setCanvas] = useState();
  const [c, setC] = useState();
  const canvasRef = useRef();

  //animate
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current);
      setC(canvasRef.current.getContext("2d"));
    }
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);

    if (canvas && c) {
      canvas.width = 200;
      c.fillStyle = "white";
      c.fillRect(0, 0, canvas.width, canvas.height);

      bg.draw(c);
      bg2.draw(c);

      let bgSpeed;

      if (
        player.position.y > 85 &&
        obstacle.position.x < player.position.x + 40 &&
        obstacle.position.x > player.position.x - 40
      ) {
        bgSpeed = 0;
        player.switchSprite("Crash");
      } else {
        if (!crashed) bgSpeed = 4.5
      }

      if (player.status !== "idle"){
      bg.position.x -= bgSpeed;
      bg2.position.x -= bgSpeed;
      if (bg.position.x < -bg.image.width) {
        bg.position.x = bg2.position.x + bg2.image.width - 20;
      }
      if (bg2.position.x < -bg.image.width) {
        bg2.position.x = bg.position.x + bg2.image.width - 20;
      }}

      bg.update(c);
      bg2.update(c);

      player.draw(c);
      player.update(c);

      obstacle.draw(c);
      obstacle.update(c);

      
      if (player.position.y > 85 && player.status !== "idle") {
        player.switchSprite("Run");
      }
      if (
        player.position.y > 87 &&
        obstacle.position.x < player.position.x + 20 &&
        obstacle.position.x > player.position.x - 20
      ) {
        obstacle.velocity.x = 0;
        player.status = "crashing";
      }
    }
  };

  useEffect(() => {
    if (c && canvas) {
      animate();
    }
  }, [c, canvas]);


  return (
    <div className="screenBox">
      <canvas style={{ borderRadius: "7px" }} ref={canvasRef} />

      <div className="screenOverlay"> </div>
    </div>
  );
};

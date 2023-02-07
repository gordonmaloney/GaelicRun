import { Grid, TextField, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { BtnStyleSmall, BtnStyle } from "./MuiStyles";
import styled from "styled-components";
import { Form, Link } from "react-router-dom";
import heart from "./icons/heart.png";
import {WORDS} from './WORDS'
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import bgImg from "./GameAssets/bg.png";
import run from "./GameAssets/run.png";
import alien from "./GameAssets/alien.png";
import crashing from "./GameAssets/crashed.png";
import jumping from "./GameAssets/jump.png";

const NoBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: transparent;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: transparent;
    }
  }
`;


export const Screen = ({ action }) => {
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

  const gravity = 0.3;

  class Sprite {
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

    draw() {
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

  class Player extends Sprite {
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
        canvas.height - 15
      ) {
        this.velocity.y += gravity;
      } else {
        this.velocity.y = 0;
      }
    }
  }

  const player = new Player({
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
    },
  });

  const obstacle = new Player({
    position: { x: 200, y: -20 },
    imageSrc: alien,
    frameRate: 4,
  });

  const bg = new Sprite({
    position: { x: 0, y: -25 },
    imageSrc: bgImg,
  });
  const bg2 = new Sprite({
    position: { x: bg.image.width, y: -25 },
    imageSrc: bgImg,
  });

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

      bg.draw();
      bg2.draw();

      let bgSpeed;

      if (
        player.position.y > 85 &&
        obstacle.position.x < player.position.x + 40 &&
        obstacle.position.x > player.position.x - 40
      ) {
        bgSpeed = 0;
        player.switchSprite("Crash");
      } else {
        if (!crashed) bgSpeed = 4.5;
      }

      bg.position.x -= bgSpeed;
      bg2.position.x -= bgSpeed;
      if (bg.position.x < -bg.image.width) {
        bg.position.x = bg2.position.x + bg2.image.width;
      }
      if (bg2.position.x < -bg.image.width) {
        bg2.position.x = bg.position.x + bg2.image.width;
      }

      bg.update();
      bg2.update();

      player.draw();
      player.update();

      obstacle.draw();
      obstacle.update();

      if (player.position.y > 85) {
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

  const jump = () => {
    player.status = "running";
    player.velocity.y = -7.5;

    player.switchSprite("Jump");
    obstacle.position.x = 200;
    obstacle.velocity.x = -4.5;
  };

  if (action == "jump") {
    jump();
    console.log("do it");
  }

  const crash = () => {
    obstacle.position.x = 200;
    obstacle.velocity.x = -4.5;
  };

  const restart = () => {
    obstacle.position.x = 200;
    obstacle.velocity.x = 0;
    player.status = "running";
    player.switchSprite("Run");
  };

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        jump();
        break;
      case "s":
        crash();
        break;
      case "q":
        restart();
        break;
    }
  });

  window.addEventListener('hashchange', () => {
    jump()
  })

  return (
    <div className="screenBox">
      <canvas style={{ borderRadius: "7px" }} ref={canvasRef} />

      <div className="screenOverlay"> </div>

    </div>
  );
};

export const MemoScreen = React.memo(Screen)

export const Play = () => {
  const navigate = useNavigate()
  const [action, setAction] = useState('run')
  const [index, setIndex] = useState(0)
  let question = WORDS[index].word;
  let answer = WORDS[index].answer


  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [input, setInput] = useState("");
  const [lives, setLives] = useState(3);

  const [mistakes, setMistakes] = useState([])
  const [checking, setChecking] = useState(false);
  const [correct, setCorrect] = useState("");

  const handleSubmit = () => {
    console.log("submitting...");
    setChecking(true);
    setInput("");
    if (input == answer) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
    setTimeout(() => {
      if (lives > 1) {
        setCorrect("");
        setChecking(false);
      }
    }, 1000);
  };

  const handleCorrect = () => {
    setCorrect("correct");
    setAction("jump")
    setTimeout(() => {
      setScore((prev) => prev + 1);
      setIndex(prev => prev+1)
    }, 300);
  };

  const handleIncorrect = () => {
    setMistakes(prev => [...prev, question])
    setCorrect("incorrect");
    if (lives > 1) {
      setTimeout(() => {
        setLives((prev) => prev - 1);
      }, 300);
    } else {
      setLives(0);
      handleDead();
    }
  };

  const handleDead = () => {
    setFinalScore(score);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const handleReset = () => {
    console.log("resetting");
    setScore(0);
    setLives(3);
    setCorrect("");
    setChecking(false);
  };

  return (
    <>
      <div className="PlayOuter">
        <div id="lives" className="lifeBox">
          {[...Array(lives)].map((life) => (
            <img
              src={heart}
              style={{ width: "35px", height: "auto", marginRight: "5px" }}
            />
          ))}
        </div>

        <div id="score" className="scoreBox">
          <Grid container spacing={2}>
            <Grid item>
              Score:
              <br />
              High Score:
            </Grid>
            <Grid item>
              {score}
              <br />
              {highScore}
            </Grid>
          </Grid>
        </div>

        <MemoScreen />

        <div className="gameBox">
          <div
            className={
              checking && correct == "correct"
                ? "grade fadeIn"
                : "grade fadeOut"
            }
          >
            <span style={{ fontSize: "70px", color: "green" }}>{score}</span>
            <div>correct</div>
          </div>
          <div
            className={
              checking && correct == "incorrect"
                ? "grade fadeIn"
                : "grade fadeOut"
            }
          >
            <span style={{ fontSize: "70px", color: "red" }}>x</span>
            {lives > 0 ? (
              <div>incorrect</div>
            ) : (
              <div>
                game over
                <br />
                score: {finalScore}
                <br />
                <br />
                <Button
                  onClick={() => handleReset()}
                  sx={{ ...BtnStyleSmall, fontSize: "0.4em", zIndex: 10 }}
                  type="button"
                >
                  play again
                </Button>
              </div>
            )}
          </div>

          <div
            className={checking ? "fadeOut" : "fadeIn"}
            style={{ display: lives > 0 ? "block" : "hide" }}
          >
            <center>
              <h3>{question}</h3>
              <br />
              <br />
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="borderFlash" style={{ width: "90%" }}>
                  <NoBorderTextField
                    autoComplete="off"
                    value={input}
                    autoFocus
                    InputProps={{
                      style: {
                        backgroundColor: "black",
                        color: "white",
                        fontFamily: "Upheav",
                        fontWeight: "100",
                        fontSize: "30px",
                        height: "50px",
                      },
                    }}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <br />
                <Button
                  type="submit"
                  sx={BtnStyleSmall}
                  onClick={handleSubmit}
                  disabled={(lives == 0 || input == "" || checking) && true}
                >
                  Submit
                </Button>
              </form>
            </center>
          </div>
        </div>
      </div>

      <div id="backBtn">
        <center>
          <Link to="../">
            <Button
              className="bounceBtn"
              sx={{ ...BtnStyle, marginTop: "-5vh" }}
            >
              Back
            </Button>
          </Link>
        </center>
      </div>
    </>
  );
};

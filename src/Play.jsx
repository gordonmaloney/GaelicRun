import { Grid, TextField, Button, FormControl } from "@mui/material";
import { useState } from "react";
import { BtnStyleSmall } from "./MuiStyles";
import styled from "styled-components";
import { Form } from "react-router-dom";
import heart from "./icons/heart.png";

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

export const Play = () => {
  let answer = "a' chlach";

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0)
  const [input, setInput] = useState("");
  const [lives, setLives] = useState(3);

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
    setTimeout(() => {
      setScore((prev) => prev + 1);
    }, 300);
  };

  const handleIncorrect = () => {
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
    setFinalScore(score)
    if (score > highScore) {
      setHighScore(score);
    }
  };
  
  const handleReset = () => {
    console.log('resetting')
    setScore(0)
    setLives(3)
    setCorrect('')
    setChecking(false)
  }

  return (
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

      <div className="gameBox">
        <div
          className={
            checking && correct == "correct" ? "grade fadeIn" : "grade fadeOut"
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
              <br/>
              <br/>
              <Button onClick={() => handleReset()} sx={{...BtnStyleSmall, fontSize: '0.4em', zIndex: 10}} type="button">
                play again
              </Button>
            </div>
          )}
        </div>

        <div className={checking ? "fadeOut" : "fadeIn"} style={{display: lives>0 ? "block" : "hide"}}>
          <center>
            <h3>clach</h3>
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
              <Button type="submit" sx={BtnStyleSmall} onClick={handleSubmit} disabled={(lives == 0 || input == "" || checking) && true}>
                Submit
              </Button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};

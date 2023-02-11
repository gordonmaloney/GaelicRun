import React from "react";
import { bg, bg2, player } from "./Game/Canvas";
import { useState, useEffect, useRef } from "react";
import { obstacle } from "./Game/Canvas";
import { Grid, TextField, Button, FormControl } from "@mui/material";
import { BtnStyleSmall, BtnStyle } from "./MuiStyles";
import styled from "styled-components";
import { Form, Link } from "react-router-dom";
import heart from "./icons/heart.png";
import { Screen } from "./OLD/Screen";
import { SettingsModal } from "./ModalContainers/SettingsModal";
import { WORDS2 } from "./WORDS";
import { isMobile } from "react-device-detect";
import {
  ArticleMultiple,
  GenitiveMultiple,
  PluralMultiple,
} from "./MultipleChoiceGenerators";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "./Redux/Slice";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle } from "./ModalContainers/ModalStyle";
import { ShareModal } from "./ModalContainers/ShareModal";

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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const PlayForm = () => {
  const [WORDS, setWords] = useState([
    ...shuffle(WORDS2.filter((word) => word.article)),
  ]);

  //this will be moved to redux
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  useEffect(() => {
    setWords(
      shuffle(
        WORDS2.filter((word) => word.article).filter((filt) =>
          settings.vocab.includes(filt.level)
        )
      )
    );
  }, [settings]);

  //check for local storage settings and update if they're there
  let localSettings = JSON.parse(localStorage.getItem("settings"));
  useEffect(() => {
    if (localSettings?.skill) {
      if (
        settings.skill !== localSettings.skill ||
        settings.multiplechoice !== localSettings.multiplechoice ||
        settings.showanswer !== localSettings.showanswer ||
        settings.vocab !== localSettings.vocab ||
        settings.checkaccents !== localSettings.checkaccents
      ) {
        console.log("dont match!");
        dispatch(setSettings(localSettings));
      } else console.log("matching!");
    } else {
      console.log("no local settings");
    }
  }, []);

  const skill = settings.skill; //"article" or "plural" or "genitive"

  const [index, setIndex] = useState(0);
  let question = WORDS[index]?.back.toLowerCase();
  let answer = WORDS[index][skill].toLowerCase();

  //generate randomise multiple choices
  const multipleChoice = settings.multiplechoice;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    let AlternativesArr = [];

    if (skill == "article") {
      AlternativesArr = Array.from(
        new Set([answer, ...ArticleMultiple(question)])
      );
    }
    if (skill == "genitive") {
      AlternativesArr = Array.from(
        new Set([answer, ...GenitiveMultiple(question)])
      );
    }
    if (skill == "plural") {
      AlternativesArr = Array.from(
        new Set([answer, ...PluralMultiple(question)])
      );
    }

    const newArr = [AlternativesArr[0], AlternativesArr[1], AlternativesArr[2]];
    setOptions(shuffle(newArr));
  }, [question]);

  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  let localHighScore = JSON.parse(localStorage.getItem("highscore"));
  useEffect(() => {
    localHighScore &&
      localHighScore > highScore &&
      setHighScore(localHighScore);
  }, [localHighScore]);
  const [finalScore, setFinalScore] = useState(0);
  const [input, setInput] = useState("");
  const [lives, setLives] = useState(3);
  const [win, setWin] = useState(false);
  useEffect(() => {
    win && setFinalScore(score);
    win && localStorage.setItem("highscore", score);
  }, [win]);
  const [mistakes, setMistakes] = useState([]);
  const [checking, setChecking] = useState(false);
  const [correct, setCorrect] = useState("");
  const inputField = useRef(null);

  const handleSubmit = (word) => {
    let checking;
    if (word) {
      checking = word;
    } else {
      checking = input;
    }
    setChecking(true);
    if (stripAccents(input || word) == stripAccents(answer)) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
    setInput("");
    setTimeout(() => {
      if (lives > 1) {
        setCorrect("");
        setChecking(false);
      }
    }, 1000);
  };

  const handleCorrect = () => {
    jump();
    setCorrect("correct");
    setTimeout(() => {
      setScore((prev) => prev + 1);
      index < WORDS.length - 1 ? setIndex((prev) => prev + 1) : setWin(true);
    }, 500);
    setTimeout(() => {
      index < WORDS.length - 1 && restart();
    }, 1200);
  };

  const handleIncorrect = () => {
    crash();
    setMistakes((prev) => [...prev, question]);
    setCorrect("incorrect");
    if (lives > 1) {
      setTimeout(() => {
        setLives((prev) => prev - 1);
      }, 500);
      setTimeout(() => {
        restart();
      }, 1200);
    } else {
      setLives(0);
      handleDead();
    }
  };

  const handleDead = () => {
    setFinalScore(score);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highscore", score);
    }
    setOpen(true);
  };

  useEffect(() => {
    handleReset();
  }, [settings]);
  const handleReset = () => {
    setWords(
      shuffle(
        WORDS2.filter((word) => word.article).filter((filt) =>
          settings.vocab.includes(filt.level)
        )
      )
    );
    setScore(0);
    setLives(3);
    setWin(false);
    setCorrect("");
    setChecking(false);
    setMistakes([]);
    restart();
    setStarted(false);
  };

  const idle = () => {
    player.status = "idle";
    player.switchSprite("Idle");
  };
  !started && idle();

  useEffect(() => {
    win && idle();
  }, [win]);

  const run = () => {
    player.status = "running";
    player.switchSprite("Run");
  };
  const jump = () => {
    player.status = "running";
    player.velocity.y = -7.5;

    player.switchSprite("Jump");
    obstacle.position.x = 200;
    obstacle.velocity.x = -4.5;
  };
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

  //modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //settings modal logic
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleOpenSettings = () => setSettingsOpen(true);
  const handleCloseSettings = () => setSettingsOpen(false);

  const stripAccents = (word) => {
    if (!settings.checkaccents) {
      return word
        .replace("à", "a")
        .replace("è", "e")
        .replace("ì", "i")
        .replace("ò", "o")
        .replace("ù", "u");
    } else {
      return word;
    }
  };

  //check if the keyboard is in focus on mobile, in order to adjust the view
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const handleKeyboardFocus = ({ focus }) => {
    if (isMobile) {
      if (focus) setKeyboardFocus(true);
      if (!focus) setKeyboardFocus(false);
    }
  };

  return (
    <>
      <div className="PlayOuter">
        <div id="lives" className="lifeBox">
          {[...Array(lives)].map((life, idx) => (
            <img
              key={idx}
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

        {!keyboardFocus ? (
          <div className="screenBox" style={{ opacity: "0" }}></div>
        ): <><br/><br/><br/><br/></>}

        <div className={`gameBox ${keyboardFocus && "gameBoxMini"}`}>
          <div
            className={
              (checking && correct == "correct") || win
                ? "grade fadeIn"
                : "grade fadeOut"
            }
          >
            {!win ? (
              <>
                <span style={{ fontSize: "70px", color: "green" }}>
                  {score}
                </span>
                <div>correct</div>
              </>
            ) : (
              <>
                {" "}
                You win!!!
                <br />
                score: {score}
                <br />
                <Button
                  onClick={() => handleReset()}
                  sx={{
                    ...BtnStyleSmall,
                    marginTop: "10px",
                    fontSize: "0.4em",
                    zIndex: 10,
                  }}
                  type="button"
                >
                  play again
                </Button>{" "}
                <Button
                  onClick={() => handleOpen()}
                  sx={{
                    ...BtnStyleSmall,
                    marginTop: "10px",
                    fontSize: "0.4em",
                    zIndex: 10,
                  }}
                  type="button"
                >
                  share
                </Button>
              </>
            )}
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
              <div>
                incorrect
                <br />
                {settings.showanswer && (
                  <span style={{ fontSize: "small" }}>{answer}</span>
                )}
              </div>
            ) : (
              <div>
                game over
                <br />
                score: {finalScore}
                <br />
                <Button
                  onClick={() => handleReset()}
                  sx={{
                    ...BtnStyleSmall,
                    marginTop: "10px",
                    fontSize: "0.4em",
                    zIndex: 10,
                  }}
                  type="button"
                >
                  play again
                </Button>{" "}
                <Button
                  onClick={() => handleOpen()}
                  sx={{
                    ...BtnStyleSmall,
                    marginTop: "10px",
                    fontSize: "0.4em",
                    zIndex: 10,
                  }}
                  type="button"
                >
                  share
                </Button>
              </div>
            )}
          </div>

          <span
            style={{
              position: "absolute",
              top: "2px",
              left: "4px",
              color: "white",
              display: win ? "none" : "block",
            }}
          >
            {started && !keyboardFocus && <>You're training: {skill}s</>}
          </span>

          {!started && (
            <div
              className={started ? "fadeOut" : "fadeIn"}
              style={{ display: lives > 0 ? "block" : "hide" }}
            >
              <center>
                <p
                  style={{
                    color: "white",
                    fontSize: "large",
                    padding: "0 15px",
                  }}
                >
                  You're training: {skill}s
                  <br />
                  <br />
                  You'll be given a noun, and need to{" "}
                  {settings.multiplechoice ? "pick" : "type"}{" "}
                  {skill == "article" && (
                    <>the correct form of the word with the right article</>
                  )}
                  {skill == "genitive" && <>the genitive form</>}
                  {skill == "plural" && <>the plural form</>}
                  <br />
                  <br />
                  Hit start to begin
                </p>
                <Button
                  sx={{ ...BtnStyleSmall, zIndex: 8 }}
                  onClick={() => {
                    setStarted(true);
                    run();
                  }}
                >
                  Start
                </Button>
              </center>
            </div>
          )}
          <div
            className={checking || win || !started ? "fadeOut" : "fadeIn"}
            style={{ display: lives > 0 ? "block" : "hide" }}
          >
            <center>
              <h3 style={{fontSize: '33px'}}>{question}</h3>
              {!keyboardFocus && <br />}

              {multipleChoice ? (
                <>
                  {options.map(
                    (option) =>
                      option && (
                        <Button
                          key={option}
                          sx={{ ...BtnStyleSmall, margin: "5px" }}
                          onClick={() => handleSubmit(option)}
                        >
                          {option}
                        </Button>
                      )
                  )}
                </>
              ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="borderFlash" style={{ width: "90%" }}>
                    <NoBorderTextField
                      onFocus={() => handleKeyboardFocus({ focus: true })}
                      onBlur={() => handleKeyboardFocus({ focus: false })}
                      autoComplete="off"
                      value={input}
                      autoFocus={!isMobile}
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
                      onChange={(e) => setInput(e.target.value.toLowerCase())}
                    />
                  </div>
                  <div
                    style={{
                      transform: keyboardFocus ? "scale(0.0001)" : "scale(1)",
                    }}
                  >
                    <br />
                    <Button
                      type="submit"
                      sx={BtnStyleSmall}
                      onClick={handleSubmit}
                      disabled={(lives == 0 || input == "" || checking) && true}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </center>
          </div>
        </div>
      </div>

      <div className="backBtn">
        <center>
          <Link to="../">
            <Button
              className="bounceBtn"
              sx={{ ...BtnStyle, marginRight: "10px", marginTop: "-5vh" }}
            >
              Back
            </Button>
          </Link>

          <Button
            onClick={() => handleOpenSettings()}
            className="bounceBtn"
            sx={{ ...BtnStyle, marginLeft: "10px", marginTop: "-5vh" }}
          >
            Settings
          </Button>
        </center>
      </div>

      <Modal
        open={settingsOpen}
        onClose={handleCloseSettings}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <span
            style={{
              float: "right",
              marginTop: "-23px",
              marginRight: "-20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSettingsOpen(false);
            }}
          >
            x
          </span>
          <SettingsModal />
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <span
            style={{
              float: "right",
              marginTop: "-23px",
              marginRight: "-20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            x
          </span>
          <ShareModal mistakes={mistakes} score={finalScore} />
        </Box>
      </Modal>
    </>
  );
};

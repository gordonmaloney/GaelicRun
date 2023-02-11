import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyleSmall, BtnStyleTiny } from "../MuiStyles";
import Switch from "@mui/material/Switch";
import { StyledSwitch } from "../MuiStyles";
import { Slider } from "@mui/material";
import { WORDS2 } from "../WORDS";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../Redux/Slice";
import { useEffect } from "react";

const active = { backgroundColor: "white", color: "#f54171" };
const inactive = { backgroundColor: "lightgrey", color: "white" };

export const SettingsModal = () => {
  //redux logic
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const [tab, setTab] = useState("");

  const Levels = Array.from(new Set([...WORDS2.map((word) => word.level)]));

  const [oneLevel, setOneLevel] = useState(false);

  useEffect(() => {
    if (settings.vocab.length > 1) setOneLevel(false);
  }, [settings.vocab.length]);

  const One = () => {
    return (
      <Grid container alignItems={"center"}>
        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={8}>
              <span className="shareTech settingHeader">
                Check for accents:
              </span>
              <br />
            </Grid>
            <Grid item xs={2}>
              <StyledSwitch
                checked={settings.checkaccents}
                onChange={() =>
                  dispatch(
                    setSettings({
                      ...settings,
                      checkaccents: !settings.checkaccents,
                    })
                  )
                }
              />
            </Grid>

            <Grid item xs={2}>
              {settings.checkaccents ? "on" : "off"}
            </Grid>
          </Grid>
          <span className="shareTech">
            <br />
            When off, you won't have to worry about typing the correct accents
            on words.
          </span>
          <br />
          <br />
          <br />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={8}>
              <span className="shareTech settingHeader">Multiple choice:</span>
              <br />
            </Grid>
            <Grid item xs={2}>
              <StyledSwitch
                checked={settings.multiplechoice}
                onChange={() =>
                  dispatch(
                    setSettings({
                      ...settings,
                      multiplechoice: !settings.multiplechoice,
                    })
                  )
                }
              />
            </Grid>
            <Grid item xs={2}>
              {settings.multiplechoice ? "on" : "off"}
            </Grid>
          </Grid>
          <span className="shareTech">
            <br />
            When off, you will have to type the word. When on, you will be given
            three options to pick from.
          </span>
          <br />
          <br />
          <br />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={8}>
              <span className="shareTech settingHeader">
                Show answer on submit:
              </span>
              <br />
            </Grid>
            <Grid item xs={2}>
              <StyledSwitch
                checked={settings.showanswer}
                onChange={() =>
                  dispatch(
                    setSettings({
                      ...settings,
                      showanswer: !settings.showanswer,
                    })
                  )
                }
              />
            </Grid>

            <Grid item xs={2}>
              {settings.showanswer ? "on" : "off"}
            </Grid>
          </Grid>
          <span className="shareTech">
            <br />
            When on, this will show you the correct answer if you submit the
            wrong one.
          </span>
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    );
  };

  const Two = () => {
    return (
      <>
        <p style={{ marginTop: 0 }}>
          <span className="settingHeader">
            Choose which lessons you want to study the vocabulary from
          </span>
          <br />
          <br />
          {oneLevel && <>You need at least one level to play</>}
          <center>
            {Levels.map((level) => (
              <React.Fragment key={level}>
                {settings.vocab.includes(level) ? (
                  <Button
                    onClick={() => {
                      settings.vocab.length == 1
                        ? setOneLevel(true)
                        : dispatch(
                            setSettings({
                              ...settings,
                              vocab: [
                                ...settings.vocab.filter(
                                  (filt) => filt !== level
                                ),
                              ],
                            })
                          );
                    }}
                    sx={{ ...BtnStyleTiny }}
                  >
                    {level}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(
                        setSettings({
                          ...settings,
                          vocab: [...settings.vocab, level],
                        })
                      );
                    }}
                    sx={{ ...BtnStyleTiny, ...inactive }}
                  >
                    {level}
                  </Button>
                )}
              </React.Fragment>
            ))}
            <br />
            <br />
            {settings.vocab.length < Levels.length && (
              <Button
                sx={BtnStyleSmall}
                onClick={() =>
                  dispatch(setSettings({ ...settings, vocab: Levels }))
                }
              >
                Select all
              </Button>
            )}
          </center>
        </p>
      </>
    );
  };

  const Three = () => {
    return (
      <>
        <span className="shareTech settingHeader">
          Choose what you want to train: <br />
          <br />
        </span>
        <center>
          <Button
            sx={
              settings.skill == "article"
                ? { ...BtnStyleSmall, margin: "5px", ...active }
                : { ...BtnStyleSmall, margin: "5px" }
            }
            onClick={() =>
              dispatch(setSettings({ ...settings, skill: "article" }))
            }
          >
            Articles
          </Button>
          <Button
            sx={
              settings.skill == "genitive"
                ? { ...BtnStyleSmall, margin: "5px", ...active }
                : { ...BtnStyleSmall, margin: "5px" }
            }
            onClick={() =>
              dispatch(setSettings({ ...settings, skill: "genitive" }))
            }
          >
            Genitives
          </Button>
          <Button
            sx={
              settings.skill == "plural"
                ? { ...BtnStyleSmall, margin: "5px", ...active }
                : { ...BtnStyleSmall, margin: "5px" }
            }
            onClick={() =>
              dispatch(setSettings({ ...settings, skill: "plural" }))
            }
          >
            plurals
          </Button>
        </center>
      </>
    );
  };

  return (
    <div
      style={{ marginTop: "-15px", marginLeft: "-10px", marginRight: "-10px" }}
    >
      <h3 style={{ fontSize: "xx-large" }}>settings</h3>

      <br />
      <br />
      <Grid container spacing={1}>
        <Grid item id="menu" xs={12} sm={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                onClick={() => setTab("Three")}
                sx={
                  tab == "Three"
                    ? { ...BtnStyleSmall, ...active }
                    : { ...BtnStyleSmall }
                }
              >
                skill
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => setTab("One")}
                sx={
                  tab == "One"
                    ? { ...BtnStyleSmall, ...active }
                    : { ...BtnStyleSmall }
                }
              >
                {" "}
                input
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => setTab("Two")}
                sx={
                  tab == "Two"
                    ? { ...BtnStyleSmall, ...active }
                    : { ...BtnStyleSmall }
                }
              >
                vocab
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
          <hr />
        </Grid>

        <Grid item id="content" xs={12} sm={10}>
          {tab == "" && (
            <p>You can change the settings using the buttons here.</p>
          )}
          {tab == "One" && <One />}
          {tab == "Two" && <Two />}
          {tab == "Three" && <Three />}
        </Grid>
      </Grid>
    </div>
  );
};

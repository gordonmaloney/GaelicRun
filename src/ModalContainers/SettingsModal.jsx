import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyleSmall } from "../MuiStyles";
import Switch from "@mui/material/Switch";

import { Slider } from "@mui/material";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../Redux/Slice";
import { useEffect } from "react";

const active = { backgroundColor: "white", color: "#f54171" };

export const SettingsModal = () => {
  //redux logic
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);

  const [tab, setTab] = useState("");

  const One = () => {
    return (
      <Grid container alignItems={"center"}>
        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
              <span className="shareTech">Check for accents:</span>
              <br />
            </Grid>
            <Grid item xs={6}>
              off{" "}
              <Switch
                color="secondary"
                checked={settings.checkaccents}
                onChange={() =>
                  dispatch(
                    setSettings({
                      ...settings,
                      checkaccents: !settings.checkaccents,
                    })
                  )
                }
              />{" "}
              on
            </Grid>
          </Grid>
          <span className="shareTech">When off, you won't have to worry about typing the correct accents on
          words.</span>
          <br />
          <br />
          <br />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
            <span className="shareTech">Multiple choice:</span>
              <br />
            </Grid>
            <Grid item xs={6}>
              off{" "}
              <Switch
                color="secondary"
                checked={settings.multiplechoice}
                onChange={() =>
                  dispatch(
                    setSettings({
                      ...settings,
                      multiplechoice: !settings.multiplechoice,
                    })
                  )
                }
              />{" "}
              on
            </Grid>
          </Grid>
          <span className="shareTech">When off, you will have to type the word. When on, you will be given
          three options to pick from.</span>
          <br />
          <br />
          <br />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
            <span className="shareTech">Show answer on submit:</span>
              <br />
            </Grid>
            <Grid item xs={6}>
              off{" "}
              <Switch
                color="secondary"
                checked={settings.showanswer}
                onChange={() =>
                  dispatch(
                    setSettings({
                      ...settings,
                      showanswer: !settings.showanswer,
                    })
                  )
                }
              />{" "}
              on
            </Grid>
          </Grid>
          <span className="shareTech">When on, this will show you the correct answer if you submit the wrong
          one.</span>
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
        <p>
          Choose which lessons you want to study the vocabulary from
        <br />
        <br />
        This is the beta version, with vocab from level one only. More to come soon!</p>
      </>
    );
  };

  
  const Three = () => {
    return (
      <>
        <span className="shareTech">Choose what you want to train: <br />
  </span>
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
      </>
    );
  };

  return (
    <div
      style={{ marginTop: "-15px", marginLeft: "-10px", marginRight: "-10px" }}
    >
      <span style={{ fontSize: "40px" }}>settings</span>
      <br />
      <br />
      <Grid container width={"100%"} spacing={1}>
        <Grid item id="menu" xs={12} sm={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Button onClick={() => setTab("Three")} sx={{ ...BtnStyleSmall }}>
                skill
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setTab("One")} sx={{ ...BtnStyleSmall }}>
                input
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setTab("Two")} sx={BtnStyleSmall}>
                vocab
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item id="content" xs={10}>
          {tab == "One" && <One />}
          {tab == "Two" && <Two />} {tab == "Three" && <Three />}
        </Grid>
      </Grid>
    </div>
  );
};

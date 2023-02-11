import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyleSmall } from "../MuiStyles";
import { Tooltip } from "@mui/material";
import { shareOnMobile } from "react-mobile-share";
import { BrowserView, MobileView } from "react-device-detect";


export const HowToPlay = () => {


  return (
    <div style={{ marginTop: "-15px" }}>
      <h3 style={{fontSize: 'xx-large'}}>How to play</h3>

      <p style={{fontSize: 'large'}}>Welcome to Gaelic Run</p>

      <p>This is a game to train you on the <b>different forms of Gaelic nouns</b> - you'll be given a word, and need to answer with the correct article, genitive, or plural.</p>

      <p>But be careful - <b>the fate of a lonely space ranger depends on you</b>. Get an answer wrong, and he'll be attacked by a monster.</p>

      <p>Have a <b>look in the settings</b> for different options - including what skill you want to practice, a multiple choice option, and more.</p>

      <p>If you enjoy Gaelic Run, <b>you can support this and more Gaelic-learning apps</b> by making a donation here:</p>
      <center>
        <Button sx={BtnStyleSmall} target="_blank" href="https://ko-fi.com/gordonmaloney">Donate</Button>
      </center>

      <p>Any issues or questions, <a target="_blank" href="mailto:gordonmaloney@gmail.com?subject=GaelicRun">get in touch</a>.</p>
    </div>
  );
};

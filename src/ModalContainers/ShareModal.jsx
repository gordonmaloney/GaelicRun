import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyleSmall } from "../MuiStyles";
import { Tooltip } from "@mui/material";
import { shareOnMobile } from "react-mobile-share";
import { BrowserView, MobileView } from "react-device-detect";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../Redux/Slice";

export const ShareModal = ({ mistakes, score }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    if (tooltipOpen) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 1000);
    }
  }, [tooltipOpen]);

  const { settings } = useSelector((state) => state.settings);


  return (
    <div style={{ marginTop: "-15px" }}>
      <h3 style={{fontSize: 'xx-large'}}>Share your score</h3>

      <br />
      <br />

      <div className="shareMsg, shareTech">
        I scored {score} learning {settings.skill}s on #GaelicRun!
        <br />
        <br />
        {mistakes.length == 3 ? (
          <>
            The words that tripped me up were:
            <br />
            {mistakes &&
              mistakes.map((mistake) => (
                <>
                  - {mistake}
                  <br />
                </>
              ))}
          </>
        ) : (
          <>
            And I got every question right!
            <br />
          </>
        )}
        <br />
        Can you do better?? GaelicRun.gordonmaloney.info
        <br />
        <br />
      </div>
      <Grid
        container
        spacing={1}
        sx={{ width: "100%" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <MobileView>
          <Grid item sx={{ display: { xs: "block", sm: "hide" } }} xs={12}>
            <center>
              <Button
                sx={{ ...BtnStyleSmall, marginTop: "30px" }}
                className="showOnMob"
                onClick={() =>
                  shareOnMobile({
                    text: `I scored ${score} on #GaelicRun!\n\n${mistakes ? `The words that tripped me up were:\n-${mistakes[0]}\n-${mistakes[1]}\n-${mistakes[2]}` : `And I got every question right!`}\n\nCan you do better? GaelicRun.netlify.app`,
                    url: "gaelicrun.netlify.app",
                    title: "Gaelic Run",
                  })
                }
              >
                Share
              </Button>
            </center>
          </Grid>
        </MobileView>
        <BrowserView>
          <Grid item sx={{ display: { xs: "hide", sm: "block" } }} xs={12}>
            <center>
              <Button
                href={`https://twitter.com/intent/tweet?text=I%20scored%20${score}%20on%20%23GaelicRun%0A%0A${mistakes ? `The%20words%20that%20tripped%20me%20up%20were%3A%0A-%20${mistakes[0]}%0A-%20${mistakes[1]}%0A-%20${mistakes[2]}`: `And%20I%20got%20every%20question%20right!!`}%0A%0ACan%20you%20do%20better%3F%20GaelicRun.gordonmaloney.info`}
                target="_blank"
                sx={BtnStyleSmall}
              >
                Share on Twitter
              </Button>
            </center>
          </Grid>
        </BrowserView>
        <Grid item xs={12}>
          <center>
            <Tooltip
              title={
                <span sx={{ fontFamily: "Upheav !important" }}>COPIED</span>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    fontFamily: "Upheav",
                    fontSize: "20px",
                    bgcolor: "#2b1165",
                    "& .MuiTooltip-arrow": {
                      color: "#2b1165",
                    },
                  },
                },
              }}
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="top"
              arrow
            >
              <Button
                sx={BtnStyleSmall}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `I scored ${score} on #GaelicRun!\n\nThe words that tripped me up were:\n-${mistakes[0]}\n-${mistakes[1]}\n-${mistakes[2]}\n\nCan you do better? GaelicRun.gordonmaloney.info`
                  );
                  setTooltipOpen(true);
                }}
              >
                Copy message
              </Button>
            </Tooltip>
          </center>
        </Grid>
      </Grid>
    </div>
  );
};

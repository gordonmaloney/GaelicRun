import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyleSmall } from "./MuiStyles";
import Switch from "@mui/material/Switch";

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  minWidth: "270px",
  bgcolor: "rgba(0,0,0,0.9)",
  border: "5px solid #080539",
  boxShadow: 20,
  p: 3,
  paddingBottom: 2,
  color: "white",
};

export const ModalContent = () => {
  const [tab, setTab] = useState("");

  const One = () => {
    return (
      <Grid container alignItems={"center"}>
        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
              Check for accents:
              <br />
            </Grid>
            <Grid item xs={6}>
              off <Switch color="secondary" /> on
            </Grid>
          </Grid>
          When off, you won't have to worry about typing the correct accents on
          words.
          <br />
          <br />
          <br />
        </Grid>

        <Grid item xs={12}>
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
              Multiple choice:
              <br />
            </Grid>
            <Grid item xs={6}>
              off <Switch color="secondary" /> on
            </Grid>
          </Grid>
          When off, you will have to type the word. When on, you will be given
          three options to pick from.
          <br />
          <br />
          <br />
        </Grid>
      </Grid>
    );
  };

  const Two = () => {
    return <>Choose which lessons you want to study the vocabulary from</>;
  };

  const Three = () => {
    return <>Choose what you want to train: <br/>
    articles<br/>genitives<br/>plurals</>;
  };

  return (
    <div style={{ marginTop: "-15px" }}>
      <span style={{ fontSize: "40px" }}>settings</span>
      <br />
      <br />
      <br />
      <Grid container width={"100%"} spacing={2}>
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

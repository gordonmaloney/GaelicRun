import { Button } from "@mui/material";
import { BtnStyle } from "./MuiStyles";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div style={{ zIndex: "5 !important" }}>


      <h1 style={{ textAlign: "center", marginTop: "0", marginBottom: "20px" }}>
        Gaelic Run
      </h1>

      <center>
        <Link to="./play" >
          <Button className="bounceBtn" sx={{ ...BtnStyle, zIndex: "4" }} variant="contained">
            START
          </Button>
        </Link>
        <br/><br/><br/>
        <Link to="./" >
          <Button className="bounceBtn" sx={{ ...BtnStyle, zIndex: "4" }} variant="contained">
            HOW TO PLAY
          </Button>
        </Link>
      </center>
    </div>
  );
};

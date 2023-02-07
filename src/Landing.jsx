import { Button } from "@mui/material";
import { BtnStyle } from "./MuiStyles";
import { Link } from "react-router-dom";
import { useState } from "react";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalStyle, ModalContent } from "./ModalCont";


export const Landing = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <br/><br/><br/>
          <Button 
          onClick={handleOpen}
          className="bounceBtn" sx={{ ...BtnStyle, zIndex: "4" }} variant="contained">
            SETTINGS
          </Button>
      </center>



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
          <ModalContent />
        </Box>
      </Modal>
    </div>
  );
};

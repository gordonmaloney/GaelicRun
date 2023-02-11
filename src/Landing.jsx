import { Button } from "@mui/material";
import { BtnStyle } from "./MuiStyles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//redux imports
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "./Redux/Slice";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { modalStyle } from "./ModalContainers/ModalStyle";
import { SettingsModal } from "./ModalContainers/SettingsModal";
import { HowToPlay } from "./ModalContainers/HowToPlay";

export const Landing = () => {
  //modal logic
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const [openHow, setOpenHow] = useState(false);
  const handleOpenHow = () => setOpenHow(true);
  const handleCloseHow = () => setOpenHow(false);

  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.settings);
  //check for local storage settings and update if they're there

  let localSettings = JSON.parse(localStorage.getItem("settings"))

  console.log(localSettings, settings )

  useEffect(() => {
    if (localSettings?.skill) {
    if (
      settings.skill !== localSettings.skill
      || settings.multiplechoice !== localSettings.multiplechoice
      || settings.showanswer !== localSettings.showanswer
      || settings.vocab !== localSettings.vocab
      || settings.checkaccents !== localSettings.checkaccents
      ) {
      console.log("dont match!");
      dispatch(setSettings(localSettings));
    }
    else console.log('matching!')
  } else {console.log('no local settings')}
  }, []);


  return (
    <div style={{ zIndex: "5 !important" }}>
      <h1 style={{ textAlign: "center", marginTop: "0", marginBottom: "20px" }}>
        Gaelic Run
      </h1>

      <center>
        <Link to="./play">
          <Button
            className="bounceBtn"
            sx={{ ...BtnStyle, zIndex: "4" }}
            variant="contained"
          >
            START
          </Button>
        </Link>
        <br />
        <br />
        <br />
        <Button
          onClick={handleOpenHow}
          className="bounceBtn"
          sx={{ ...BtnStyle, zIndex: "4" }}
          variant="contained"
        >
          HOW TO PLAY
        </Button>
        <br />
        <br />
        <br />
        <Button
          onClick={handleOpenSettings}
          className="bounceBtn"
          sx={{ ...BtnStyle, zIndex: "4" }}
          variant="contained"
        >
          SETTINGS
        </Button>
      </center>

      <Modal
        open={openHow}
        onClose={handleCloseHow}
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
              setOpenHow(false);
            }}
          >
            x
          </span>
          <HowToPlay />
        </Box>
      </Modal>

      <Modal
        open={openSettings}
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
              setOpenSettings(false);
            }}
          >
            x
          </span>
          <SettingsModal />
        </Box>
      </Modal>
    </div>
  );
};

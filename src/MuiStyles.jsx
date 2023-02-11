import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

export const BtnStyle = {
  fontFamily: "Upheav",
  borderRadius: "1px",
  color: "white",
  backgroundColor: "#1b1672",
  fontSize: "1.5em",
  "&:hover, &:active": { backgroundColor: "white", color: "#1b1672" },
};

export const BtnStyleSmall = {
  fontFamily: "Upheav",
  borderRadius: "1px",
  color: "white",
  backgroundColor: "#f54171",
  fontSize: "1em",
  "&:hover, &:active": { backgroundColor: "white", color: "#f54171" },
};

export const BtnStyleTiny = {
  fontFamily: "Upheav",
  borderRadius: "1px",
  color: "white",
  backgroundColor: "#f54171",
  padding: '0 2px', margin: '2px',
  lineHeight: '17px',
  fontSize: "1em",
  "&:hover, &:active": { backgroundColor: "white", color: "#f54171" },
};


export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#f54171',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'rgba(245,65,113,0.5)',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    color: '#f54171',
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    boxSizing: 'border-box',
  },
}));
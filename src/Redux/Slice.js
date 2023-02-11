import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  settings: {
    vocab: ["Intro"],
    multiplechoice: false,
    showanswer: false,
    skill: "article",
    checkaccents: true,
  },
};

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, data) => {
      state.settings = data.payload;
      localStorage.setItem('settings', JSON.stringify(data.payload))
    }
  },
});

export const { setSettings } = settingSlice.actions; 
export default settingSlice.reducer;

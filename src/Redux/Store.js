//store and reducers
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import settingSlice from './Slice'

//store and reducers
const reducer = combineReducers({
  settings: settingSlice,
});

export const store = configureStore({
  reducer,
});
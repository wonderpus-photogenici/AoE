import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import riotReducer from "./riotSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    riot: riotReducer,
  },
});

export default store;

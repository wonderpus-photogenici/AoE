import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import riotReducer from "./riotSlice";
import allUsersReducer from "./allUsersSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    riot: riotReducer,
    allUsers: allUsersReducer,
  },
});

export default store;

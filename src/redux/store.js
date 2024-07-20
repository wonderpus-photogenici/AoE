import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import riotReducer from "./riotSlice";
import allUsersReducer from "./allUsersSlice";
import supabaseUserReducer from "./supabaseUserSlice";
import feedDataReducer from "./feedDataSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    riot: riotReducer,
    allUsers: allUsersReducer,
    supabaseUser: supabaseUserReducer,
    feedData: feedDataReducer,
  },
});

export default store;

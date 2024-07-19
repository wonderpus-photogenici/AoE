import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import riotReducer from "./riotSlice";
import allUsersReducer from "./allUsersSlice";
import supabaseUserReducer from "./supabaseUserSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    riot: riotReducer,
    allUsers: allUsersReducer,
    supabaseUser: supabaseUserReducer,
  },
});

export default store;

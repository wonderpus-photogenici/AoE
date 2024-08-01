import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import riotReducer from "./riotSlice";
import allUsersReducer from "./allUsersSlice";
import supabaseUserReducer from "./supabaseUserSlice";
import feedDataReducer from "./feedDataSlice";
import profileReducer from "./profileSlice";
import profileLanguagesReducer from "./profileLanguagesSlice";
import profileLocationReducer from "./profileLocationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    riot: riotReducer,
    allUsers: allUsersReducer,
    supabaseUser: supabaseUserReducer,
    feedData: feedDataReducer,
    profile: profileReducer,
    profileLanguages: profileLanguagesReducer,
    profileLocation: profileLocationReducer,
  },
});

export default store;

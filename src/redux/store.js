import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import riotReducer from "./riotSlice";
import allUsersReducer from "./allUsersSlice";
import supabaseUserReducer from "./supabaseUserSlice";
import feedDataReducer from "./feedDataSlice";
import profileReducer from "./profileSlice";
import profileLanguagesReducer from "./profileLanguagesSlice";
import profileLocationReducer from "./profileLocationSlice";
import selectedFriendIdReducer from "./selectedFriendIdSlice";
import homeFriendsListReducer from "./homeFriendsListSlice";
import removeFriendHomeFriendsListReducer from "./removeFriendHomeFriendsListSlice";

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
    selectedFriendId: selectedFriendIdReducer,
    homeFriendsList: homeFriendsListReducer,
    removeFriendHomeFriendsList: removeFriendHomeFriendsListReducer,
  },
});

export default store;

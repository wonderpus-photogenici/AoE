import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    removeFriendHomeFriendsList: [],
  };
  
  const removeFriendHomeFriendsListSlice = createSlice({
    name: "removeFriendHomeFriendsList",
    initialState,
    reducers: {
      setRemoveFriendHomeFriendsList(state, action) {
        state.removeFriendHomeFriendsList = action.payload;
      },
      clearRemoveFriendHomeFriendsList(state) {
        state.removeFriendHomeFriendsList = null;
      },
    },
  });
  
  export const { setRemoveFriendHomeFriendsList, clearRemoveFriendHomeFriendsList } = removeFriendHomeFriendsListSlice.actions;
  export default removeFriendHomeFriendsListSlice.reducer;
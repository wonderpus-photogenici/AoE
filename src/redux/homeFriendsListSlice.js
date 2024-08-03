import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    homeFriendsList: [],
  };
  
  const homeFriendsListSlice = createSlice({
    name: "homeFriendsList",
    initialState,
    reducers: {
      setHomeFriendsList(state, action) {
        state.homeFriendsList = action.payload;
      },
      clearHomeFriendsList(state) {
        state.homeFriendsList = null;
      },
    },
  });
  
  export const { setHomeFriendsList, clearHomeFriendsList } = homeFriendsListSlice.actions;
  export default homeFriendsListSlice.reducer;
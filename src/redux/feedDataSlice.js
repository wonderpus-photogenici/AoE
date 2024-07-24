import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedData: [],
  };
  
  const feedDataSlice = createSlice({
    name: "feedData",
    initialState,
    reducers: {
      setFeedData(state, action) {
        state.feedData = action.payload;
      },
      clearFeedData(state) {
        state.feedData = null;
      },
    },
  });
  
  export const { setFeedData, clearFeedData } = feedDataSlice.actions;
  export default feedDataSlice.reducer;
  
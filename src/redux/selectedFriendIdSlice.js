import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFriendId: null,
};

const selectedFriendIdSlice = createSlice({
  name: "selectedFriendId",
  initialState,
  reducers: {
    setSelectedFriendIdRedux(state, action) {
      state.selectedFriendId = action.payload;
    },
    clearSelectedFriendId(state) {
      state.selectedFriendId = null;
    },
  },
});

export const { setSelectedFriendIdRedux, clearSelectedFriend } = selectedFriendIdSlice.actions;
export default selectedFriendIdSlice.reducer;
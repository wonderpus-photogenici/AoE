import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    clearAllUsers(state) {
      state.allUsers = null;
    },
  },
});

export const { setAllUsers, clearAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileLocation: null,
};

const profileLocationSlice = createSlice({
  name: "profileLocation",
  initialState,
  reducers: {
    setProfileLocation(state, action) {
      state.profileLocation = action.payload;
    },
    clearProfileLocation(state) {
      state.profileLocation = null;
    },
  },
});

export const { setProfileLocation, clearProfileLocation } = profileLocationSlice.actions;
export default profileLocationSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileLanguages: null,
};

const profileLanguagesSlice = createSlice({
  name: "profileLanguages",
  initialState,
  reducers: {
    setProfileLanguages(state, action) {
      state.profileLanguages = action.payload;
    },
    clearProfileLanguages(state) {
      state.profileLanguages = null;
    },
  },
});

export const { setProfileLanguages, clearProfileLanguages } = profileLanguagesSlice.actions;
export default profileLanguagesSlice.reducer;
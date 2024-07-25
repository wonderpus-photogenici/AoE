import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const supabaseUserSlice = createSlice({
  name: "supabaseUser",
  initialState,
  reducers: {
    setSupabaseUser(state, action) {
      state.supabaseUser = action.payload;
    },
    clearSupabaseUser(state) {
      state.supabaseUser = null;
    },
  },
});

export const { setSupabaseUser, clearSupabaseUser } = supabaseUserSlice.actions;
export default supabaseUserSlice.reducer;
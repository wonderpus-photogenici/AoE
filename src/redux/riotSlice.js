import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  summonerData: null,
  error: null,
};

const riotSlice = createSlice({
  name: "riot",
  initialState,
  reducers: {
    fetchSummonerDataSuccess(state, action) {
      state.summonerData = action.payload;
      state.error = null;
    },
    fetchSummonerDataFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { fetchSummonerDataSuccess, fetchSummonerDataFailure } =
  riotSlice.actions;

export const fetchSummonerData = (gameName, tagLine) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/summoner?gameName=${gameName}&tagLine=${tagLine}`
    );
    dispatch(fetchSummonerDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchSummonerDataFailure(error.message));
  }
};

export default riotSlice.reducer;

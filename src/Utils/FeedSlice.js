import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeExploredFeed: (state, action) => {
      return state.filter((feed) => feed._id !== action.payload);
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});
export const { addFeed, removeFeed,removeExploredFeed } = feedSlice.actions;
export default feedSlice.reducer;

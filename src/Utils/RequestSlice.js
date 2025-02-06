import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      return null;
    },
    removeAcceptedRequest: (state, action) => {
      return state.filter((r) => r.fromUserId._id !== action.payload);
    },
  },
});
export const { addRequests, removeRequests, removeAcceptedRequest } =
  requestSlice.actions;
export default requestSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return null;
    },
    removeAConnection: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});
export const { addConnections, removeConnections,removeAConnection } = connections.actions;
export default connections.reducer;

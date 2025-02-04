import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./Connectionslice";
const appStore = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
    connections: connectionReducer,
  },
});
export default appStore;

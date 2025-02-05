import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./Connectionslice";
import requestReducer from "./RequestSlice";
const appStore = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});
export default appStore;

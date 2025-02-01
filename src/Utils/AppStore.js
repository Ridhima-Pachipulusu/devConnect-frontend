import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
const appStore = configureStore({
  reducer: {
    User: userReducer,
    Feed: feedReducer,
  },
});
export default appStore;

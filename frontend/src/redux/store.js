import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/videoSlice";
import authReducer from "./slices/authSlice";
import channelReducer from "./slices/channelSlice";

const store = configureStore({
  reducer: {
    videos: videoReducer,
    auth: authReducer,
    channel: channelReducer,
  },
});

export default store;

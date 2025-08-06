import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import taskSlice from "./slices/taskSlice";
// import timeLogSlice from "./slices/timeLogSlice";

export default configureStore({
  reducer: {
    authSlice,
    taskSlice,
    // timeLogSlice,
  },
});
